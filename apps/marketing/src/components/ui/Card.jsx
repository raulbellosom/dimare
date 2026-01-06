import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";

const Card = forwardRef(
  (
    { className, variant = "default", hover = true, children, ...props },
    ref
  ) => {
    const variants = {
      default:
        "bg-[var(--bg-card)] shadow-soft border border-[var(--border-color)]",
      glass: "glass",
      outline: "bg-transparent border-2 border-[var(--border-color)]",
      gradient: "bg-gradient-to-br from-dimare-green/5 to-[var(--bg-tertiary)]",
      elevated:
        "bg-[var(--bg-card)] shadow-medium border border-[var(--border-color)]",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden transition-all duration-300",
          variants[variant],
          hover && "hover:shadow-strong hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pb-2", className)} {...props}>
    {children}
  </div>
));

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-xl font-bold text-[var(--text-heading)]",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[var(--text-secondary)] mt-1 text-sm", className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-2", className)} {...props}>
    {children}
  </div>
));

CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 flex items-center", className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = "CardFooter";

const CardImage = forwardRef(({ className, src, alt, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>
));

CardImage.displayName = "CardImage";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};
