import { SITE } from '../../config/site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon-512.png`,
    email: SITE.contact.email,
    parentOrganization: {
      '@type': 'Organization',
      name: SITE.publisher.legalName,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 302, Bldg 2, New Sonal Industrial Estate, Kachpada, Link Road, Malad West',
      addressLocality: 'Mumbai',
      postalCode: '400064',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    telephone: SITE.publisher.telephone,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phone,
      email: SITE.contact.email,
      contactType: 'customer support',
      areaServed: ['IN', 'AE', 'GB', 'SG'],
      availableLanguage: 'en',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: SITE.plans.map((plan) => ({
      '@type': 'Offer',
      price: plan.price,
      priceCurrency: plan.currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.price,
        priceCurrency: plan.currency,
        billingDuration: 'P1M',
      },
    })),
    publisher: {
      '@type': 'Organization',
      name: SITE.publisher.legalName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.publisher.city,
        addressCountry: SITE.publisher.country,
      },
      telephone: SITE.publisher.telephone,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  author: string;
  published: string;
  updated: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.published,
    dateModified: article.updated,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/icon-512.png`,
      },
    },
    image: `${SITE.url}${SITE.ogImage}`,
    mainEntityOfPage: `${SITE.url}/learn/${article.slug}`,
  };
}

export function webPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
  };
}
