'use client';
import { useState } from 'react';
import styles from './styles.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  heading?: string;
  intro?: string;
  items?: FaqItem[];
}

export default function FaqAccordion({
  heading = 'Frequently Asked Questions',
  intro = "Chances are, if you're wondering about it, someone else has too. Here are answers to some of the questions we hear most often.",
  items = [
    {
      question: "What's the fastest way to increase my home's value?",
      answer:
        'The fastest value boosts usually come from low-cost, high-visibility fixes like fresh paint, updated landscaping, and organized storage. Larger projects like kitchen or bathroom remodels can pay off too, but they take more time and money to complete.',
    },
    {
      question: 'What happens if my escrow account has a shortage?',
      answer:
        "Yes, deferred maintenance is one of the most common reasons buyers negotiate down an offer or walk away entirely. Staying current on tasks like HVAC servicing, roof inspections, and gutter cleaning helps protect the value you've already built.",
    },
    {
      question: "How often should I check on my home's value and condition?",
      answer:
        "Most homeowners benefit from a quick review once or twice a year, and again before any major life change like refinancing or selling. A short walkthrough of your home's systems, insurance coverage, and equity position can catch small issues before they become expensive ones.",
    },
    {
      question: "Does my homeowners insurance need to change as my home's value goes up?",
      answer:
        "Homeowners insurance should be reviewed regularly because coverage limits set at purchase don't automatically keep up with rising home values or rebuilding costs. An outdated policy can leave you underinsured even if your home has gained significant value.",
    },
    {
      question: "Can increasing my home's value help me access more equity?",
      answer:
        'Yes, home improvements and market appreciation can both increase the equity available to you through a cash-out refinance or home equity option. Talking with a mortgage banker about your updated home value is the best way to know what options you currently qualify for.',
    },
  ],
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.heading}>
          {heading}
          <svg
            className={styles.headingIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </h2>
        <p className={styles.intro}>{intro}</p>
      </header>
      <div className={styles.items}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={styles.item}>
              <h3 className={styles.itemHeading}>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <svg
                    className={isOpen ? styles.chevronOpen : styles.chevron}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </h3>
              <div className={isOpen ? styles.answerWrapperOpen : styles.answerWrapper}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
