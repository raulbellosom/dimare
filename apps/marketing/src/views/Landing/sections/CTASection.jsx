import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Leaf, Sparkles, Heart } from "lucide-react";
import {
  Section,
  Button,
  Blob,
  FruitDecoration,
  CitrusSlice,
} from "@/components/ui";
import { BRAND } from "@/utils/constants";
import { staggerContainer, staggerItem } from "@/utils/animations";

export default function CTASection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <Section
      variant="cream"
      className="relative overflow-hidden py-24 md:py-32 bg-[var(--wave-section-bg)]"
      ref={containerRef}
    >
      {/* Background Decorations */}
      <Blob className="top-0 left-1/4 opacity-30" color="green" size="lg" />
      <Blob
        className="bottom-0 right-1/4 opacity-20"
        color="gradient"
        size="lg"
      />

      {/* Floating Fruits */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[5%]"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <CitrusSlice color="orange" size="lg" />
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[8%]"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <FruitDecoration type="pineapple" size="xl" className="opacity-50" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] left-[10%]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <FruitDecoration type="strawberry" size="lg" className="opacity-60" />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] right-[5%]"
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <CitrusSlice color="lime" size="md" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-[2%]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FruitDecoration type="leaf" size="xl" className="opacity-30" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-[3%]"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <FruitDecoration type="mango" size="lg" className="opacity-40" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-6">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dimare-green/10 border border-dimare-green/20"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-dimare-green" />
              <span className="text-sm font-medium text-dimare-green">
                ¿Listo para probar?
              </span>
              <Sparkles className="w-4 h-4 text-dimare-green" />
            </motion.div>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            variants={staggerItem}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mb-6 leading-tight"
          >
            Regresa a lo Natural
            <span className="block font-script text-3xl md:text-4xl text-dimare-green-light mt-2">
              con cada sorbo
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Únete a miles de personas que ya descubrieron el sabor de lo
            auténtico. Crea tu bebida perfecta o elige una de nuestras
            combinaciones favoritas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="xl"
              variant="primary"
              icon={<Leaf className="w-6 h-6" />}
              onClick={() => (window.location.href = "https://app.dimare.mx")}
            >
              Comenzar Ahora
            </Button>
            <Button
              size="xl"
              variant="outline"
              icon={<ArrowRight className="w-6 h-6" />}
              iconPosition="right"
              onClick={() => (window.location.href = "/productos")}
            >
              Explorar Productos
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { icon: Leaf, text: "100% Natural" },
              { icon: Heart, text: "Hecho con amor" },
              { icon: Sparkles, text: "Sin conservadores" },
            ].map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                className="flex items-center gap-2 text-dimare-gray"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Icon className="w-5 h-5 text-dimare-green" />
                <span className="text-sm font-medium">{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Brand Quote */}
          <motion.div
            variants={staggerItem}
            className="mt-16 p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-sm max-w-2xl mx-auto"
          >
            <p className="font-script text-2xl md:text-3xl text-dimare-green dark:text-dimare-green-light leading-relaxed">
              "{BRAND.phrase}"
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-dimare-green/30 rounded-full" />
              <span className="font-display text-sm text-dimare-green/60 uppercase tracking-wider">
                {BRAND.name}
              </span>
              <div className="w-8 h-0.5 bg-dimare-green/30 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
