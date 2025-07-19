import { cn } from "@/lib/utils";

interface CoinIconProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

export const CoinIcon = ({ size = "md", animated = false, className }: CoinIconProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center rounded-full bg-gold-gradient",
      "shadow-lg border-2 border-gold-light",
      sizeClasses[size],
      animated && "animate-bounce-coin",
      className
    )}>
      <div className="text-gray-900 font-bold text-center select-none">
        <span className={cn(
          "drop-shadow-sm",
          size === "sm" && "text-xs",
          size === "md" && "text-sm", 
          size === "lg" && "text-lg",
          size === "xl" && "text-xl"
        )}>
          ₹
        </span>
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
    </div>
  );
};