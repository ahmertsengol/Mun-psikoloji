'use client';

import { useState } from 'react';
import { CookieConsentBanner } from './cookie-consent-banner';
import { CookiePreferencesModal } from './cookie-preferences-modal';

export function CookieManager() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const handleOpenPreferences = () => {
    setIsPreferencesOpen(true);
  };

  const handleClosePreferences = () => {
    setIsPreferencesOpen(false);
  };

  return (
    <>
      <CookieConsentBanner onOpenPreferences={handleOpenPreferences} />
      <CookiePreferencesModal 
        isOpen={isPreferencesOpen} 
        onClose={handleClosePreferences} 
      />
    </>
  );
}