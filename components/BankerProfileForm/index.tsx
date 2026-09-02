'use client';
import { useState } from 'react';
import styles from './styles.module.css';

interface ProfileData {
  contentId: string;
  fullName: string;
  slug: string;
  headshot: string;
  licensedStates: string[];
  phone: string;
}

export default function BankerProfileForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [headshot, setHeadshot] = useState('');
  const [phone, setPhone] = useState('');
  const [licensedStates, setLicensedStates] = useState<string[]>([]);

  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLookupError('');
    setSuccessMessage('');
    setIsLookingUp(true);

    try {
      const res = await fetch(`/api/banker-profile?name=${encodeURIComponent(name.trim())}`);
      const json = await res.json();

      if (!res.ok) {
        setLookupError(json.error || 'Could not find that profile');
        setProfile(null);
        return;
      }

      setProfile(json);
      setHeadshot(json.headshot);
      setPhone(json.phone);
      setLicensedStates(json.licensedStates.length ? json.licensedStates : ['']);
    } finally {
      setIsLookingUp(false);
    }
  }

  function updateState(index: number, value: string) {
    setLicensedStates((states) => states.map((state, i) => (i === index ? value : state)));
  }

  function removeState(index: number) {
    setLicensedStates((states) => states.filter((_, i) => i !== index));
  }

  function addState() {
    setLicensedStates((states) => [...states, '']);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    setSubmitError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/banker-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          contentId: profile.contentId,
          data: { headshot, phone, licensedStates },
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setSubmitError(json.error || 'Failed to update profile');
        return;
      }

      setSuccessMessage('Profile updated successfully.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!profile) {
    return (
      <form className={styles.form} onSubmit={handleLookup}>
        <h1 className={styles.heading}>Banker Profile Portal</h1>
        <p className={styles.subheading}>Enter your name and the shared password to edit your profile.</p>

        <label className={styles.label} htmlFor="name">
          Full name
        </label>
        <input
          id="name"
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          required
        />

        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {lookupError && <p className={styles.error}>{lookupError}</p>}

        <button className={styles.submitButton} type="submit" disabled={isLookingUp}>
          {isLookingUp ? 'Looking up...' : 'Find my profile'}
        </button>
      </form>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>Editing profile for {profile.fullName}</h1>

      <label className={styles.label} htmlFor="headshot">
        Photo URL
      </label>
      <input
        id="headshot"
        className={styles.input}
        type="text"
        value={headshot}
        onChange={(e) => setHeadshot(e.target.value)}
        placeholder="https://..."
      />
      {headshot && <img src={headshot} alt="Headshot preview" className={styles.headshotPreview} />}

      <label className={styles.label} htmlFor="phone">
        Phone number
      </label>
      <input
        id="phone"
        className={styles.input}
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="(555) 555-5555"
      />

      <span className={styles.label}>States you operate in</span>
      <div className={styles.statesList}>
        {licensedStates.map((state, index) => (
          <div className={styles.stateRow} key={index}>
            <input
              className={styles.stateInput}
              type="text"
              value={state}
              onChange={(e) => updateState(index, e.target.value)}
              placeholder="GA"
              maxLength={2}
            />
            <button
              type="button"
              className={styles.removeStateButton}
              onClick={() => removeState(index)}
              aria-label="Remove state"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <button type="button" className={styles.addStateButton} onClick={addState}>
        + Add state
      </button>

      {submitError && <p className={styles.error}>{submitError}</p>}
      {successMessage && (
        <p className={styles.success}>
          {successMessage}{' '}
          <a href={`/bankers/${profile.slug}`} className={styles.successLink}>
            View live page
          </a>
        </p>
      )}

      <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  );
}
