import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Leaf, Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import { BRAND } from "@/utils/constants";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { scrollToElement } from "@/utils/helpers";
import Icon from "@/assets/icon.png";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Background Pattern for Light Mode */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <svg width="100%" height="100%">
          <pattern
            id="leafPattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 5 C20 15 15 30 18 45 C30 38 40 25 30 5"
              fill="currentColor"
              className="text-dimare-green"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leafPattern)" />
        </svg>
      </div>

      {/* Main Content - Two Column Layout */}
      <motion.div
        className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-20 pb-32"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Logo for mobile */}
            <motion.div variants={staggerItem} className="mb-6 lg:hidden">
              <motion.img
                src={Icon}
                alt={BRAND.name}
                className="h-20 w-auto mx-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </motion.div>

            {/* Brand Name */}
            <motion.div variants={staggerItem} className="mb-4">
              <span className="font-display text-lg md:text-xl text-[var(--text-secondary)] tracking-wide">
                Casa
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--text-heading)] tracking-wider">
                DI' MARE
              </h1>
            </motion.div>

            {/* Slogan */}
            <motion.p
              variants={staggerItem}
              className="font-script text-2xl md:text-3xl text-dimare-green-light mb-6"
            >
              {BRAND.slogan}
            </motion.p>

            {/* Main Headline */}
            <motion.h2
              variants={staggerItem}
              className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight"
            >
              Bebidas Naturales
              <span className="block text-dimare-green-light">Artesanales</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="text-base md:text-lg text-[var(--text-secondary)] max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Preparadas con ingredientes frescos y el cuidado de una receta
              casera. Cada sorbo es un regreso a lo natural.
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dimare-green/10 dark:bg-dimare-green/20 border border-dimare-green/20">
                <Leaf className="w-4 h-4 text-dimare-green" />
                <span className="text-sm font-medium text-dimare-green dark:text-dimare-green-light">
                  100% Natural
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dimare-red/10 dark:bg-dimare-red/20 border border-dimare-red/20">
                <Heart className="w-4 h-4 text-dimare-red dark:text-dimare-red-light" />
                <span className="text-sm font-medium text-dimare-red dark:text-dimare-red-light">
                  Hecho con Amor
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-fruit-orange/10 border border-fruit-orange/20">
                <Sparkles className="w-4 h-4 text-fruit-orange" />
                <span className="text-sm font-medium text-fruit-orange">
                  Artesanal
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                as={Link}
                to="/disenador"
                size="lg"
                variant="primary"
                icon={<Leaf className="w-5 h-5" />}
              >
                Diseña tu Bebida
              </Button>
              <Button
                as={Link}
                to="/productos"
                size="lg"
                variant="outline"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Ver Productos
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Decorative Circle */}
            <div className="absolute w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-br from-dimare-green/10 via-dimare-green-light/5 to-transparent dark:from-dimare-green/20 dark:via-dimare-green-light/10" />

            {/* Main Logo/Image */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={Icon}
                alt={BRAND.name}
                className="h-48 md:h-64 xl:h-80 w-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute top-10 right-10 w-16 h-16 rounded-full bg-fruit-orange/20 flex items-center justify-center"
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl">🍊</span>
            </motion.div>

            <motion.div
              className="absolute bottom-20 left-10 w-14 h-14 rounded-full bg-vegetable-spinach/20 flex items-center justify-center"
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <span className="text-xl">🥬</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-0 w-12 h-12 rounded-full bg-fruit-lemon/20 flex items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <span className="text-lg">🍋</span>
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-20 w-10 h-10 rounded-full bg-vegetable-carrot/20 flex items-center justify-center"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <span className="text-lg">🥕</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.button
          onClick={() => scrollToElement("nosotros")}
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-dimare-green transition-colors group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll hacia abajo"
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            Descubre
          </span>
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Bottom Wave - green subtle rising from ParallaxShowcase */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 md:h-16"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q720,100 1440,50 L1440,100 L0,100 Z"
            className="fill-[var(--wave-section-bg)]"
          />
        </svg>
      </div>
    </section>
  );
}
