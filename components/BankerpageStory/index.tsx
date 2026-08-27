'use client';
import { useRef } from 'react';
import styles from './styles.module.css';

interface StoryImage {
  src: string;
  alt?: string;
}

interface BankerpageStoryProps {
  heading?: string;
  images?: StoryImage[];
}

export default function BankerpageStory({
  heading = 'This is my story.',
  images = [
    { src: 'https://images.ctfassets.net/n1no4gieqp7s/764EStOgXShURK0iiHBiVX/30ddc4033ade83cbc2b23bcc88b8a43c/terence-1.jpg?w=456&h=328&q=90&fm=webp', alt: '' },
    { src: 'https://images.ctfassets.net/n1no4gieqp7s/1BwbYQSp4jQHRpyEidIDiI/4d48164541c06fcd9fdf4a5b44308793/terence-3.jpg?w=456&h=328&q=90&fm=webp', alt: '' },
    { src: 'https://images.ctfassets.net/n1no4gieqp7s/QeIrr7wD2H4j1Lhigj6KI/62fcfe0ad5ba13ca0253cecc93195e76/terence-2.jpg?w=456&h=328&q=90&fm=webp', alt: '' },
    { src: 'https://images.ctfassets.net/n1no4gieqp7s/4lsVyJaFkFRqIZx35qn1xI/15b08ee4db9b5bd2e72037fc3d839314/Knights-Game.jpg?w=480&h=472&q=90&fm=webp', alt: '' },
    { src: 'https://images.ctfassets.net/n1no4gieqp7s/2x2v61biIuA8v4EGJNMIRH/c8445cf8758ae101165dbf0a7820b7e5/MAME-Awards-2.jpg?w=960&h=952&q=90&fm=webp', alt: '' },
  ],
}: BankerpageStoryProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 400, behavior: 'smooth' });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => scrollByAmount(-1)}
            aria-label="Previous"
          >
            <svg viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.controlIcon}>
              <path d="M13 5.5L1 5.5" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
              <path d="M5.5 10L1 5.5L5.5 1" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => scrollByAmount(1)}
            aria-label="Next"
          >
            <svg viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.controlIcon}>
              <path d="M0 5.5H12" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
              <path d="M7.5 1L12 5.5L7.5 10" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.track} ref={trackRef}>
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img src={image.src} alt={image.alt || ''} className={styles.slideImage} />
          </div>
        ))}
      </div>
    </section>
  );
}
