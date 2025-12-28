import { cn } from "@/lib/utils";

export type EmojiName =
  | "car"
  | "credit-card"
  | "location"
  | "shield"
  | "clock"
  | "headphones"
  | "sparkles"
  | "check"
  | "party"
  | "wave"
  | "thumbs-up"
  | "heart"
  | "star"
  | "phone"
  | "key"
  | "palm"
  | "sun"
  | "airplane"
  | "map"
  | "celebration"
  | "lock"
  | "lightning"
  | "whatsapp"
  | "pin"
  | "rocket"
  | "handshake"
  | "money"
  | "calendar";

// Apple-style emoji mapping with vibrant, 3D-looking native emojis
const emojiMap: Record<EmojiName, string> = {
  car: "🚗",
  "credit-card": "💳",
  location: "📍",
  shield: "🛡️",
  clock: "⏱️",
  headphones: "🎧",
  sparkles: "✨",
  check: "✅",
  party: "🎉",
  wave: "👋",
  "thumbs-up": "👍",
  heart: "❤️",
  star: "⭐",
  phone: "📱",
  key: "🔑",
  palm: "🌴",
  sun: "☀️",
  airplane: "✈️",
  map: "🗺️",
  celebration: "🥳",
  lock: "🔒",
  lightning: "⚡",
  whatsapp: "💬",
  pin: "📌",
  rocket: "🚀",
  handshake: "🤝",
  money: "💰",
  calendar: "📅",
};

interface AppleEmojiProps {
  name: EmojiName;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: "text-xl leading-none",
  md: "text-2xl leading-none",
  lg: "text-3xl leading-none",
  xl: "text-4xl leading-none",
  "2xl": "text-5xl leading-none",
};

export const AppleEmoji = ({
  name,
  size = "md",
  className,
  animated = false,
}: AppleEmojiProps) => {
  return (
    <span
      className={cn(
        sizeClasses[size],
        "inline-flex items-center justify-center select-none",
        // Premium 3D effect with subtle shadow
        "drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
        // Subtle hover animation for interactivity
        animated && "transition-transform duration-300 hover:scale-110 hover:-rotate-3",
        className
      )}
      role="img"
      aria-label={name}
    >
      {emojiMap[name]}
    </span>
  );
};

// Premium emoji card container for featured sections
interface EmojiCardProps {
  emoji: EmojiName;
  className?: string;
  variant?: "default" | "glow" | "gradient";
}

export const EmojiCard = ({
  emoji,
  className,
  variant = "default",
}: EmojiCardProps) => {
  const variantClasses = {
    default: "bg-gradient-to-br from-muted/80 to-muted/40 border-border/50",
    glow: "bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]",
    gradient: "bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-primary/10",
  };

  return (
    <div
      className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center border",
        "transition-all duration-500 group-hover:scale-105",
        variantClasses[variant],
        className
      )}
    >
      <AppleEmoji name={emoji} size="xl" animated />
    </div>
  );
};

export default AppleEmoji;
