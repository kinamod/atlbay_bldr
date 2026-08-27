import styles from './styles.module.css';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  tagline?: string;
  companyLinks?: FooterLink[];
  affiliateLinks?: FooterLink[];
  socialLinks?: FooterLink[];
  headquartersLabel?: string;
  headquartersPhoneLabel?: string;
  headquartersPhoneHref?: string;
  headquartersAddressLine1?: string;
  headquartersAddressLine2?: string;
  headquartersCityStateZip?: string;
  headquartersMapUrl?: string;
  professionalAffiliationsText?: string;
  professionalAffiliationsHref?: string;
  legalLinks?: FooterLink[];
  cookieSettingsLabel?: string;
  copyrightText?: string;
  disclaimerText?: string;
  reviewsUrl?: string;
  reviewsLabel?: string;
  nmlsUrl?: string;
  nmlsLabel?: string;
}

export default function Footer({
  tagline = 'Lending Peace of Mind',
  companyLinks = [
    { label: 'Sales Careers', href: 'https://www.joinatlanticbay.com/' },
    { label: 'Corporate Careers', href: 'https://www.atlanticbay.com/careers/' },
    { label: 'AB Cares', href: 'https://www.atlanticbay.com/abcares/' },
    { label: 'Newsroom', href: 'https://www.atlanticbay.com/newsroom/' },
  ],
  affiliateLinks = [
    { label: 'AB Insurance', href: '#' },
    { label: 'Atlantic Carolinas Title', href: '#' },
  ],
  socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/AtlanticBay/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/atlantic-bay-mortgage-group?trk=company_logo' },
    { label: 'Instagram', href: 'https://instagram.com/atlanticbaymortgagegroup/' },
    { label: 'Youtube', href: 'https://www.youtube.com/@atlanticbaymortgagegroup4029' },
  ],
  headquartersLabel = 'Headquarters',
  headquartersPhoneLabel = '(757) 213-1660',
  headquartersPhoneHref = 'tel:(757)-213-1660',
  headquartersAddressLine1 = '600 Lynnhaven Parkway',
  headquartersAddressLine2 = 'Suite 100',
  headquartersCityStateZip = 'Virginia Beach, VA 23452',
  headquartersMapUrl = 'https://google.com/maps/place/Atlantic+Bay+Mortgage+Group/@36.8259918,-76.0685092,17z/data=!3m1!4b1!4m8!1m2!2m1!1satlantic+bay+mortgage+group!3m4!1s0x89baeab9514c932f:0xbaa2770cb5886c70!8m2!3d36.8259918!4d-76.0663205',
  professionalAffiliationsText = 'Fostering, cultivating, and preserving a culture of diversity, equity, and inclusion.',
  professionalAffiliationsHref = 'https://www.atlanticbay.com/professional-affiliations/',
  legalLinks = [
    { label: 'Legal', href: 'https://www.atlanticbay.com/legal/' },
    { label: 'Privacy Policy', href: 'https://www.atlanticbay.com/privacy-policy/' },
    { label: 'Online Privacy Policy', href: 'https://www.atlanticbay.com/online-privacy-policy/' },
    { label: 'Opt-out', href: 'https://www.atlanticbay.com/opt-out/' },
  ],
  cookieSettingsLabel = 'Cookie Settings',
  copyrightText = '\u00A9 2026 Atlantic Bay Mortgage Group',
  disclaimerText = 'Featured statements, testimonials, and opinions are unsolicited and may not be representative of all borrowers\u2019 experiences. Individual results may vary. Testimonials are voluntarily provided and are not paid, nor provided with any benefits in exchange for said statements. Loan programs may change at any time with or without notice. Information deemed reliable but not guaranteed. All loans subject to income verification, credit approval and property appraisal. Not a commitment to lend. Atlantic Bay Mortgage Group, L.L.C. NMLS #72043 is an Equal Opportunity Lender. Located at 600 Lynnhaven Parkway Suite 100, Virginia Beach, VA 23452.',
  reviewsUrl = 'https://www.experience.com/reviews/office/atlantic-bay-mortgage-virgnia-beach-46727',
  reviewsLabel = 'www.experience.com/reviews/office/atlantic-bay-mortgage-virgnia-beach-46727',
  nmlsUrl = 'https://www.nmlsconsumeraccess.org/',
  nmlsLabel = 'nmlsconsumeraccess.org',
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <svg fill="none" height="56" viewBox="0 0 80 80" width="56" xmlns="http://www.w3.org/2000/svg" className={styles.footerLogo}>
              <rect height="77.3871" rx="38.6936" stroke="#f7fafc" strokeWidth="2.6129" width="77.3871" x="1.30645" y="1.30645" />
              <g fill="#f7fafc">
                <path d="m28.9304 43.9291c.5018.8734 1.1992 1.6185 2.0374 2.1771-1.595 4.0573-3.2016 8.6093-4.8315 12.6491h-2.9105c1.8162-4.7558 3.8303-10.0471 5.7046-14.8262z" />
                <path d="m34.3266 44.2609s-3.9525-.3318-4.9421-1.496c.4632 1.5077 1.5721 2.7318 3.0269 3.3412.5396.2703 1.1002.4961 1.6765.6753 1.525.3747 3.0867.5797 4.6568.6112 2.538.128 5.1167.1047 7.6604.291 1.128.1051 2.242.3275 3.3238.6636.9284.2754 1.7836.7547 2.5031 1.4029l.2444.2328c-.5918-.9798-1.2971-1.8864-2.1013-2.7009-.8101-.6994-1.7701-1.2033-2.8058-1.4727-2.2003-.652-4.4414-.7509-7.218-1.0536z" />
                <path d="m23.2957 35.931c.2025.2966.4499.5597.7334.7801.8732.6519 2.2411.943 3.4926 1.2632 1.2515.3201 2.6427.4657 3.9816.716 5.1748.9721 11.1996 1.6998 15.4489 3.5276 2.2062.9489 3.4519 2.8 4.6044 5.0587l-.2852-.2562c-1.5076-1.496-4.3017-2.3285-6.9212-2.6544-1.4028-.1805-2.7591-.3551-4.1853-.489-1.4261-.1339-2.7475-.2271-4.1562-.3726-3.0851-.326-5.7977-.8208-8.1261-1.9035-1.6943-.7226-3.0966-1.9937-3.9816-3.6092-.2976-.5939-.4943-1.2333-.5821-1.8919z" />
                <path d="m55.9516 58.7553c-.5181-1.1642-.9954-2.7068-1.4728-3.9409-.4773-1.234-.9197-2.8464-1.8569-3.9-.9967-1.0609-2.3133-1.7662-3.7487-2.0083-1.6856-.3405-3.403-.4986-5.1225-.4715l-6.0189-.1222c-2.0664 0-4.4239-.3668-5.5358-1.4204.5098 1.7487 1.8423 3.1377 3.5683 3.7197.5659.2396 1.1498.4342 1.7463.5821 1.5471.2821 3.1202.3953 4.6917.3376.9663 0 1.9268-.0349 2.9106-.064 1.2165-.035 2.5204-.2445 3.6963.1455 1.4727.4889 2.1305 1.8802 2.7533 3.1899.4992 1.1411.9403 2.3068 1.3214 3.4926 0 .0757.0524.4599.0757.4599z" />
                <path d="m43.0173 25.4879c-.2852-.7684-1.5135-3.6265-1.5135-3.6265-.2391-.5124-.6746-.9067-1.208-1.094-.5335-.1874-1.1199-.1518-1.6268.0986-.5187.2915-.9061.7706-1.0827 1.3388l-.8615 2.1829c-1.8569 4.5113-3.6964 9.2613-5.4194 13.6038.8732.1571 1.7871.2968 2.666.454 1.9035-4.9944 4.0165-9.7677 5.6755-15.0066 2.0374 6.0888 4.424 11.84 6.5894 17.8007 1.496.6287 3.1026 1.2748 3.9874 2.5031-2.2935-6.1121-4.814-12.1893-7.2064-18.2548z" />
              </g>
            </svg>
            <div className={styles.footerTagline}>{tagline}</div>
          </div>
        </div>

        <div className={styles.footerColumns}>
          <div className={styles.footerColumnGroup}>
            <div>
              <div className={styles.footerColumnHeading}>Company</div>
              <ul className={styles.footerLinkList}>
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.footerColumnHeading}>Affiliates</div>
              <ul className={styles.footerLinkList}>
                {affiliateLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.footerColumnHeading}>Social</div>
              <ul className={styles.footerLinkList}>
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.footerAddress}>
            <div className={styles.footerColumnHeadingRight}>{headquartersLabel}</div>
            <ul className={styles.footerAddressList}>
              <li>
                <a href={headquartersPhoneHref} className={styles.footerLink}>
                  {headquartersPhoneLabel}
                </a>
              </li>
              <li>
                <a href={headquartersMapUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                  {headquartersAddressLine1}, {headquartersAddressLine2}
                  <br />
                  {headquartersCityStateZip}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <a href={professionalAffiliationsHref} className={styles.affiliationsBanner}>
          <p className={styles.affiliationsText}>{professionalAffiliationsText}</p>
          <div className={styles.affiliationsLogos}>
            <svg width="101" height="80" viewBox="0 0 101 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.affiliationLogo}>
              <title>Nammba</title>
              <path fillRule="evenodd" clipRule="evenodd" d="M82.0327 59.3668C75.5211 69.9464 63.8343 77 50.5 77C37.2018 77 25.5422 69.9845 19.0203 59.4527L14.9666 58.386C21.6242 71.2264 35.0375 80 50.5 80C65.9714 80 79.3913 71.2163 86.0449 58.3638L82.0327 59.3668ZM14.4549 57.3634C11.9205 52.1118 10.5 46.2218 10.5 40C10.5 17.9086 28.4086 0 50.5 0C72.5914 0 90.5 17.9086 90.5 40C90.5 46.2049 89.0872 52.0798 86.5657 57.3205L84.0956 55.5241C86.2807 50.8032 87.5 45.544 87.5 40C87.5 19.5655 70.9345 3 50.5 3C30.0655 3 13.5 19.5655 13.5 40C13.5 45.6057 14.7466 50.9202 16.9777 55.6815L14.4549 57.3634ZM33.2066 49.6877C31.4846 46.6865 30.5 43.2082 30.5 39.5C30.5 28.1782 39.6782 19 51 19C62.3218 19 71.5 28.1782 71.5 39.5C71.5 43.126 70.5586 46.5321 68.9068 49.4873C69.8452 49.1909 70.7512 48.8683 71.6193 48.5195C72.8288 45.7583 73.5 42.7075 73.5 39.5C73.5 27.0736 63.4264 17 51 17C38.5736 17 28.5 27.0736 28.5 39.5C28.5 42.8256 29.2215 45.9826 30.5164 48.8232C31.386 49.1342 32.2842 49.4223 33.2066 49.6877ZM55.0394 51.8804C52.4273 52.0314 49.7697 52.0394 47.1359 51.9044C40.6801 49.6155 35.6885 45.2356 36.3611 42.4429C36.4338 42.141 36.6491 41.8988 36.9113 41.7323C39.055 40.3707 43.1951 39.4603 47.5229 41.5L53.823 45.3769C53.9558 45.4587 54.082 45.5543 54.183 45.6731C55.3607 47.0584 54.052 48.3777 52.2379 48.0465C52.0943 48.0203 51.9571 47.9671 51.8266 47.9018L46.4452 45.2112C46.1675 45.0723 45.8354 44.9628 45.5777 45.1359C45.378 45.2701 45.2582 45.4897 45.344 45.732C45.4158 45.9347 45.621 46.049 45.8133 46.1452L49.5228 48C51.3006 49.0339 53.0229 49.5 55.0228 48.5L61.5229 44.5C62.9571 43.5439 64.3912 45.3301 63.6404 46.3627C63.5699 46.4597 63.4732 46.5343 63.3746 46.6026L57.1462 50.9146C57.0641 50.9714 56.9769 51.0226 56.887 51.0662C56.2207 51.3899 55.6161 51.6604 55.0394 51.8804Z" fill="white" />
              <path d="M32.5 63L32.3728 63.4835L32.9611 63.6384L32.999 63.0312L32.5 63ZM13.5 58L13.2226 57.584L12.2977 58.2006L13.3728 58.4835L13.5 58ZM19.5 54L19.7773 54.416L20.1234 54.1853L19.9596 53.803L19.5 54ZM16.5 47L16.7443 46.5637L15.4611 45.8451L16.0404 47.197L16.5 47ZM21 56.5L20.52 56.36L20.3788 56.8443L20.8643 56.9812L21 56.5ZM22.75 50.5L23.23 50.64L23.3414 50.2581L22.9943 50.0637L22.75 50.5ZM32.7 59.8L33.199 59.8312L33.2242 59.4283L32.8357 59.3188L32.7 59.8Z" fill="white" />
              <path d="M29.1968 51.3308L31.5271 51.965C32.0539 52.1083 32.4914 52.3314 32.8394 52.6341C33.1932 52.9335 33.432 53.2911 33.5559 53.7068C33.6842 54.1238 33.6828 54.5733 33.5517 55.0551C33.4205 55.5369 33.194 55.925 32.872 56.2195C32.5546 56.5151 32.1669 56.7046 31.7089 56.788C31.2567 56.868 30.7672 56.8364 30.2403 56.693L27.9101 56.0588L29.1968 51.3308Z" fill="white" />
            </svg>
            <svg width="121" height="80" viewBox="0 0 121 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.affiliationLogo}>
              <title>Charlotte Crown</title>
              <path fillRule="evenodd" clipRule="evenodd" d="M52.333 8L46.9769 8.29215L68.4013 44.032L52.333 8ZM42.1076 8.9739L37.2385 10.4347L66.4536 45.4928L42.1076 8.9739ZM77.6524 14.8169L74.244 12.8692V42.0844L77.6524 14.8169ZM90.6045 26.8924L92.26 29.4244L79.6002 44.5189L90.6045 26.8924ZM93.3316 31.5669L94.5002 33.5146L81.0612 45.9797L93.3316 31.5669ZM81.061 17.2515L83.4955 19.1992L76.1918 42.5713L81.061 17.2515ZM27.5 15.3038L32.3692 12.3823L64.9927 46.9535L27.5 15.3038ZM57.2021 8L61.5843 8.48692L70.3489 43.0581L57.2021 8ZM70.3489 11.1164L66.9405 9.75301L72.2966 42.0844L70.3489 11.1164ZM86.6119 21.926L88.8518 24.5553L78.1396 43.0582L86.6119 21.926Z" fill="#F7FAFC" />
              <path d="M26.9695 30.5548C30.5426 30.5548 33.4391 27.6583 33.4391 24.0853C33.4391 20.5122 30.5426 17.6157 26.9695 17.6157C23.3965 17.6157 20.5 20.5122 20.5 24.0853C20.5 27.6583 23.3965 30.5548 26.9695 30.5548Z" fill="#F7FAFC" />
              <path d="M38.678 19.7681C41.0993 19.7681 43.0621 17.8053 43.0621 15.3841C43.0621 12.9628 41.0993 11 38.678 11C36.2568 11 34.2939 12.9628 34.2939 15.3841C34.2939 17.8053 36.2568 19.7681 38.678 19.7681Z" fill="#F7FAFC" />
            </svg>
            <svg width="221" height="80" viewBox="0 0 221 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.affiliationLogo}>
              <title>Nahrep Southeast Region</title>
              <path d="M26.9695 30.5548C30.5426 30.5548 33.4391 27.6583 33.4391 24.0853C33.4391 20.5122 30.5426 17.6157 26.9695 17.6157C23.3965 17.6157 20.5 20.5122 20.5 24.0853C20.5 27.6583 23.3965 30.5548 26.9695 30.5548Z" fill="#F7FAFC" />
              <path d="M38.678 19.7681C41.0993 19.7681 43.0621 17.8053 43.0621 15.3841C43.0621 12.9628 41.0993 11 38.678 11C36.2568 11 34.2939 12.9628 34.2939 15.3841C34.2939 17.8053 36.2568 19.7681 38.678 19.7681Z" fill="#F7FAFC" />
              <path d="M48.6485 21.3057C49.8574 21.3057 50.8374 20.3257 50.8374 19.1167C50.8374 17.9078 49.8574 16.9277 48.6485 16.9277C47.4395 16.9277 46.4595 17.9078 46.4595 19.1167C46.4595 20.3257 47.4395 21.3057 48.6485 21.3057Z" fill="#F7FAFC" />
              <path d="M36.0806 25.2544H43.7557V29.3492H43.9262C45.9721 26.052 49.4976 24.4598 52.9105 24.4598C61.4959 24.4598 63.6575 29.2914 63.6575 36.5707V54.6519H55.5835V38.0473C55.5835 33.2157 54.1618 30.8258 50.4079 30.8258C46.0299 30.8258 44.1545 33.2705 44.1545 39.2407V54.649H36.0806V25.2544Z" fill="#F7FAFC" />
            </svg>
          </div>
        </a>

        <div className={styles.footerBottom}>
          <ul className={styles.legalList}>
            <li className={styles.copyrightItem}>
              <p>{copyrightText}</p>
            </li>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.legalLink}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button type="button" className={styles.cookieButton}>
                {cookieSettingsLabel}
              </button>
            </li>
          </ul>

          <div className={styles.disclaimerRow}>
            <p className={styles.disclaimerText}>
              {disclaimerText}{' '}
              For more consumer reviews, visit{' '}
              <a href={reviewsUrl} target="_blank" rel="noreferrer" className={styles.disclaimerLink}>
                {reviewsLabel}
              </a>
              . (
              <a href={nmlsUrl} target="_blank" rel="noreferrer" className={styles.disclaimerLink}>
                {nmlsLabel}
              </a>
              )
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
