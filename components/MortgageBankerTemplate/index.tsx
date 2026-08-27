import styles from './styles.module.css';

interface MortgageBankerTemplateProps {
  fullName?: string;
  headshot?: string;
  jobTitle?: string;
  city?: string;
  state?: string;
  licensedStates?: string[];
  specialisms?: string[];
  phone?: string;
  email?: string;
  nmlsNumber?: string;
  applyNowUrl?: string;
  hablaEspanol?: boolean;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  bio?: string;
}

export default function MortgageBankerTemplate({
  fullName = '',
  headshot = '',
  jobTitle = 'Mortgage Banker',
  city = '',
  state = '',
  licensedStates = [],
  specialisms = [],
  phone = '',
  email = '',
  nmlsNumber = '',
  applyNowUrl = '#',
  hablaEspanol = false,
  testimonialQuote = '',
  testimonialAuthor = '',
  bio = '',
}: MortgageBankerTemplateProps) {
  const location = [city, state].filter(Boolean).join(', ');

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        {headshot ? (
          <img src={headshot} alt={fullName} className={styles.headshot} />
        ) : (
          <div className={styles.headshotPlaceholder} aria-hidden="true" />
        )}
        <div className={styles.heroInfo}>
          <h1 className={styles.fullName}>{fullName}</h1>
          <p className={styles.jobTitle}>{jobTitle}</p>
          {location && <p className={styles.location}>{location}</p>}
          {nmlsNumber && <p className={styles.nmls}>NMLS #{nmlsNumber}</p>}

          {licensedStates.length > 0 && (
            <div className={styles.badgeRow}>
              {licensedStates.map((licensedState) => (
                <span key={licensedState} className={styles.stateBadge}>
                  Licensed in {licensedState}
                </span>
              ))}
            </div>
          )}

          {specialisms.length > 0 && (
            <div className={styles.badgeRow}>
              {specialisms.map((specialism) => (
                <span key={specialism} className={styles.specialismBadge}>
                  {specialism}
                </span>
              ))}
            </div>
          )}

          {hablaEspanol && <span className={styles.espanolBadge}>Habla Espa\u00f1ol</span>}

          <div className={styles.contactBlock}>
            {phone && (
              <a href={`tel:${phone}`} className={styles.contactLink}>
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className={styles.contactLink}>
                {email}
              </a>
            )}
          </div>

          <a href={applyNowUrl} className={styles.applyCta}>
            Apply Now
          </a>
        </div>
      </section>

      {testimonialQuote && (
        <section className={styles.testimonialSection}>
          <blockquote
            className={styles.testimonialQuote}
            dangerouslySetInnerHTML={{ __html: testimonialQuote }}
          />
          {testimonialAuthor && <p className={styles.testimonialAuthor}>{testimonialAuthor}</p>}
        </section>
      )}

      {bio && (
        <section className={styles.bioSection}>
          <h2 className={styles.bioHeading}>About {fullName}</h2>
          <div className={styles.bioContent} dangerouslySetInnerHTML={{ __html: bio }} />
        </section>
      )}
    </main>
  );
}
