import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Leaf,
  Sparkles,
  Shield,
  Zap,
  Droplets,
  Sun,
  Apple,
} from "lucide-react";
import { Section } from "@/components/ui";

const BENEFITS = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "Sin conservadores artificiales, colorantes ni azúcares añadidos. Solo ingredientes frescos de origen natural.",
    color: "#2E6B3F",
  },
  {
    icon: Heart,
    title: "Saludable",
    description:
      "Cada bebida está diseñada para nutrir tu cuerpo con vitaminas, minerales y antioxidantes esenciales.",
    color: "#8C2D2D",
  },
  {
    icon: Sparkles,
    title: "Artesanal",
    description:
      "Preparadas con dedicación y cuidado, como lo harías en casa. Cada bebida es única.",
    color: "#F5A623",
  },
  {
    icon: Shield,
    title: "Sin Aditivos",
    description:
      "Nos comprometemos a no usar ningún aditivo químico. Tu salud es nuestra prioridad.",
    color: "#7FAE8A",
  },
  {
    icon: Zap,
    title: "Energía Natural",
    description:
      "Obtén energía de fuentes naturales. Ideal para empezar el día o recuperarte después del ejercicio.",
    color: "#FF9800",
  },
  {
    icon: Droplets,
    title: "Hidratación",
    description:
      "Mantente hidratado con bebidas que además de refrescarte, te aportan nutrientes esenciales.",
    color: "#4FC3F7",
  },
  {
    icon: Sun,
    title: "Frescura Diaria",
    description:
      "Preparamos nuestras bebidas cada día para garantizar la máxima frescura y sabor.",
    color: "#F4D03F",
  },
  {
    icon: Apple,
    title: "Nutrición Completa",
    description:
      "Combinaciones equilibradas que aportan los nutrientes que tu cuerpo necesita.",
    color: "#E74C3C",
  },
];

export default function BenefitsPage() {
  useEffect(() => {
    document.title = "Beneficios | Casa DI' MARE";
  }, []);

  return (
    <Section className="pt-32 pb-20 min-h-screen bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-dimare-green font-display text-sm uppercase tracking-wider mb-4">
            <Heart className="w-4 h-4" />
            Por qué elegirnos
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mb-6">
            Beneficios Naturales
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Descubre por qué nuestras bebidas naturales son la mejor opción para
            cuidar tu salud y bienestar.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="group bg-[var(--bg-card)] rounded-3xl p-6 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${benefit.color}15` }}
              >
                <benefit.icon
                  className="w-7 h-7"
                  style={{ color: benefit.color }}
                />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-heading)] mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { value: "100%", label: "Natural" },
            { value: "0", label: "Conservadores" },
            { value: "20+", label: "Ingredientes" },
            { value: "∞", label: "Combinaciones" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <span className="block font-display text-4xl md:text-5xl font-bold text-dimare-green dark:text-dimare-green-light mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <blockquote className="max-w-3xl mx-auto">
            <p className="font-script text-3xl md:text-4xl text-dimare-green-light mb-4">
              "Casa DI' MARE desea que con cada sorbo regreses a lo natural."
            </p>
            <cite className="text-[var(--text-muted)] not-italic">
              — Nuestra filosofía
            </cite>
          </blockquote>
        </motion.div>
      </div>
    </Section>
  );
}
