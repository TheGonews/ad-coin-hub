import { useEffect, useState } from 'react';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, RewardAdOptions } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export interface AdMobConfig {
  appId: string;
  bannerAdId: string;
  interstitialAdId: string;
  rewardedAdId: string;
  rewardedInterstitialAdId: string;
  nativeAdId: string;
  appOpenAdId: string;
}

const adMobConfig: AdMobConfig = {
  appId: 'ca-app-pub-2949710768315460~7560875297',
  bannerAdId: 'ca-app-pub-2949710768315460~7560875297',
  interstitialAdId: 'ca-app-pub-2949710768315460~7560875297',
  rewardedAdId: 'ca-app-pub-2949710768315460~7560875297',
  rewardedInterstitialAdId: 'ca-app-pub-2949710768315460~7560875297',
  nativeAdId: 'ca-app-pub-2949710768315460~7560875297',
  appOpenAdId: 'ca-app-pub-2949710768315460~7560875297'
};

export const useAdMob = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeAdMob = async () => {
      if (!Capacitor.isNativePlatform()) {
        console.log('AdMob not available in web platform');
        return;
      }

      try {
        await AdMob.initialize({
          testingDevices: ['YOUR_TESTING_DEVICE_ID'],
          initializeForTesting: true
        });
        setIsInitialized(true);
        console.log('AdMob initialized successfully');
      } catch (error) {
        console.error('Failed to initialize AdMob:', error);
      }
    };

    initializeAdMob();
  }, []);

  const showBannerAd = async (position: BannerAdPosition = BannerAdPosition.BOTTOM_CENTER) => {
    if (!isInitialized) return;

    try {
      const options: BannerAdOptions = {
        adId: adMobConfig.bannerAdId,
        adSize: BannerAdSize.BANNER,
        position,
        margin: 0,
        isTesting: true
      };

      await AdMob.showBanner(options);
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  };

  const hideBannerAd = async () => {
    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  };

  const showRewardedAd = async (onReward?: (reward: any) => void) => {
    if (!isInitialized) return;

    setIsLoading(true);
    try {
      const options: RewardAdOptions = {
        adId: adMobConfig.rewardedAdId,
        isTesting: true
      };

      await AdMob.prepareRewardVideoAd(options);
      const result = await AdMob.showRewardVideoAd();
      
      if (result && onReward) {
        onReward(result);
      }
      
      console.log('Rewarded ad completed');
    } catch (error) {
      console.error('Failed to show rewarded ad:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showInterstitialAd = async () => {
    if (!isInitialized) return;

    setIsLoading(true);
    try {
      const options = {
        adId: adMobConfig.interstitialAdId,
        isTesting: true
      };

      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown');
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    showBannerAd,
    hideBannerAd,
    showRewardedAd,
    showInterstitialAd
  };
};