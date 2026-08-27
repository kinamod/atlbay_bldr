"use client";
import { builder, Builder } from "@builder.io/react";
import NavBar from "./components/NavBar";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import BankerpageHero from "./components/BankerpageHero";
import BankerpageAboutMe from "./components/BankerpageAboutMe";
import BankerpageStory from "./components/BankerpageStory";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(NavBar, {
  name: "NavBar",
  inputs: [
    { name: "homeHref", type: "url", defaultValue: "https://www.atlanticbay.com/" },
    { name: "aboutLabel", type: "string", defaultValue: "About" },
    { name: "aboutHref", type: "url", defaultValue: "https://www.atlanticbay.com/about/" },
    { name: "expertLabel", type: "string", defaultValue: "Find an Expert" },
    { name: "expertHref", type: "url", defaultValue: "https://www.atlanticbay.com/search-mortgage-bankers/" },
    { name: "knowledgeLabel", type: "string", defaultValue: "Knowledge Center" },
    { name: "knowledgeHref", type: "url", defaultValue: "https://www.atlanticbay.com/knowledge-center/" },
    { name: "ctaLabel", type: "string", defaultValue: "What Can I Afford?" },
    { name: "ctaHref", type: "url", defaultValue: "https://www.atlanticbay.com/prequalify-welcome/" },
  ],
});

Builder.registerComponent(AnnouncementCarousel, {
  name: "AnnouncementCarousel",
  inputs: [
    { name: "tipsHeadingLine1", type: "string", defaultValue: "Tips, Tools, and What" },
    { name: "tipsHeadingLine2", type: "string", defaultValue: "to Know Next" },
    { name: "tipsDescription", type: "longText", defaultValue: "Follow us on social for homebuyer tips, guides, and updates." },
    { name: "facebookUrl", type: "url", defaultValue: "https://www.facebook.com/AtlanticBay/" },
    { name: "instagramUrl", type: "url", defaultValue: "https://instagram.com/atlanticbaymortgagegroup/" },
    { name: "linkedinUrl", type: "url", defaultValue: "https://www.linkedin.com/company/atlantic-bay-mortgage-group?trk=company_logo" },
    { name: "awardHeadingLine1", type: "string", defaultValue: "#1 Best Large Mortgage" },
    { name: "awardHeadingLine2", type: "string", defaultValue: "Company To Work For" },
    { name: "awardDescription", type: "longText", defaultValue: "Awarded four years running by National Mortgage News." },
    { name: "awardLinkLabel", type: "string", defaultValue: "Learn more" },
    { name: "awardLinkUrl", type: "url", defaultValue: "https://www.atlanticbay.com/newsroom/uncategorized/2025-national-mortgage-news-award/" },
  ],
});

Builder.registerComponent(Hero, {
  name: "Hero",
  inputs: [
    { name: "backgroundImageUrl", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://www.atlanticbay.com/static/8c9f0d0a0522cc223c814e669429d4b6/3f404/hero-background.webp" },
    { name: "homebuyerImage1Url", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://www.atlanticbay.com/static/65e89201b42b19736bbd7470e7013701/72459/homebuyers-1.webp" },
    { name: "homebuyerImage2Url", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://www.atlanticbay.com/static/a299f75638090a698745493f46edf9f1/f5eea/homebuyers-2.webp" },
    { name: "homebuyerImage3Url", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://www.atlanticbay.com/static/541a67eb7591cc9d7948c2f4b89572eb/95cfd/homebuyers-3.webp" },
    { name: "homebuyerImage4Url", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://www.atlanticbay.com/static/43d12ddc9af811920fb09756f902b91c/69fa8/homebuyers-4.webp" },
    { name: "homebuyerImage5Url", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://www.atlanticbay.com/static/9100141b5595cd945e3414ae9af14081/902fd/homebuyers-5.webp" },
    { name: "homebuyerImage6Url", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://www.atlanticbay.com/static/175b97001e4938d17d91e2c999368ac5/b899e/homebuyers-6.webp" },
    { name: "headingLine1", type: "string", defaultValue: "Lending" },
    { name: "headingLine2", type: "string", defaultValue: "peace of mind" },
    { name: "description", type: "longText", defaultValue: "Home is personal. Your mortgage should be too. For more than 30 years, we've made lending feel simple, human, and built on trust\u2014because your journey matters as much as your loan." },
    { name: "primaryCtaLabel", type: "string", defaultValue: "I\u2019m Buying a Home" },
    { name: "primaryCtaHref", type: "url", defaultValue: "https://www.atlanticbay.com/purchase-prequalify/" },
    { name: "secondaryCtaLabel", type: "string", defaultValue: "I\u2019m Refinancing" },
    { name: "secondaryCtaHref", type: "url", defaultValue: "https://www.atlanticbay.com/refinance-prequalify/" },
  ],
});

Builder.registerComponent(Footer, {
  name: "Footer",
  inputs: [
    { name: "tagline", type: "string", defaultValue: "Lending Peace of Mind" },
    {
      name: "companyLinks",
      type: "list",
      defaultValue: [
        { label: "Sales Careers", href: "https://www.joinatlanticbay.com/" },
        { label: "Corporate Careers", href: "https://www.atlanticbay.com/careers/" },
        { label: "AB Cares", href: "https://www.atlanticbay.com/abcares/" },
        { label: "Newsroom", href: "https://www.atlanticbay.com/newsroom/" },
      ],
      subFields: [
        { name: "label", type: "string" },
        { name: "href", type: "url" },
      ],
    },
    {
      name: "affiliateLinks",
      type: "list",
      defaultValue: [
        { label: "AB Insurance", href: "#" },
        { label: "Atlantic Carolinas Title", href: "#" },
      ],
      subFields: [
        { name: "label", type: "string" },
        { name: "href", type: "url" },
      ],
    },
    {
      name: "socialLinks",
      type: "list",
      defaultValue: [
        { label: "Facebook", href: "https://www.facebook.com/AtlanticBay/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/atlantic-bay-mortgage-group?trk=company_logo" },
        { label: "Instagram", href: "https://instagram.com/atlanticbaymortgagegroup/" },
        { label: "Youtube", href: "https://www.youtube.com/@atlanticbaymortgagegroup4029" },
      ],
      subFields: [
        { name: "label", type: "string" },
        { name: "href", type: "url" },
      ],
    },
    { name: "headquartersLabel", type: "string", defaultValue: "Headquarters" },
    { name: "headquartersPhoneLabel", type: "string", defaultValue: "(757) 213-1660" },
    { name: "headquartersPhoneHref", type: "url", defaultValue: "tel:(757)-213-1660" },
    { name: "headquartersAddressLine1", type: "string", defaultValue: "600 Lynnhaven Parkway" },
    { name: "headquartersAddressLine2", type: "string", defaultValue: "Suite 100" },
    { name: "headquartersCityStateZip", type: "string", defaultValue: "Virginia Beach, VA 23452" },
    { name: "headquartersMapUrl", type: "url", defaultValue: "https://google.com/maps/place/Atlantic+Bay+Mortgage+Group/@36.8259918,-76.0685092,17z" },
    { name: "professionalAffiliationsText", type: "longText", defaultValue: "Fostering, cultivating, and preserving a culture of diversity, equity, and inclusion." },
    { name: "professionalAffiliationsHref", type: "url", defaultValue: "https://www.atlanticbay.com/professional-affiliations/" },
    {
      name: "legalLinks",
      type: "list",
      defaultValue: [
        { label: "Legal", href: "https://www.atlanticbay.com/legal/" },
        { label: "Privacy Policy", href: "https://www.atlanticbay.com/privacy-policy/" },
        { label: "Online Privacy Policy", href: "https://www.atlanticbay.com/online-privacy-policy/" },
        { label: "Opt-out", href: "https://www.atlanticbay.com/opt-out/" },
      ],
      subFields: [
        { name: "label", type: "string" },
        { name: "href", type: "url" },
      ],
    },
    { name: "cookieSettingsLabel", type: "string", defaultValue: "Cookie Settings" },
    { name: "copyrightText", type: "string", defaultValue: "\u00A9 2026 Atlantic Bay Mortgage Group" },
    {
      name: "disclaimerText",
      type: "longText",
      defaultValue:
        "Featured statements, testimonials, and opinions are unsolicited and may not be representative of all borrowers\u2019 experiences. Individual results may vary. Testimonials are voluntarily provided and are not paid, nor provided with any benefits in exchange for said statements. Loan programs may change at any time with or without notice. Information deemed reliable but not guaranteed. All loans subject to income verification, credit approval and property appraisal. Not a commitment to lend. Atlantic Bay Mortgage Group, L.L.C. NMLS #72043 is an Equal Opportunity Lender. Located at 600 Lynnhaven Parkway Suite 100, Virginia Beach, VA 23452.",
    },
    { name: "reviewsUrl", type: "url", defaultValue: "https://www.experience.com/reviews/office/atlantic-bay-mortgage-virgnia-beach-46727" },
    { name: "reviewsLabel", type: "string", defaultValue: "www.experience.com/reviews/office/atlantic-bay-mortgage-virgnia-beach-46727" },
    { name: "nmlsUrl", type: "url", defaultValue: "https://www.nmlsconsumeraccess.org/" },
    { name: "nmlsLabel", type: "string", defaultValue: "nmlsconsumeraccess.org" },
  ],
});

Builder.registerComponent(BankerpageHero, {
  name: "bankerpage-Hero",
  inputs: [
    { name: "backgroundImageUrl", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg" },
    { name: "headshotUrl", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"], defaultValue: "https://images.ctfassets.net/n1no4gieqp7s/3pCD1YRDttPnoKjQ8KZWnJ/23c4de9537651adc67cc632d3691e353/terence-guess-headshot.jpg?w=400&h=400&q=90&fm=webp" },
    { name: "headshotAlt", type: "string", defaultValue: "Atlantic Bay Sr. Certified Mortgage Advisor Terence Guess, NMLS #1400129" },
    { name: "firstName", type: "string", defaultValue: "Terence" },
    { name: "fullName", type: "string", defaultValue: "Terence Guess" },
    { name: "jobTitle", type: "string", defaultValue: "Sr. Certified Mortgage Advisor" },
    { name: "nmlsNumber", type: "string", defaultValue: "1400129" },
    {
      name: "licensedStates",
      type: "list",
      defaultValue: ["NC", "SC", "GA # 1400129", "VA", "TN", "FL", "PA", "MD", "NJ"],
      subFields: [{ name: "state", type: "string" }],
    },
    { name: "phone", type: "string", defaultValue: "2152802294" },
    { name: "email", type: "string", defaultValue: "terenceguess@atlanticbay.com" },
    { name: "calendlyLabel", type: "string", defaultValue: "Schedule a meeting with Terence" },
    { name: "calendlyUrl", type: "url", defaultValue: "https://calendly.com/terenceguess" },
  ],
});

Builder.registerComponent(BankerpageAboutMe, {
  name: "bankerpage-AboutMe",
  inputs: [
    { name: "heading", type: "string", defaultValue: "A little more about me." },
    { name: "intro", type: "longText", defaultValue: "I look forward to developing a long lasting relationship with each customer. Educating the client is what\u2019s most important to me." },
    { name: "contactLabel", type: "string", defaultValue: "Contact me" },
    { name: "contactUrl", type: "url", defaultValue: "https://www.atlanticbay.com/terenceguess/contact/" },
    {
      name: "bioParagraphs",
      type: "list",
      defaultValue: [
        "Terence Guess is just like you in many ways. Like you, he has purchased a house, is honest and upfront, and gets the job done. A long-time resident of Charlotte, he makes the process of buying a house seamless for families from all walks of life.",
        "Terence is a deeply compassionate man who genuinely cares about people. Combining professionalism, 20 years of finance/mortgage experience and a desire to serve, he has the innate ability to connect with each individual.",
        "Terence says, \u201CI send clients articles about the housing market and current news affairs. I tell my clients what the articles mean and why the market is trending the way it is.\u201D",
        "Clients describe Terence as a member of the family, someone who genuinely cares, is always available, easy to talk to and a person who makes the process seamless.",
        "His accolades demonstrate his commitment to excellence in lending as well. Terence has received the following designations: 2020 Chairman\u2019s Club, 2021 President\u2019s Club and 2022 President\u2019s Club.",
        "Terence recently coordinated a lunch for the Charlotte Men\u2019s Shelter and organized Atlantic Bay volunteers to serve the lunch.",
      ],
      subFields: [{ name: "paragraph", type: "longText" }],
    },
    { name: "readMoreLabel", type: "string", defaultValue: "Read more" },
    { name: "readLessLabel", type: "string", defaultValue: "Read less" },
  ],
});

Builder.registerComponent(BankerpageStory, {
  name: "bankerpage-Story",
  inputs: [
    { name: "heading", type: "string", defaultValue: "This is my story." },
    {
      name: "images",
      type: "list",
      defaultValue: [
        { src: "https://images.ctfassets.net/n1no4gieqp7s/764EStOgXShURK0iiHBiVX/30ddc4033ade83cbc2b23bcc88b8a43c/terence-1.jpg?w=456&h=328&q=90&fm=webp", alt: "" },
        { src: "https://images.ctfassets.net/n1no4gieqp7s/1BwbYQSp4jQHRpyEidIDiI/4d48164541c06fcd9fdf4a5b44308793/terence-3.jpg?w=456&h=328&q=90&fm=webp", alt: "" },
        { src: "https://images.ctfassets.net/n1no4gieqp7s/QeIrr7wD2H4j1Lhigj6KI/62fcfe0ad5ba13ca0253cecc93195e76/terence-2.jpg?w=456&h=328&q=90&fm=webp", alt: "" },
        { src: "https://images.ctfassets.net/n1no4gieqp7s/4lsVyJaFkFRqIZx35qn1xI/15b08ee4db9b5bd2e72037fc3d839314/Knights-Game.jpg?w=480&h=472&q=90&fm=webp", alt: "" },
        { src: "https://images.ctfassets.net/n1no4gieqp7s/2x2v61biIuA8v4EGJNMIRH/c8445cf8758ae101165dbf0a7820b7e5/MAME-Awards-2.jpg?w=960&h=952&q=90&fm=webp", alt: "" },
      ],
      subFields: [
        { name: "src", type: "file", allowedFileTypes: ["jpeg", "png", "webp", "svg"] },
        { name: "alt", type: "string" },
      ],
    },
  ],
});
