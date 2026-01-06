import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";
import { float, floatRotate, wave, pulse } from "@/utils/animations";

// Fruit and vegetable decorative components
export function FruitDecoration({
  type = "orange",
  className,
  size = "md",
  animated = true,
  ...props
}) {
  const emojis = {
    orange: "🍊",
    lemon: "🍋",
    lime: "🍈",
    apple: "🍎",
    pineapple: "🍍",
    mango: "🥭",
    strawberry: "🍓",
    watermelon: "🍉",
    grape: "🍇",
    cherry: "🍒",
    peach: "🍑",
    banana: "🍌",
    carrot: "🥕",
    cucumber: "🥒",
    beet: "🍠",
    spinach: "🥬",
    celery: "🥒",
    leaf: "🍃",
    leaves: "🌿",
    sprout: "🌱",
    cactus: "🌵",
    ginger: "🫚",
    honey: "🍯",
    drop: "💧",
  };

  const sizes = {
    xs: "text-xl",
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  };

  const Wrapper = animated ? motion.span : "span";
  const animationProps = animated ? float : {};

  return (
    <Wrapper
      className={cn("inline-block select-none", sizes[size], className)}
      {...animationProps}
      {...props}
    >
      {emojis[type] || "🍊"}
    </Wrapper>
  );
}

// Floating fruits background decoration
export function FloatingFruits({
  className,
  count = 6,
  fruits = ["orange", "lemon", "leaf", "pineapple", "strawberry", "mango"],
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      {fruits.slice(0, count).map((fruit, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${10 + ((index * 15) % 80)}%`,
            top: `${10 + ((index * 20) % 70)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, index % 2 === 0 ? 10 : -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          <FruitDecoration
            type={fruit}
            size="lg"
            animated={false}
            className="opacity-20"
          />
        </motion.div>
      ))}
    </div>
  );
}

// Wave decoration
export function WaveDecoration({
  className,
  color = "green",
  position = "bottom",
  flip = false,
  variant = "curve", // "curve" or "wave"
}) {
  const colors = {
    green: "fill-dimare-green",
    "green-light": "fill-dimare-green-light",
    cream: "fill-[var(--bg-tertiary)]",
    white: "fill-[var(--bg-primary)]",
    primary: "fill-[var(--bg-primary)]",
    secondary: "fill-[var(--bg-secondary)]",
    tertiary: "fill-[var(--bg-tertiary)]",
    wave: "fill-[var(--wave-section-bg)]",
  };

  // Simple smooth curve - color fills the bottom part
  const curvePath = "M0,50 Q720,100 1440,50 L1440,100 L0,100 Z";
  // Inverted - color fills the top part
  const invertedPath = "M0,50 Q720,0 1440,50 L1440,0 L0,0 Z";

  const path = position === "top" ? invertedPath : curvePath;

  return (
    <div
      className={cn(
        "absolute left-0 right-0 overflow-hidden leading-none",
        position === "top" ? "top-0" : "bottom-0",
        flip && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={cn("w-full h-12 md:h-16", colors[color])}
      >
        <path d={path} />
      </svg>
    </div>
  );
}

// Leaf decoration for backgrounds
export function LeafPattern({ className }) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none opacity-5",
        className
      )}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="leafPattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 2C10 2 5 7 5 12C5 17 10 18 10 18C10 18 15 17 15 12C15 7 10 2 10 2Z"
              fill="currentColor"
              className="text-dimare-green"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leafPattern)" />
      </svg>
    </div>
  );
}

// Citrus slice decoration
export function CitrusSlice({ className, color = "orange", size = "md" }) {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  const colors = {
    orange: { outer: "#F5A623", inner: "#FFD93D" },
    lemon: { outer: "#F7DC6F", inner: "#FFF9C4" },
    lime: { outer: "#82E0AA", inner: "#C8F7C5" },
    grapefruit: { outer: "#FF7043", inner: "#FFAB91" },
  };

  const { outer, inner } = colors[color];

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={cn(sizes[size], className)}
      {...floatRotate}
    >
      <circle cx="50" cy="50" r="48" fill={outer} />
      <circle cx="50" cy="50" r="40" fill={inner} />
      {[...Array(8)].map((_, i) => (
        <path
          key={i}
          d={`M50,50 L${50 + 35 * Math.cos((i * Math.PI) / 4)},${
            50 + 35 * Math.sin((i * Math.PI) / 4)
          } A35,35 0 0,1 ${50 + 35 * Math.cos(((i + 1) * Math.PI) / 4)},${
            50 + 35 * Math.sin(((i + 1) * Math.PI) / 4)
          } Z`}
          fill={outer}
          opacity="0.6"
        />
      ))}
      <circle cx="50" cy="50" r="8" fill={outer} />
    </motion.svg>
  );
}

// Drop/Liquid decoration
export function LiquidDrop({ className, color = "green" }) {
  const colors = {
    green: "text-dimare-green",
    red: "text-dimare-red",
    orange: "text-fruit-orange",
  };

  return (
    <motion.svg
      viewBox="0 0 50 70"
      className={cn("w-8 h-12", colors[color], className)}
      fill="currentColor"
      {...wave}
    >
      <path d="M25 0C25 0 0 30 0 45C0 60 12 70 25 70C38 70 50 60 50 45C50 30 25 0 25 0Z" />
    </motion.svg>
  );
}
