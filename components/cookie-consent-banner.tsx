'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useCookieConsent } from '@/lib/utils/cookies';
import Link from 'next/link';

interface CookieConsentBannerProps {
  onOpenPreferences?: () => void;
}

export function CookieConsentBanner({ onOpenPreferences }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { needsConsent, acceptAll, acceptNecessaryOnly } = useCookieConsent();

  useEffect(() => {
    // Show banner only if consent is needed
    setIsVisible(needsConsent);
  }, [needsConsent]);

  useEffect(() => {
    // Listen for consent changes
    const handleConsentChange = () => {
      setIsVisible(false);
    };

    window.addEventListener('cookieConsentChanged', handleConsentChange);
    return () => window.removeEventListener('cookieConsentChanged', handleConsentChange);
  }, []);

  if (!isVisible) return null;

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    acceptNecessaryOnly();
    setIsVisible(false);
  };

  const handleOpenPreferences = () => {
    onOpenPreferences?.();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background/95 to-background/80 backdrop-blur-sm border-t">
      <Card className="max-w-6xl mx-auto p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              🍪 Çerez Kullanımı
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. 
              Gerekli çerezler sitenin çalışması için zorunludur. Analitik çerezler 
              ise siteyi nasıl kullandığınızı anlamamıza yardımcı olur. 
              <Link 
                href="/cerez-politikasi" 
                className="text-primary hover:underline ml-1"
              >
                Çerez politikamızı
              </Link>
              {' '}okuyarak daha fazla bilgi alabilirsiniz.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAcceptNecessary}
              className="whitespace-nowrap"
            >
              Sadece Gerekli
            </Button>
            
            {onOpenPreferences && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleOpenPreferences}
                className="whitespace-nowrap"
              >
                Ayarları Özelleştir
              </Button>
            )}
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleAcceptAll}
              className="whitespace-nowrap"
            >
              Tümünü Kabul Et
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}