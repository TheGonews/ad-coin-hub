import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CoinIcon } from '@/components/CoinIcon';
import { useAdMob } from '@/hooks/useAdMob';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

interface LockScreenAdProps {
  onAdViewed: () => void;
  isEnabled: boolean;
}

export const LockScreenAd = ({ onAdViewed, isEnabled }: LockScreenAdProps) => {
  const [isLockScreenActive, setIsLockScreenActive] = useState(false);
  const [adRefreshTimer, setAdRefreshTimer] = useState<NodeJS.Timeout | null>(null);
  const { showBannerAd, hideBannerAd, showInterstitialAd, isInitialized } = useAdMob();

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || !isEnabled) return;

    const setupLockScreenListener = async () => {
      // Listen for app state changes
      App.addListener('appStateChange', (state) => {
        if (state.isActive) {
          setIsLockScreenActive(false);
          hideBannerAd();
        } else {
          // App went to background, prepare for lockscreen
          setTimeout(() => {
            setIsLockScreenActive(true);
            if (isInitialized) {
              showBannerAd();
            }
          }, 1000);
        }
      });
    };

    setupLockScreenListener();

    return () => {
      App.removeAllListeners();
    };
  }, [isEnabled, isInitialized, showBannerAd, hideBannerAd]);

  useEffect(() => {
    if (!isEnabled || !isInitialized) return;

    // Auto-refresh ads every 60 seconds
    const timer = setInterval(() => {
      if (isLockScreenActive) {
        hideBannerAd();
        setTimeout(() => {
          showBannerAd();
          onAdViewed(); // Award coin for ad refresh
        }, 500);
      }
    }, 60000); // 1 minute

    setAdRefreshTimer(timer);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isEnabled, isInitialized, isLockScreenActive, showBannerAd, hideBannerAd, onAdViewed]);

  const handleManualAdView = async () => {
    await showInterstitialAd();
    onAdViewed();
  };

  if (!Capacitor.isNativePlatform()) {
    return (
      <Card className="p-6 bg-gradient-subtle border-primary/20">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">🔒 Lockscreen Ads Demo</h3>
          <p className="text-muted-foreground mb-4">
            This feature works on mobile devices only. Install the Android app to enable lockscreen ads.
          </p>
          <Button onClick={handleManualAdView} className="w-full">
            <CoinIcon className="w-4 h-4 mr-2" />
            Simulate Ad View (+1 coin)
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-subtle border-primary/20">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            🔒
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Lockscreen Ads</h3>
        <p className="text-muted-foreground mb-4">
          {isEnabled 
            ? 'Earning coins from lockscreen ads automatically!' 
            : 'Enable lockscreen ads to earn coins passively'
          }
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <CoinIcon className="w-5 h-5" />
          <span className="text-sm">+1 coin every minute</span>
        </div>

        {isLockScreenActive && (
          <div className="bg-primary/10 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-primary">
              🎯 Ad Active - Earning coins!
            </p>
          </div>
        )}

        <Button 
          onClick={handleManualAdView} 
          variant="outline" 
          className="w-full"
          disabled={!isInitialized}
        >
          <CoinIcon className="w-4 h-4 mr-2" />
          Watch Extra Ad (+1 coin)
        </Button>
      </div>
    </Card>
  );
};