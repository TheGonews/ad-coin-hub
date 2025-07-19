import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CoinIcon } from "./CoinIcon";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

interface AuthFlowProps {
  onAuthComplete: () => void;
}

export const AuthFlow = ({ onAuthComplete }: AuthFlowProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, this would connect to Supabase
    setTimeout(() => {
      onAuthComplete();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <CoinIcon size="xl" className="glow-gold" />
            <h1 className="text-3xl font-bold bg-reward-gradient bg-clip-text text-transparent">
              AdRewardz
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isSignUp ? "Join thousands earning coins daily" : "Welcome back! Start earning coins"}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="bg-card-gradient border-primary/20 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-reward-gradient hover:opacity-90 transition-opacity font-semibold"
              size="lg"
            >
              {isSignUp ? "Create Account" : "Sign In"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </Card>

        {/* Features Preview */}
        <Card className="bg-card-gradient border-primary/20 p-4">
          <h3 className="font-semibold mb-3 text-center">Start Earning Today</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CoinIcon size="sm" />
              <span>Watch ads and earn coins instantly</span>
            </div>
            <div className="flex items-center gap-2">
              <CoinIcon size="sm" />
              <span>Daily rewards and bonuses</span>
            </div>
            <div className="flex items-center gap-2">
              <CoinIcon size="sm" />
              <span>Convert coins to real rewards</span>
            </div>
          </div>
        </Card>

        {/* Backend Notice */}
        <div className="text-center text-xs text-muted-foreground bg-muted/20 rounded-lg p-3">
          <p>🔒 Secure authentication requires Supabase integration</p>
        </div>
      </div>
    </div>
  );
};