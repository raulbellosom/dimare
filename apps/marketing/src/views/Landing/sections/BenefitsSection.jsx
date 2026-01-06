import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Leaf,
  Zap,
  Heart,
  Shield,
  Droplets,
  Sun,
  Sparkles,
  Brain,
} from "lucide-react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  Blob,
  FruitDecoration,
  WaveDecoration,
} from "@/components/ui";
import { staggerContainer, staggerItem } from "@/utils/animations";

export default function BenefitsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Zap,
      title: "Energía Natural",
      description:
        "Obtén energía de fuentes naturales sin cafeína artificial ni azúcares añadidos.",
      color: "#F5A623",
      gradient: "from-fruit-orange/20 to-fruit-mango/20",
      emoji: "⚡",
    },
    {
      icon: Shield,
      title: "Sistema Inmune",
      description:
        "Vitaminas y antioxidantes que fortalecen tus defensas naturales.",
      color: "#27AE60",
      gradient: "from-dimare-green/20 to-dimare-green-light/20",
      emoji: "🛡️",
    },
    {
      icon: Droplets,
      title: "Hidratación",
      description:
        "Mantén tu cuerpo hidratado con bebidas refrescantes y nutritivas.",
      color: "#3498DB",
      gradient: "from-blue-400/20 to-cyan-400/20",
      emoji: "💧",
    },
    {
      icon: Sun,
      title: "Vitalidad",
      description:
        "Siente la vitalidad que solo los ingredientes frescos pueden darte.",
      color: "#F4D03F",
      gradient: "from-fruit-lemon/20 to-fruit-pineapple/20",
      emoji: "☀️",
    },
    {
      icon: Heart,
      title: "Bienestar",
      description:
        "Cuida tu cuerpo con ingredientes que promueven tu bienestar general.",
      color: "#E74C3C",
      gradient: "from-dimare-red/20 to-red-400/20",
      emoji: "❤️",
    },
    {
      icon: Brain,
      title: "Claridad Mental",
      description:
        "Ingredientes que apoyan la concentración y claridad durante el día.",
      color: "#9B59B6",
      gradient: "from-purple-400/20 to-violet-400/20",
      emoji: "🧠",
    },
  ];

  const ingredients = [
    { name: "Espinaca", emoji: "🥬", benefit: "Rica en hierro" },
    { name: "Jengibre", emoji: "🫚", benefit: "Antiinflamatorio" },
    { name: "Zanahoria", emoji: "🥕", benefit: "Vitamina A" },
    { name: "Naranja", emoji: "🍊", benefit: "Vitamina C" },
    { name: "Betabel", emoji: "🍠", benefit: "Antioxidantes" },
    { name: "Piña", emoji: "🍍", benefit: "Digestión" },
  ];

  return (
    <Section
      id="beneficios"
      variant="cream"
      className="relative overflow-hidden bg-dimare-green dark:bg-dimare-green-dark"
      ref={containerRef}
    >
      {/* Background Decorations */}
      <Blob className="top-1/4 -left-32 opacity-30" color="green" size="lg" />
      <Blob
        className="bottom-1/4 -right-32 opacity-20"
        color="gradient"
        size="lg"
      />

      <div className="relative z-10">
        {/* Section Header */}
        <SectionHeader centered>
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <Heart className="w-5 h-5 text-white/80" />
            <span className="font-display text-white/80 uppercase tracking-wider text-sm">
              Beneficios
            </span>
            <Heart className="w-5 h-5 text-white/80" />
          </motion.div>

          <SectionTitle className="text-white">
            Naturaleza que Nutre
          </SectionTitle>

          <SectionDescription className="text-white/80">
            Cada ingrediente de nuestras bebidas fue seleccionado no solo por su
            sabor, sino por los beneficios que aporta a tu bienestar diario.
          </SectionDescription>
        </SectionHeader>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={staggerItem}
              className="group"
            >
              <motion.div
                className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden h-full"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Background Emoji */}
                <span className="absolute -top-4 -right-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
                  {benefit.emoji}
                </span>

                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{ backgroundColor: benefit.color }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                  style={{ backgroundColor: benefit.color }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ingredients Showcase */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Background Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-white/80" />
                <span className="font-display text-white/80 uppercase tracking-wider text-sm">
                  Ingredientes Estrella
                </span>
                <Sparkles className="w-5 h-5 text-white/80" />
              </motion.div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                Conoce lo que llevas en cada sorbo
              </h3>
            </div>

            {/* Ingredients Row */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.name}
                  className="flex flex-col items-center p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <motion.span
                    className="text-5xl mb-3"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {ingredient.emoji}
                  </motion.span>
                  <span className="font-display font-bold text-white">
                    {ingredient.name}
                  </span>
                  <span className="text-xs text-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {ingredient.benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <motion.p
              className="text-center text-xs text-white/50 mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              * Los beneficios mencionados son informativos y basados en las
              propiedades naturales de los ingredientes. Nuestras bebidas no
              reemplazan tratamientos médicos ni pretenden curar o prevenir
              enfermedades.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
