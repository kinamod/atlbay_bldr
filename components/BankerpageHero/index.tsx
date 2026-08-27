import styles from './styles.module.css';

interface BankerpageHeroProps {
  backgroundImageUrl?: string;
  headshotUrl?: string;
  headshotAlt?: string;
  firstName?: string;
  fullName?: string;
  jobTitle?: string;
  nmlsNumber?: string;
  licensedStates?: string[];
  phone?: string;
  email?: string;
  calendlyLabel?: string;
  calendlyUrl?: string;
}

export default function BankerpageHero({
  backgroundImageUrl = 'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
  headshotUrl = 'https://images.ctfassets.net/n1no4gieqp7s/3pCD1YRDttPnoKjQ8KZWnJ/23c4de9537651adc67cc632d3691e353/terence-guess-headshot.jpg?w=400&h=400&q=90&fm=webp',
  headshotAlt = 'Atlantic Bay Sr. Certified Mortgage Advisor Terence Guess, NMLS #1400129',
  firstName = 'Terence',
  fullName = 'Terence Guess',
  jobTitle = 'Sr. Certified Mortgage Advisor',
  nmlsNumber = '1400129',
  licensedStates = ['NC', 'SC', 'GA # 1400129', 'VA', 'TN', 'FL', 'PA', 'MD', 'NJ'],
  phone = '2152802294',
  email = 'terenceguess@atlanticbay.com',
  calendlyLabel = 'Schedule a meeting with Terence',
  calendlyUrl = 'https://calendly.com/terenceguess',
}: BankerpageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundWrap}>
        <img src={backgroundImageUrl} alt="" className={styles.backgroundImage} />
        <div className={styles.backgroundGradient} />
      </div>
      <div className={styles.content}>
        <div className={styles.headshotWrap}>
          <img src={headshotUrl} alt={headshotAlt} className={styles.headshot} />
        </div>
        <h1 className={styles.firstName}>{firstName}</h1>
        <ul className={styles.infoList}>
          <li className={styles.fullName}>{fullName}</li>
          <li className={styles.jobTitle}>{jobTitle}</li>
          {nmlsNumber && <li className={styles.nmls}>NMLS #{nmlsNumber}</li>}
          {licensedStates.length > 0 && (
            <li className={styles.licensedIn}>
              Licensed in{' '}
              {licensedStates.map((state, index) => (
                <span key={state}>
                  {state}
                  {index < licensedStates.length - 1 ? ', ' : ''}
                </span>
              ))}
            </li>
          )}
        </ul>
        <ul className={styles.contactList}>
          {phone && (
            <li>
              <a href={`tel:${phone}`} className={styles.contactLink}>
                {phone}
              </a>
            </li>
          )}
          {email && (
            <li>
              <a href={`mailto:${email}`} className={styles.contactLink}>
                {email}
              </a>
            </li>
          )}
          {calendlyUrl && (
            <li className={styles.calendlyItem}>
              <a href={calendlyUrl} className={styles.calendlyLink}>
                {calendlyLabel}
              </a>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.calendlyIcon}
              >
                <path d="M1 14.875H15" stroke="#5C6677" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.75 9.625L15 14.875L9.75 20.125" stroke="#5C6677" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
