import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Clock } from "lucide-react";
import { Button, Section } from "@/components/ui";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Los 5 mejores jugos para empezar tu día con energía",
    excerpt:
      "Descubre las combinaciones perfectas de ingredientes naturales para comenzar cada mañana lleno de vitalidad.",
    category: "Bienestar",
    date: "15 Ene 2025",
    readTime: "5 min",
    image: "/images/blog/energia.jpg",
    color: "#F5A623",
  },
  {
    id: 2,
    title: "Beneficios del nopal en tus bebidas",
    excerpt:
      "El nopal es un superalimento mexicano con increíbles propiedades. Aprende cómo incorporarlo en tus jugos.",
    category: "Nutrición",
    date: "12 Ene 2025",
    readTime: "4 min",
    image: "/images/blog/nopal.jpg",
    color: "#4CAF50",
  },
  {
    id: 3,
    title: "Jugos detox: Mitos y realidades",
    excerpt:
      "Te explicamos qué es realmente un jugo detox y cómo puede ayudarte en tu proceso de desintoxicación natural.",
    category: "Salud",
    date: "8 Ene 2025",
    readTime: "7 min",
    image: "/images/blog/detox.jpg",
    color: "#2E7D32",
  },
  {
    id: 4,
    title: "Cómo crear la combinación perfecta de frutas",
    excerpt:
      "Guía completa para mezclar frutas y vegetales de manera que obtengas el máximo sabor y nutrientes.",
    category: "Recetas",
    date: "5 Ene 2025",
    readTime: "6 min",
    image: "/images/blog/combinaciones.jpg",
    color: "#E74C3C",
  },
  {
    id: 5,
    title: "La importancia de la hidratación natural",
    excerpt:
      "Por qué elegir bebidas naturales sobre refrescos comerciales puede transformar tu salud.",
    category: "Bienestar",
    date: "2 Ene 2025",
    readTime: "4 min",
    image: "/images/blog/hidratacion.jpg",
    color: "#4FC3F7",
  },
  {
    id: 6,
    title: "Ingredientes de temporada: Invierno",
    excerpt:
      "Descubre qué frutas y verduras están en su mejor momento durante el invierno mexicano.",
    category: "Temporada",
    date: "28 Dic 2024",
    readTime: "5 min",
    image: "/images/blog/invierno.jpg",
    color: "#8C2D2D",
  },
];

export default function BlogPage() {
  useEffect(() => {
    document.title = "Blog | Casa DI' MARE";
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
            <BookOpen className="w-4 h-4" />
            Nuestro Blog
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mb-6">
            Naturaleza & Bienestar
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Artículos, recetas y consejos para vivir de manera más natural y
            saludable.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-[var(--bg-card)] rounded-3xl overflow-hidden shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Image Placeholder */}
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${post.color}30, ${post.color}50)`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen
                    className="w-16 h-16 opacity-30"
                    style={{ color: post.color }}
                  />
                </div>
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: post.color }}
                >
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[var(--text-heading)] mb-2 line-clamp-2 group-hover:text-dimare-green-light transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="group/btn"
                  icon={
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  }
                >
                  Leer más
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-br from-dimare-green to-dimare-green-dark rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Suscríbete a nuestro Newsletter
            </h3>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Recibe recetas, consejos de salud y ofertas exclusivas
              directamente en tu correo.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              />
              <Button
                type="submit"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-dimare-green"
              >
                Suscribirse
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
