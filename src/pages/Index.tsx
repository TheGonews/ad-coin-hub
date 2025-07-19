import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { AuthFlow } from "@/components/AuthFlow";
import { RewardAnimation } from "@/components/RewardAnimation";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "watch-ad">("dashboard");
  const [userStats, setUserStats] = useState({
    coinBalance: 125,
    adsWatchedToday: 8,
    totalEarnings: 1250
  });

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
  };

  const handleWatchAd = () => {
    setCurrentView("watch-ad");
  };

  const handleAdComplete = () => {
    setUserStats(prev => ({
      coinBalance: prev.coinBalance + 5,
      adsWatchedToday: prev.adsWatchedToday + 1,
      totalEarnings: prev.totalEarnings + 5
    }));
    setCurrentView("dashboard");
  };

  const handleLockScreenAdViewed = () => {
    setUserStats(prev => ({
      coinBalance: prev.coinBalance + 1,
      adsWatchedToday: prev.adsWatchedToday + 1,
      totalEarnings: prev.totalEarnings + 1
    }));
  };

  if (!isAuthenticated) {
    return <AuthFlow onAuthComplete={handleAuthComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-lg">
        {currentView === "dashboard" ? (
          <Dashboard 
            coinBalance={userStats.coinBalance}
            adsWatchedToday={userStats.adsWatchedToday}
            dailyLimit={20}
            totalEarnings={userStats.totalEarnings}
            onWatchAd={() => setCurrentView("watch-ad")}
            onLockScreenAdViewed={handleLockScreenAdViewed}
          />
        ) : (
          <RewardAnimation 
            coinsEarned={5}
            onComplete={handleAdComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
