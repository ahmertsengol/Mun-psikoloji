'use client';

import { useEffect, useState } from 'react';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
  timestamp: number;
}

export interface CookieCategory {
  id: keyof Omit<CookieConsent, 'timestamp'>;
  name: string;
  description: string;
  required: boolean;
  cookies: string[];
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Gerekli Çerezler',
    description: 'Web sitesinin temel işlevlerini sağlamak için gerekli çerezler. Bu çerezler devre dışı bırakılamaz.',
    required: true,
    cookies: ['session_id', 'csrf_token', 'auth_token'],
  },
  {
    id: 'analytics',
    name: 'Analitik Çerezler',
    description: 'Web sitesi kullanımını analiz etmek ve performansı iyileştirmek için kullanılan çerezler.',
    required: false,
    cookies: ['_ga', '_ga_*', '_gid', '_gat'],
  },
  {
    id: 'preferences',
    name: 'Tercih Çerezler',
    description: 'Kullanıcı tercihlerini hatırlamak için kullanılan çerezler (tema, dil vb.).',
    required: false,
    cookies: ['theme', 'language', 'font_size'],
  },
  {
    id: 'marketing',
    name: 'Pazarlama Çerezleri',
    description: 'Kişiselleştirilmiş reklamlar ve pazarlama içerikleri için kullanılan çerezler.',
    required: false,
    cookies: ['_fbp', '_fbc', 'ads_id', 'marketing_id'],
  },
];

const CONSENT_COOKIE_NAME = 'cookie-consent';

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const consent = localStorage.getItem(CONSENT_COOKIE_NAME);
    return consent ? JSON.parse(consent) : null;
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consent));
  
  // Dispatch event to notify components of consent change
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: consent }));
}

export function hasConsentFor(category: keyof Omit<CookieConsent, 'timestamp'>): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  
  return Boolean(consent[category]);
}

export function needsConsent(): boolean {
  return getCookieConsent() === null;
}

export function revokeConsent(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(CONSENT_COOKIE_NAME);
  cleanupCookies();
  
  // Dispatch event to notify components of consent revocation
  window.dispatchEvent(new CustomEvent('cookieConsentRevoked'));
}

export function cleanupCookies(consent?: CookieConsent): void {
  if (typeof window === 'undefined') return;
  
  const currentConsent = consent || getCookieConsent();
  if (!currentConsent) return;
  
  // Clean up analytics cookies if consent is revoked
  if (!currentConsent.analytics) {
    deleteCookie('_ga');
    deleteCookie('_ga_*');
    deleteCookie('_gid');
    deleteCookie('_gat');
    deleteCookie('__utma');
    deleteCookie('__utmb');
    deleteCookie('__utmc');
    deleteCookie('__utmt');
    deleteCookie('__utmz');
  }
  
  // Clean up marketing cookies if consent is revoked
  if (!currentConsent.marketing) {
    deleteCookie('_fbp');
    deleteCookie('_fbc');
    deleteCookie('fr');
  }
}

export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;
  
  const domain = window.location?.hostname || '';
  
  // Delete cookie for current domain
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  
  // Delete cookie for domain with leading dot
  if (domain) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
  }
}

export function acceptAllCookies(): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics: true,
    preferences: true,
    marketing: true,
    timestamp: Date.now(),
  };
  
  setCookieConsent(consent);
  return consent;
}

export function acceptNecessaryOnly(): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
    timestamp: Date.now(),
  };
  
  setCookieConsent(consent);
  cleanupCookies(consent);
  return consent;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setConsent(getCookieConsent());
    setIsLoading(false);

    const handleConsentChange = (event: CustomEvent<CookieConsent>) => {
      setConsent(event.detail);
    };

    const handleConsentRevoked = () => {
      setConsent(null);
    };

    window.addEventListener('cookieConsentChanged', handleConsentChange as EventListener);
    window.addEventListener('cookieConsentRevoked', handleConsentRevoked);

    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange as EventListener);
      window.removeEventListener('cookieConsentRevoked', handleConsentRevoked);
    };
  }, []);

  return {
    consent,
    isLoading,
    hasConsent: consent !== null,
    needsConsent: consent === null,
    hasConsentFor: (category: keyof Omit<CookieConsent, 'timestamp'>) => 
      consent ? Boolean(consent[category]) : false,
    acceptAll: acceptAllCookies,
    acceptNecessaryOnly,
    revokeConsent,
    setCookieConsent,
  };
}