import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Droplets, Leaf, Apple, Sparkles } from "lucide-react";
import { WaveDecoration } from "@/components/ui";

export default function ParallaxShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const beverages = [
    {
      // Green juice / smoothie
      image:
        "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=600&fit=crop",
      name: "Verde Refrescante",
      icon: Leaf,
      color: "#4ade80",
      bgColor:
        "from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30",
      y: y1,
    },
    {
      // Orange/tropical juice
      image:
        "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=600&fit=crop",
      name: "Frutal Tropical",
      icon: Apple,
      color: "#fb923c",
      bgColor:
        "from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30",
      y: y2,
    },
    {
      // Clear/blue detox water
      image:
        "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&h=600&fit=crop",
      name: "Pureza Natural",
      icon: Droplets,
      color: "#60a5fa",
      bgColor:
        "from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30",
      y: y3,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-[var(--wave-section-bg)]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full opacity-40 dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(46,107,63,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full opacity-40 dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(127,174,138,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-4">
            Sabores que Inspiran
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Cada bebida es una obra maestra artesanal, cuidadosamente preparada
            con ingredientes naturales
          </p>
        </motion.div>

        {/* Beverages Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {beverages.map((beverage, index) => {
            const Icon = beverage.icon;
            return (
              <motion.div
                key={index}
                style={{ y: beverage.y }}
                className="relative"
              >
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    delay: index * 0.15,
                  }}
                >
                  {/* Card container */}
                  <div
                    className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${beverage.bgColor} p-6 pt-8 shadow-lg border border-[var(--border-color)]`}
                  >
                    {/* Image container */}
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--bg-card)] mb-6">
                      <img
                        src={beverage.image}
                        alt={beverage.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Info tag */}
                    <div className="flex items-center justify-center gap-3 bg-[var(--bg-card)] px-5 py-3 rounded-full shadow-md border border-[var(--border-color)]">
                      <Icon
                        className="w-5 h-5"
                        style={{ color: beverage.color }}
                      />
                      <span className="text-base font-semibold text-[var(--text-primary)]">
                        {beverage.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating decorations */}
        <motion.div
          className="absolute top-20 right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-green-300/30 to-green-500/30 dark:from-green-500/20 dark:to-green-700/20 blur-sm"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-32 left-[10%] w-12 h-12 rounded-full bg-gradient-to-br from-orange-300/30 to-orange-500/30 dark:from-orange-500/20 dark:to-orange-700/20 blur-sm"
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-[5%] opacity-20 dark:opacity-10"
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Sparkles className="w-10 h-10 text-dimare-green-light" />
        </motion.div>
      </div>

      {/* Bottom Wave - white flowing down to About section */}
      <WaveDecoration color="primary" position="bottom" />
    </section>
  );
}
