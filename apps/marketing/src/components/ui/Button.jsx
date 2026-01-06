import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";
import { hoverScale, springTransition } from "@/utils/animations";

const buttonVariants = {
  primary:
    "bg-dimare-green text-white hover:bg-dimare-green-dark shadow-soft hover:shadow-medium",
  secondary:
    "bg-dimare-cream-dark text-dimare-green hover:bg-dimare-green hover:text-white border border-dimare-green/20",
  accent:
    "bg-dimare-red text-white hover:bg-dimare-red-light shadow-soft hover:shadow-glow-red",
  ghost: "bg-transparent text-dimare-green hover:bg-dimare-green/10",
  outline:
    "bg-transparent border-2 border-dimare-green text-dimare-green hover:bg-dimare-green hover:text-white",
  glass: "glass text-dimare-green hover:bg-white/90",
};

const buttonSizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
  xl: "px-10 py-5 text-xl rounded-2xl",
};

const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      animated = true,
      icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const buttonContent = (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 font-display font-semibold",
          "transition-all duration-300 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-dimare-green/50 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="w-5 h-5">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="w-5 h-5">{icon}</span>
        )}
      </Comp>
    );

    if (animated) {
      return (
        <motion.div
          {...hoverScale}
          transition={springTransition}
          className="inline-block"
        >
          {buttonContent}
        </motion.div>
      );
    }

    return buttonContent;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, buttonSizes };
