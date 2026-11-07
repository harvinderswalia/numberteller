const STORAGE_KEY = 'ft_attrib';
const SOURCE_SITE = 'numberteller.com';

interface FirstTouchAttribution {
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  first_seen: string;
  source_site: string;
}

function getQueryParam(name: string): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || '';
}

export function captureFirstTouch(): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;

    const attrib: FirstTouchAttribution = {
      landing_page: window.location.href,
      referrer: document.referrer,
      utm_source: getQueryParam('utm_source'),
      utm_medium: getQueryParam('utm_medium'),
      utm_campaign: getQueryParam('utm_campaign'),
      utm_term: getQueryParam('utm_term'),
      utm_content: getQueryParam('utm_content'),
      gclid: getQueryParam('gclid'),
      first_seen: new Date().toISOString(),
      source_site: SOURCE_SITE,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(attrib));
  } catch {
    // localStorage unavailable or quota exceeded — carry on
  }
}

export function getFirstTouch(): FirstTouchAttribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FirstTouchAttribution;
  } catch {
    return null;
  }
}

export function getAttributionForLead(): Record<string, string> {
  const ft = getFirstTouch();
  if (!ft) {
    return {
      source_site: SOURCE_SITE,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
    };
  }
  return {
    source_site: SOURCE_SITE,
    landing_page: ft.landing_page,
    referrer: ft.referrer,
    utm_source: ft.utm_source,
    utm_medium: ft.utm_medium,
    utm_campaign: ft.utm_campaign,
    utm_term: ft.utm_term,
    utm_content: ft.utm_content,
    gclid: ft.gclid,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
  };
}

export function trackLeadEvent(formName: string): void {
  if (typeof window === 'undefined') return;
  try {
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        form_name: formName,
        page_path: window.location.pathname,
      });
    }
  } catch {
    // GA4 not loaded — carry on
  }
}
