'use client';
import { useState } from 'react';
import styles from './styles.module.css';

interface BankerpageAboutMeProps {
  heading?: string;
  intro?: string;
  contactLabel?: string;
  contactUrl?: string;
  bioParagraphs?: string[];
  readMoreLabel?: string;
  readLessLabel?: string;
}

export default function BankerpageAboutMe({
  heading = 'A little more about me.',
  intro = 'I look forward to developing a long lasting relationship with each customer. Educating the client is what\u2019s most important to me.',
  contactLabel = 'Contact me',
  contactUrl = 'https://www.atlanticbay.com/terenceguess/contact/',
  bioParagraphs = [
    'Terence Guess is just like you in many ways. Like you, he has purchased a house, is honest and upfront, and gets the job done. A long-time resident of Charlotte, he makes the process of buying a house seamless for families from all walks of life.',
    'Terence is a deeply compassionate man who genuinely cares about people. Combining professionalism, 20 years of finance/mortgage experience and a desire to serve, he has the innate ability to connect with each individual. He says, \u201CI get to know my customers by reviewing their credit application face to face and understanding what they are trying to accomplish via this transaction. I enjoy talking with them and communicating. I want to understand what they want to accomplish and their comfortability level.\u201D He sets clear expectations early in the process and educates his clients.',
    'Terence says, \u201CI send clients articles about the housing market and current news affairs. Often when you read headlines, that\u2019s exactly what it is a headline. Get into the meat of the article and read specifically what they are talking about. I tell my clients what the articles mean and why the market is trending the way it is. I never want anyone feel like they\u2019re in the dark when they to get to a closing table because they didn\u2019t understand something that was transpiring. More importantly, I want them to feel that they did understand the process, felt like they were part of it, and that they made the decisions.\u201D',
    'Clients describe Terence as a member of the family, someone who genuinely cares, is always available, easy to talk to and a person who makes the process seamless. He says, \u201CMy job is to serve and to bring you all the facts and allow you to make the decision based on your comfortability level.',
    'His accolades demonstrate his commitment to excellence in lending as well. Terence has received the following designations: 2020 Chairman\u2019s Club, 2021 President\u2019s Club and 2022 President\u2019s Club. He has also been recognized by his peers with an Atlantic Bay to the Core Award for his positivity, morale and values he brings to the workplace every day.',
    'Terence recently coordinated a lunch for the Charlotte Men\u2019s Shelter and organized Atlantic Bay volunteers to serve the lunch. He regularly volunteers at the shelter to serve lunch and help with resume writing. He says, \u201CI care about my community. I care about our youth. It\u2019s important to me that we show our community through our positive contributions.\u201D',
  ],
  readMoreLabel = 'Read more',
  readLessLabel = 'Read less',
}: BankerpageAboutMeProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.layout}>
        <div className={styles.introColumn}>
          <p className={styles.intro}>{intro}</p>
          <a href={contactUrl} className={styles.contactCta}>
            {contactLabel}
          </a>
        </div>
        <div className={styles.bioColumn}>
          <div className={expanded ? styles.bioTextExpanded : styles.bioText}>
            {bioParagraphs.map((paragraph, index) => (
              <p key={index} className={styles.bioParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <button
            type="button"
            className={styles.readMoreButton}
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            <span className={styles.readMoreLabel}>{expanded ? readLessLabel : readMoreLabel}</span>
            <span className={styles.readMoreIcon} aria-hidden="true">
              {expanded ? '\u2212' : '+'}
            </span>
          </button>
          <a href={contactUrl} className={styles.contactCtaMobile}>
            {contactLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
