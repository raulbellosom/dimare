import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";
import {
  scrollReveal,
  staggerContainer,
  staggerItem,
} from "@/utils/animations";

const Section = forwardRef(
  (
    {
      className,
      children,
      id,
      variant = "default",
      fullHeight = false,
      centered = false,
      padded = true,
      animated = true,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-dimare-cream dark:bg-[var(--bg-primary)]",
      white: "bg-white dark:bg-[var(--bg-secondary)]",
      green: "bg-dimare-green text-white",
      gradient:
        "bg-gradient-to-b from-dimare-cream to-white dark:from-[var(--bg-primary)] dark:to-[var(--bg-secondary)]",
      cream: "bg-dimare-cream-dark dark:bg-[var(--bg-secondary)]",
    };

    const Wrapper = animated ? motion.section : "section";
    const animationProps = animated ? scrollReveal : {};

    return (
      <Wrapper
        ref={ref}
        id={id}
        className={cn(
          "relative overflow-hidden",
          variants[variant],
          fullHeight && "min-h-screen",
          padded && "py-16 md:py-24 lg:py-32",
          className
        )}
        {...animationProps}
        {...props}
      >
        <div
          className={cn(
            "container mx-auto px-4 md:px-6 lg:px-8",
            centered && "flex flex-col items-center text-center"
          )}
        >
          {children}
        </div>
      </Wrapper>
    );
  }
);

Section.displayName = "Section";

const SectionHeader = forwardRef(
  ({ className, children, centered = true, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center max-w-3xl mx-auto",
        className
      )}
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  )
);

SectionHeader.displayName = "SectionHeader";

const SectionTitle = forwardRef(
  (
    { className, children, as: Tag = "h2", gradient = false, ...props },
    ref
  ) => (
    <motion.div variants={staggerItem}>
      <Tag
        ref={ref}
        className={cn(
          "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dimare-green dark:text-dimare-green-light",
          gradient && "gradient-text",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  )
);

SectionTitle.displayName = "SectionTitle";

const SectionSubtitle = forwardRef(({ className, children, ...props }, ref) => (
  <motion.p
    ref={ref}
    variants={staggerItem}
    className={cn(
      "font-script text-2xl md:text-3xl text-dimare-green-light mt-2",
      className
    )}
    {...props}
  >
    {children}
  </motion.p>
));

SectionSubtitle.displayName = "SectionSubtitle";

const SectionDescription = forwardRef(
  ({ className, children, ...props }, ref) => (
    <motion.p
      ref={ref}
      variants={staggerItem}
      className={cn(
        "text-[var(--text-secondary)] text-lg md:text-xl mt-4 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </motion.p>
  )
);

SectionDescription.displayName = "SectionDescription";

export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
};
