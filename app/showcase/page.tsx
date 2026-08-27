import '@/builder-registry';
import styles from './showcase.module.css';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import AnnouncementCarousel from '@/components/AnnouncementCarousel';
import Footer from '@/components/Footer';
import BankerpageHero from '@/components/BankerpageHero';
import BankerpageAboutMe from '@/components/BankerpageAboutMe';
import BankerpageStory from '@/components/BankerpageStory';

export default function ShowcasePage() {
  return (
    <main className={styles.showcaseMain}>
      <section className={styles.showcaseSection}>
        <div className={styles.showcaseSectionHeader}>
          <h2>Nav Bar</h2>
          <p className={styles.showcaseSectionDescription}>
            Top navigation with logo, links, and a highlighted CTA button.
          </p>
        </div>
        <div className={styles.showcaseComponentWrapper}>
          <NavBar />
        </div>
      </section>

      <section className={styles.showcaseSection}>
        <div className={styles.showcaseSectionHeader}>
          <h2>Hero</h2>
          <p className={styles.showcaseSectionDescription}>
            Homepage hero with homebuyer photos, headline, and dual CTAs.
          </p>
        </div>
        <div className={styles.showcaseComponentWrapper}>
          <Hero />
        </div>
      </section>

      <section className={styles.showcaseSection}>
        <div className={styles.showcaseSectionHeader}>
          <h2>Announcement Carousel</h2>
          <p className={styles.showcaseSectionDescription}>
            Rotating banner alternating social-follow prompts and company award callouts.
          </p>
        </div>
        <div className={styles.showcaseComponentWrapper}>
          <AnnouncementCarousel />
        </div>
      </section>

      <section className={styles.showcaseSection}>
        <div className={styles.showcaseSectionHeader}>
          <h2>Footer</h2>
          <p className={styles.showcaseSectionDescription}>
            Site footer with company/social links, headquarters info, affiliations, and legal disclaimers.
          </p>
        </div>
        <div className={styles.showcaseComponentWrapper}>
          <Footer />
        </div>
      </section>

      <section className={styles.showcaseSection}>
        <div className={styles.showcaseSectionHeader}>
          <h2>Bankerpage Hero</h2>
          <p className={styles.showcaseSectionDescription}>
            Banker profile hero with background image, headshot, name, credentials, and contact links.
          </p>
        </div>
        <div className={styles.showcaseComponentWrapper}>
          <BankerpageHero />
        </div>
      </section>

      <section className={styles.showcaseSection}>
        <div className={styles.showcaseSectionHeader}>
          <h2>Bankerpage About Me</h2>
          <p className={styles.showcaseSectionDescription}>
            Expandable bio section with an intro, a contact CTA, and a read more/less toggle.
          </p>
        </div>
        <div className={styles.showcaseComponentWrapper}>
          <BankerpageAboutMe />
        </div>
      </section>

      <section className={styles.showcaseSection}>
        <div className={styles.showcaseSectionHeader}>
          <h2>Bankerpage Story</h2>
          <p className={styles.showcaseSectionDescription}>
            Scrollable image story carousel with previous/next controls.
          </p>
        </div>
        <div className={styles.showcaseComponentWrapper}>
          <BankerpageStory />
        </div>
      </section>
    </main>
  );
}
