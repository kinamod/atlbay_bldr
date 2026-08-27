'use client';
import { useState } from 'react';
import styles from './styles.module.css';

interface AnnouncementCarouselProps {
  tipsHeadingLine1?: string;
  tipsHeadingLine2?: string;
  tipsDescription?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  awardHeadingLine1?: string;
  awardHeadingLine2?: string;
  awardDescription?: string;
  awardLinkLabel?: string;
  awardLinkUrl?: string;
}

export default function AnnouncementCarousel({
  tipsHeadingLine1 = 'Tips, Tools, and What',
  tipsHeadingLine2 = 'to Know Next',
  tipsDescription = 'Follow us on social for homebuyer tips, guides, and updates.',
  facebookUrl = 'https://www.facebook.com/AtlanticBay/',
  instagramUrl = 'https://instagram.com/atlanticbaymortgagegroup/',
  linkedinUrl = 'https://www.linkedin.com/company/atlantic-bay-mortgage-group?trk=company_logo',
  awardHeadingLine1 = '#1 Best Large Mortgage',
  awardHeadingLine2 = 'Company To Work For',
  awardDescription = 'Awarded four years running by National Mortgage News.',
  awardLinkLabel = 'Learn more',
  awardLinkUrl = 'https://www.atlanticbay.com/newsroom/uncategorized/2025-national-mortgage-news-award/',
}: AnnouncementCarouselProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const showTips = slideIndex === 0;

  return (
    <div className={styles.carouselWrap}>
      <button
        className={styles.arrowButton}
        style={{ left: '54px' }}
        aria-label="Previous slide"
        onClick={() => setSlideIndex((i) => (i === 0 ? 1 : 0))}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B395B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className={styles.slideTrack}>
        {showTips ? (
          <div className={styles.slide}>
            <div className={styles.slideInner}>
              <div className={styles.slideHeading}>
                <div className={styles.headingBadge}>{tipsHeadingLine1}</div>
                <div className={styles.headingBadge}>{tipsHeadingLine2}</div>
              </div>
              <div className={styles.slideContent}>
                <p className={styles.slideText}>{tipsDescription}</p>
                <div className={styles.socialRow}>
                  <a target="_blank" rel="noreferrer" href={facebookUrl} className={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M19.9932 10.0005C19.9932 15.051 16.2505 19.2264 11.3884 19.904C10.9338 19.9671 10.4687 20 9.99659 20C9.45161 20 8.91644 19.9566 8.39528 19.8725C3.6355 19.1059 0 14.9775 0 10.0005C0 4.47764 4.47608 0.000244141 9.99729 0.000244141C15.5185 0.000244141 19.9946 4.47764 19.9946 10.0005H19.9932Z" fill="#0B395B" />
                      <path d="M11.3884 8.03006V10.2085H14.0825L13.6559 13.143H11.3884V19.9039C10.9338 19.967 10.4687 19.9999 9.99656 19.9999C9.45158 19.9999 8.91642 19.9565 8.39526 19.8724V13.143H5.91064V10.2085H8.39526V7.54309C8.39526 5.88946 9.73528 4.54834 11.3891 4.54834V4.54974C11.394 4.54974 11.3982 4.54834 11.4031 4.54834H14.0832V7.08624H12.332C11.8115 7.08624 11.3891 7.50875 11.3891 8.02937L11.3884 8.03006Z" fill="white" />
                    </svg>
                  </a>
                  <a target="_blank" rel="noreferrer" href={instagramUrl} className={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10.0197 0H9.97417C4.46559 0 0 4.4669 0 9.97711V10.0226C0 15.5329 4.46559 19.9998 9.97417 19.9998H10.0197C15.5283 19.9998 19.9939 15.5329 19.9939 10.0226V9.97711C19.9939 4.4669 15.5283 0 10.0197 0Z" fill="#0B395B" />
                      <path d="M13.091 4.06885H6.90432C5.19515 4.06885 3.80469 5.45971 3.80469 7.1694V12.831C3.80469 14.5406 5.19515 15.9315 6.90432 15.9315H13.091C14.8002 15.9315 16.1906 14.5406 16.1906 12.831V7.1694C16.1906 5.45971 14.8002 4.06885 13.091 4.06885ZM4.89814 7.1694C4.89814 6.06301 5.79826 5.16262 6.90432 5.16262H13.091C14.197 5.16262 15.0972 6.06301 15.0972 7.1694V12.831C15.0972 13.9373 14.197 14.8377 13.091 14.8377H6.90432C5.79826 14.8377 4.89814 13.9373 4.89814 12.831V7.1694Z" fill="white" />
                      <path d="M9.99793 12.8833C11.5873 12.8833 12.8811 11.5898 12.8811 9.99927C12.8811 8.4087 11.588 7.11523 9.99793 7.11523C8.40784 7.11523 7.11475 8.4087 7.11475 9.99927C7.11475 11.5898 8.40784 12.8833 9.99793 12.8833ZM9.99793 8.20971C10.9849 8.20971 11.7877 9.0127 11.7877 9.99997C11.7877 10.9872 10.9849 11.7902 9.99793 11.7902C9.01095 11.7902 8.2082 10.9872 8.2082 9.99997C8.2082 9.0127 9.01095 8.20971 9.99793 8.20971Z" fill="white" />
                      <path d="M13.1484 7.58123C13.5764 7.58123 13.9253 7.23299 13.9253 6.80417C13.9253 6.37534 13.5771 6.0271 13.1484 6.0271C12.7197 6.0271 12.3716 6.37534 12.3716 6.80417C12.3716 7.23299 12.7197 7.58123 13.1484 7.58123Z" fill="white" />
                    </svg>
                  </a>
                  <a target="_blank" rel="noreferrer" href={linkedinUrl} className={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10.0197 0.000244141H9.97418C4.4656 0.000244141 0 4.46715 0 9.97735V10.0229C0 15.5331 4.4656 20 9.97418 20H10.0197C15.5283 20 19.9939 15.5331 19.9939 10.0229V9.97735C19.9939 4.46715 15.5283 0.000244141 10.0197 0.000244141Z" fill="#0B395B" />
                      <path d="M4.76741 6.6481C4.50403 6.40356 4.37305 6.10087 4.37305 5.74072C4.37305 5.38056 4.50473 5.06455 4.76741 4.81931C5.03079 4.57477 5.36983 4.45215 5.78521 4.45215C6.2006 4.45215 6.52633 4.57477 6.78901 4.81931C7.05239 5.06385 7.18337 5.37145 7.18337 5.74072C7.18337 6.10998 7.05169 6.40356 6.78901 6.6481C6.52563 6.89265 6.19149 7.01526 5.78521 7.01526C5.37893 7.01526 5.03079 6.89265 4.76741 6.6481ZM6.96203 8.05089V15.5483H4.59369V8.05089H6.96203Z" fill="#FEFFFC" />
                      <path d="M14.8469 8.79102C15.3632 9.35157 15.621 10.1209 15.621 11.1005V15.4153H13.3717V11.4046C13.3717 10.9106 13.2436 10.5266 12.9879 10.2534C12.7322 9.98009 12.3876 9.84276 11.9561 9.84276C11.5246 9.84276 11.1799 9.97939 10.9242 10.2534C10.6686 10.5266 10.5404 10.9106 10.5404 11.4046V15.4153H8.27783V8.02937H10.5404V9.00893C10.7694 8.68241 11.0784 8.42457 11.4664 8.23468C11.8545 8.04479 12.2909 7.9502 12.7763 7.9502C13.6407 7.9502 14.3314 8.23047 14.8469 8.79032V8.79102Z" fill="#FEFFFC" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.slide}>
            <div className={styles.slideInner}>
              <div className={styles.slideHeading}>
                <div className={styles.headingBadgeAlt}>{awardHeadingLine1}</div>
                <div className={styles.headingBadgeAlt}>{awardHeadingLine2}</div>
              </div>
              <div className={styles.slideContent}>
                <p className={styles.slideText}>
                  {awardDescription}{' '}
                  <a href={awardLinkUrl} className={styles.slideLink}>
                    {awardLinkLabel}
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        className={styles.arrowButton}
        style={{ right: '54px' }}
        aria-label="Next slide"
        onClick={() => setSlideIndex((i) => (i === 0 ? 1 : 0))}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B395B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}
