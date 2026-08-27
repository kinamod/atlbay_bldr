import styles from './styles.module.css';

interface HeroProps {
  backgroundImageUrl?: string;
  homebuyerImage1Url?: string;
  homebuyerImage2Url?: string;
  homebuyerImage3Url?: string;
  homebuyerImage4Url?: string;
  homebuyerImage5Url?: string;
  homebuyerImage6Url?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export default function Hero({
  backgroundImageUrl = 'https://www.atlanticbay.com/static/8c9f0d0a0522cc223c814e669429d4b6/3f404/hero-background.webp',
  homebuyerImage1Url = 'https://www.atlanticbay.com/static/65e89201b42b19736bbd7470e7013701/72459/homebuyers-1.webp',
  homebuyerImage2Url = 'https://www.atlanticbay.com/static/a299f75638090a698745493f46edf9f1/f5eea/homebuyers-2.webp',
  homebuyerImage3Url = 'https://www.atlanticbay.com/static/541a67eb7591cc9d7948c2f4b89572eb/95cfd/homebuyers-3.webp',
  homebuyerImage4Url = 'https://www.atlanticbay.com/static/43d12ddc9af811920fb09756f902b91c/69fa8/homebuyers-4.webp',
  homebuyerImage5Url = 'https://www.atlanticbay.com/static/9100141b5595cd945e3414ae9af14081/902fd/homebuyers-5.webp',
  homebuyerImage6Url = 'https://www.atlanticbay.com/static/175b97001e4938d17d91e2c999368ac5/b899e/homebuyers-6.webp',
  headingLine1 = 'Lending',
  headingLine2 = 'peace of mind',
  description = "Home is personal. Your mortgage should be too. For more than 30 years, we've made lending feel simple, human, and built on trust—because your journey matters as much as your loan.",
  primaryCtaLabel = 'I\u2019m Buying a Home',
  primaryCtaHref = 'https://www.atlanticbay.com/purchase-prequalify/',
  secondaryCtaLabel = 'I\u2019m Refinancing',
  secondaryCtaHref = 'https://www.atlanticbay.com/refinance-prequalify/',
}: HeroProps) {
  const images = [
    homebuyerImage1Url,
    homebuyerImage2Url,
    homebuyerImage3Url,
    homebuyerImage4Url,
    homebuyerImage5Url,
    homebuyerImage6Url,
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackgroundWrap}>
        <img src={backgroundImageUrl} alt="" aria-hidden="true" className={styles.heroBackgroundImage} />
      </div>

      <div className={styles.heroImageRow}>
        {images.map((src, index) => (
          <div key={src + index} className={styles.heroImageWrap}>
            <img src={src} alt="" role="presentation" aria-hidden="true" loading="lazy" className={styles.heroImage} />
          </div>
        ))}
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroHeadingGroup}>
          <div className={styles.heroHeadingTop}>{headingLine1}</div>
          <div className={styles.heroHeadingBottom}>{headingLine2}</div>
          <p className={styles.heroDescription}>{description}</p>
        </div>
        <div className={styles.heroCtaRow}>
          <a href={primaryCtaHref} className={styles.heroCta}>
            {primaryCtaLabel}
          </a>
          <a href={secondaryCtaHref} className={styles.heroCta}>
            {secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
