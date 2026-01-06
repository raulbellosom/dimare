import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  Button,
  Blob,
  FruitDecoration,
  WaveDecoration,
} from "@/components/ui";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { cn } from "@/utils/helpers";

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "María García",
      role: "Entusiasta del bienestar",
      avatar: "👩‍🦰",
      rating: 5,
      text: "Las bebidas de DI'MARE han cambiado mi rutina matutina. Me encanta el sabor fresco y saber que estoy tomando algo 100% natural.",
      favorite: "Verde Detox",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Deportista amateur",
      avatar: "👨",
      rating: 5,
      text: "Perfectas para después del ejercicio. El Tropical Sunrise me da la energía que necesito sin sentirme pesado.",
      favorite: "Tropical Sunrise",
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Mamá de familia",
      avatar: "👩",
      rating: 5,
      text: "A mis hijos les encantan. Es increíble encontrar algo saludable que realmente disfruten tomar.",
      favorite: "Refrescante Cítrico",
    },
    {
      id: 4,
      name: "Roberto Sánchez",
      role: "Chef profesional",
      avatar: "👨‍🍳",
      rating: 5,
      text: "Como chef, aprecio la calidad de los ingredientes. Se nota que son frescos y bien seleccionados.",
      favorite: "Rojo Poder",
    },
    {
      id: 5,
      name: "Laura Torres",
      role: "Nutrióloga",
      avatar: "👩‍⚕️",
      rating: 5,
      text: "Recomiendo DI'MARE a mis pacientes. Son una excelente opción para incorporar más frutas y verduras.",
      favorite: "Verde Detox",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      id="testimonios"
      variant="green"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(46,107,63,0.12) 0%, rgba(29,74,43,0.95) 100%)",
      }}
      ref={containerRef}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          className="absolute top-20 left-[10%]"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <FruitDecoration type="leaf" size="xl" animated={false} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-[10%]"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <FruitDecoration type="orange" size="xl" animated={false} />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <SectionHeader centered>
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <Star className="w-5 h-5 text-fruit-lemon fill-current" />
            <span className="font-display text-white/80 uppercase tracking-wider text-sm">
              Testimonios
            </span>
            <Star className="w-5 h-5 text-fruit-lemon fill-current" />
          </motion.div>

          <SectionTitle className="!text-white">
            Lo que dicen nuestros clientes
          </SectionTitle>

          <SectionDescription className="!text-white/80">
            Miles de personas ya disfrutan nuestras bebidas naturales. Descubre
            por qué nos eligen cada día.
          </SectionDescription>
        </SectionHeader>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 bg-dimare-green-light rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-5 h-5 text-fruit-orange fill-current" />
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-display text-xl md:text-2xl text-dimare-gray dark:text-white leading-relaxed mb-8">
              "{testimonials[activeIndex].text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-full bg-dimare-cream dark:bg-white/10 flex items-center justify-center text-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {testimonials[activeIndex].avatar}
                </motion.div>
                <div>
                  <p className="font-display font-bold text-[var(--text-heading)]">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>

              {/* Favorite Drink */}
              <div className="hidden sm:block text-right">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  Su favorita
                </p>
                <p className="font-display font-bold text-dimare-green-light">
                  {testimonials[activeIndex].favorite}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index === activeIndex
                      ? "bg-white w-8"
                      : "bg-white/40 hover:bg-white/60"
                  )}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {[
            { number: "5,000+", label: "Clientes felices" },
            { number: "4.9", label: "Calificación promedio", icon: Star },
            { number: "98%", label: "Recomendarían" },
            { number: "50k+", label: "Bebidas servidas" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  className="font-display text-3xl md:text-4xl font-bold text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: "spring", delay: 0.5 }}
                >
                  {stat.number}
                </motion.span>
                {stat.icon && (
                  <stat.icon className="w-6 h-6 text-fruit-orange fill-current" />
                )}
              </div>
              <span className="text-white/70 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave Bottom - green subtle connecting to CTA section */}
      <WaveDecoration color="wave" position="bottom" />
    </Section>
  );
}
