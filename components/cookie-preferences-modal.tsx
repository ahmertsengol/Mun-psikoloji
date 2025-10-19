'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { COOKIE_CATEGORIES, CookieConsent, useCookieConsent } from '@/lib/utils/cookies';
import Link from 'next/link';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookiePreferencesModal({ isOpen, onClose }: CookiePreferencesModalProps) {
  const { consent, setCookieConsent } = useCookieConsent();
  const [preferences, setPreferences] = useState<Omit<CookieConsent, 'timestamp'>>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    if (consent) {
      setPreferences({
        necessary: consent.necessary,
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences
      });
    }
  }, [consent]);

  if (!isOpen) return null;

  const handleToggle = (category: 'necessary' | 'analytics' | 'marketing' | 'preferences') => {
    if (category === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSave = () => {
    setCookieConsent({
      ...preferences,
      timestamp: Date.now()
    });
    onClose();
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setPreferences(allAccepted);
    setCookieConsent({
      ...allAccepted,
      timestamp: Date.now()
    });
    onClose();
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setPreferences(onlyNecessary);
    setCookieConsent({
      ...onlyNecessary,
      timestamp: Date.now()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Çerez Tercihleri</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              aria-label="Kapat"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground leading-relaxed">
              Web sitemizde kullandığımız çerez türlerini aşağıda görebilir ve tercihlerinizi 
              belirleyebilirsiniz. Gerekli çerezler sitenin çalışması için zorunludur ve 
              devre dışı bırakılamazlar.
            </p>
          </div>

          <div className="space-y-6">
            {COOKIE_CATEGORIES.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="ml-4">
                    {category.required ? (
                      <span className="text-sm text-green-600 font-medium">
                        Her Zaman Aktif
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences[category.id]}
                          onChange={() => handleToggle(category.id)}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors ${
                          preferences[category.id] 
                            ? 'bg-blue-600' 
                            : 'bg-gray-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            preferences[category.id] 
                              ? 'translate-x-5' 
                              : 'translate-x-0.5'
                          } mt-0.5`} />
                        </div>
                      </label>
                    )}
                  </div>
                </div>
                
                {category.cookies.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Bu kategorideki çerezler:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {category.cookies.map((cookie) => (
                        <span
                          key={cookie}
                          className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {cookie}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  onClick={handleRejectAll}
                  className="whitespace-nowrap"
                >
                  Sadece Gerekli
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAcceptAll}
                  className="whitespace-nowrap"
                >
                  Tümünü Kabul Et
                </Button>
              </div>
              
              <Button
                variant="primary"
                onClick={handleSave}
                className="whitespace-nowrap"
              >
                Tercihleri Kaydet
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                href="/cerez-politikasi" 
                className="text-sm text-primary hover:underline"
                onClick={onClose}
              >
                Detaylı çerez politikasını okuyun
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}