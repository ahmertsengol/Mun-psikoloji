'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { hasConsentFor } from '@/lib/utils/cookies';

export function AnalyticsWrapper() {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Check initial consent
    setHasAnalyticsConsent(hasConsentFor('analytics'));

    // Listen for consent changes
    const handleConsentChange = () => {
      setHasAnalyticsConsent(hasConsentFor('analytics'));
    };

    const handleConsentRevoked = () => {
      setHasAnalyticsConsent(false);
    };

    window.addEventListener('cookieConsentChanged', handleConsentChange);
    window.addEventListener('cookieConsentRevoked', handleConsentRevoked);

    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange);
      window.removeEventListener('cookieConsentRevoked', handleConsentRevoked);
    };
  }, []);

  // Only render Analytics if user has given consent
  if (!hasAnalyticsConsent) {
    return null;
  }

  return <Analytics />;
}