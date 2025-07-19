import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CoinIcon } from "./CoinIcon";
import { LockScreenAd } from "./LockScreenAd";
import { Play, Eye, TrendingUp, Gift } from "lucide-react";
import { useState } from "react";

interface DashboardProps {
  coinBalance: number;
  adsWatchedToday: number;
  dailyLimit: number;
  totalEarnings: number;
  onWatchAd?: () => void;
  onLockScreenAdViewed?: () => void;
}

export const Dashboard = ({ 
  coinBalance = 125, 
  adsWatchedToday = 8, 
  dailyLimit = 20,
  totalEarnings = 1250,
  onWatchAd,
  onLockScreenAdViewed
}: DashboardProps) => {
  const dailyProgress = (adsWatchedToday / dailyLimit) * 100;
  const [lockScreenEnabled, setLockScreenEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-reward-gradient bg-clip-text text-transparent mb-2">
          AdRewardz
        </h1>
        <p className="text-muted-foreground">Earn coins by watching ads</p>
      </div>

      {/* Coin Balance Card */}
      <Card className="bg-card-gradient border-primary/20 p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-reward-gradient opacity-5" />
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <CoinIcon size="xl" animated className="glow-gold" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-2">{coinBalance}</h2>
          <p className="text-muted-foreground">Available Coins</p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily Progress */}
        <Card className="bg-card-gradient border-primary/20 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Today's Progress</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{adsWatchedToday}/{dailyLimit} ads</span>
              <span>{Math.round(dailyProgress)}%</span>
            </div>
            <Progress value={dailyProgress} className="h-2" />
          </div>
        </Card>

        {/* Total Earnings */}
        <Card className="bg-card-gradient border-primary/20 p-4">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-success" />
            <h3 className="font-semibold">Total Earnings</h3>
          </div>
          <div className="flex items-center gap-2">
            <CoinIcon size="sm" />
            <span className="text-xl font-bold">{totalEarnings}</span>
          </div>
        </Card>

        {/* Rewards Available */}
        <Card className="bg-card-gradient border-primary/20 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-5 h-5 text-gold" />
            <h3 className="font-semibold">Next Reward</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {dailyLimit - adsWatchedToday} ads remaining
          </p>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onWatchAd}
          size="lg" 
          className="w-full bg-reward-gradient hover:opacity-90 transition-opacity font-semibold py-6"
        >
          <Play className="w-5 h-5 mr-2" />
          Watch Rewarded Video (+5 coins)
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full border-primary/30 py-6"
          onClick={() => setLockScreenEnabled(!lockScreenEnabled)}
        >
          <Eye className="w-5 h-5 mr-2" />
          {lockScreenEnabled ? 'Disable' : 'Enable'} Lockscreen Ads (+1 coin each)
        </Button>
      </div>

      {/* Lockscreen Ad Component */}
      <LockScreenAd 
        onAdViewed={onLockScreenAdViewed || (() => {})}
        isEnabled={lockScreenEnabled}
      />

      {/* Quick Stats */}
      <Card className="bg-card-gradient border-primary/20 p-4">
        <h3 className="font-semibold mb-3">Today's Activity</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">{adsWatchedToday}</div>
            <div className="text-sm text-muted-foreground">Ads Watched</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold flex items-center justify-center gap-1">
              <CoinIcon size="sm" />
              {adsWatchedToday * 5}
            </div>
            <div className="text-sm text-muted-foreground">Coins Earned</div>
          </div>
        </div>
      </Card>
    </div>
  );
};