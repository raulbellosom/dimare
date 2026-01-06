import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Droplets, Sun, Heart } from "lucide-react";
import { Section } from "@/components/ui";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { BRAND } from "@/utils/constants";

export default function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Leaf,
      title: "Natural",
      description:
        "Sin conservadores, sin aditivos. Solo ingredientes 100% naturales.",
      color: "#2E6B3F",
      bgLight: "#e8f5eb",
      bgDark: "rgba(46, 107, 63, 0.2)",
    },
    {
      icon: Droplets,
      title: "Fresco",
      description: "Preparamos cada día para garantizar la máxima frescura.",
      color: "#4FC3F7",
      bgLight: "#e1f5fe",
      bgDark: "rgba(79, 195, 247, 0.2)",
    },
    {
      icon: Sun,
      title: "Artesanal",
      description:
        "Cada bebida es preparada con el cuidado de una receta casera.",
      color: "#F5A623",
      bgLight: "#fff3e0",
      bgDark: "rgba(245, 166, 35, 0.2)",
    },
    {
      icon: Heart,
      title: "Con Amor",
      description:
        "Ponemos pasión en cada detalle, desde la selección hasta tu mano.",
      color: "#8C2D2D",
      bgLight: "#fce4ec",
      bgDark: "rgba(140, 45, 45, 0.2)",
    },
  ];

  return (
    <Section
      id="nosotros"
      className="py-20 md:py-32 bg-[var(--bg-primary)]"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-dimare-green-light font-display text-sm uppercase tracking-wider mb-4">
            <Leaf className="w-4 h-4" />
            Conócenos
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-6">
            ¿Qué es Casa DI' MARE?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Somos una marca de bebidas naturales artesanales que nació del amor
            por lo auténtico. Creemos en volver a las raíces, donde cada
            ingrediente cuenta una historia de frescura y calidad.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Story Card with Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              {/* Background Image */}
              <img
                src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&h=600&fit=crop"
                alt="Bebidas naturales"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dimare-green-dark/90 via-dimare-green/60 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="mb-4">
                  <Leaf className="w-12 h-12 text-white/80" />
                </div>
                <p className="font-script text-2xl md:text-3xl text-white mb-4">
                  "{BRAND.phrase}"
                </p>
                <p className="text-white/70 text-sm">— Nuestra filosofía</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Values */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="space-y-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                className="group"
              >
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-dimare-green/30 transition-all duration-300 shadow-sm hover:shadow-md">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: value.bgLight }}
                  >
                    <value.icon
                      className="w-6 h-6"
                      style={{ color: value.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-[var(--text-heading)] mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {value.description}
                    </p>
                  </div>

                  {/* Number */}
                  <span className="font-display text-3xl font-bold text-dimare-green/10 dark:text-white/10">
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { number: "100%", label: "Natural" },
            { number: "20+", label: "Ingredientes" },
            { number: "50+", label: "Combinaciones" },
            { number: "∞", label: "Posibilidades" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-color)]"
            >
              <span className="block font-display text-3xl md:text-4xl font-bold text-dimare-green dark:text-dimare-green-light">
                {stat.number}
              </span>
              <span className="text-[var(--text-secondary)] text-sm uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
