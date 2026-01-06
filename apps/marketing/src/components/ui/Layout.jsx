import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";

export function Container({ className, children, ...props }) {
  return (
    <div
      className={cn("container mx-auto px-4 md:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Grid({ className, children, cols = 3, gap = 6, ...props }) {
  const colsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <div
      className={cn("grid", colsClass[cols], `gap-${gap}`, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Flex({
  className,
  children,
  direction = "row",
  align = "center",
  justify = "start",
  gap = 4,
  wrap = false,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex",
        direction === "col" && "flex-col",
        direction === "row-reverse" && "flex-row-reverse",
        direction === "col-reverse" && "flex-col-reverse",
        `items-${align}`,
        `justify-${justify}`,
        `gap-${gap}`,
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Divider({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-dimare-green/10",
    accent: "border-dimare-green/30",
    gradient:
      "bg-gradient-to-r from-transparent via-dimare-green/30 to-transparent h-px border-0",
  };

  return (
    <hr
      className={cn(
        variant !== "gradient" && "border-t",
        variants[variant],
        "my-8",
        className
      )}
      {...props}
    />
  );
}

export function Spacer({ size = 8, className, ...props }) {
  return <div className={cn(`h-${size}`, className)} {...props} />;
}

export function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-dimare-green/10 text-dimare-green",
    accent: "bg-dimare-red/10 text-dimare-red",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    outline: "bg-transparent border border-dimare-green text-dimare-green",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function AnimatedGradient({ className, children }) {
  return (
    <motion.div
      className={cn(
        "bg-gradient-to-r from-dimare-green via-dimare-green-light to-dimare-green",
        "bg-[length:200%_auto]",
        className
      )}
      animate={{ backgroundPosition: ["0% center", "200% center"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

export function Blob({ className, color = "green", size = "md", ...props }) {
  const sizes = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  const colors = {
    green: "bg-dimare-green/20",
    red: "bg-dimare-red/20",
    cream: "bg-dimare-cream-dark/50",
    gradient: "bg-gradient-to-br from-dimare-green/20 to-dimare-green-light/20",
  };

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl",
        sizes[size],
        colors[color],
        className
      )}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "40% 60% 60% 40% / 40% 50% 50% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    />
  );
}
