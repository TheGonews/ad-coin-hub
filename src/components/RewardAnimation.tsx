import { useState } from "react";
import { CoinIcon } from "./CoinIcon";
import { Button } from "@/components/ui/button";
import { Play, Check } from "lucide-react";

interface RewardAnimationProps {
  coinsEarned: number;
  onComplete: () => void;
}

export const RewardAnimation = ({ coinsEarned, onComplete }: RewardAnimationProps) => {
  const [isWatching, setIsWatching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleWatchAd = () => {
    setIsWatching(true);
    
    // Simulate ad watching
    setTimeout(() => {
      setIsWatching(false);
      setIsCompleted(true);
      setShowReward(true);
      
      // Show reward animation
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 3000);
  };

  if (showReward) {
    return (
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="text-6xl animate-bounce-coin">🎉</div>
          <div className="absolute -top-2 -right-2">
            <CoinIcon size="lg" animated className="glow-gold animate-pulse-glow" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-success">Congratulations!</h2>
          <p className="text-muted-foreground">You earned</p>
          <div className="flex items-center justify-center gap-2">
            <CoinIcon size="lg" />
            <span className="text-3xl font-bold text-gold">+{coinsEarned}</span>
          </div>
        </div>
        
        <div className="animate-pulse text-sm text-muted-foreground">
          Returning to dashboard...
        </div>
      </div>
    );
  }

  if (isWatching) {
    return (
      <div className="text-center space-y-6">
        <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-semibold">Watching Ad...</p>
            <p className="text-sm text-muted-foreground">Please wait for the ad to complete</p>
          </div>
        </div>
        
        <div className="bg-card-gradient border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <CoinIcon size="sm" />
            <span>You'll earn <strong>{coinsEarned} coins</strong> after this ad</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
        <div className="text-center space-y-4">
          <Play className="w-16 h-16 mx-auto text-primary" />
          <p className="text-lg font-semibold">Ready to watch an ad?</p>
          <p className="text-sm text-muted-foreground">Tap the button below to start</p>
        </div>
      </div>
      
      <div className="bg-card-gradient border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CoinIcon size="md" />
          <span className="text-xl font-bold text-gold">+{coinsEarned} coins</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Watch a 30-second video ad to earn rewards
        </p>
      </div>
      
      <Button 
        onClick={handleWatchAd}
        size="lg" 
        className="w-full bg-reward-gradient hover:opacity-90 transition-opacity font-semibold py-6"
      >
        <Play className="w-5 h-5 mr-2" />
        Start Watching Ad
      </Button>
    </div>
  );
};