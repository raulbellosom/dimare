import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Leaf, Star, ArrowRight } from "lucide-react";
import { Button, Section } from "@/components/ui";
import { SAMPLE_DRINKS, SAMPLE_INGREDIENTS } from "@/utils/constants";

// Placeholder images for drinks
const DRINK_IMAGES = [
  "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=500&fit=crop", // Green juice
  "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=500&fit=crop", // Orange juice
  "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&h=500&fit=crop", // Detox water
  "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=500&fit=crop", // Smoothie
  "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=500&fit=crop", // Berry smoothie
  "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&h=500&fit=crop", // Green smoothie
];

export default function ProductsPage() {
  useEffect(() => {
    document.title = "Nuestros Productos | Casa DI' MARE";
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
            <ShoppingBag className="w-4 h-4" />
            Catálogo de Productos
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mb-6">
            Nuestras Bebidas
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Descubre nuestra selección de bebidas naturales, preparadas con los
            ingredientes más frescos cada día.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_DRINKS.map((drink, index) => (
            <motion.div
              key={drink.id}
              className="group bg-[var(--bg-card)] rounded-3xl overflow-hidden shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Product Image Area */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={DRINK_IMAGES[index % DRINK_IMAGES.length]}
                  alt={drink.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {drink.popular && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-dimare-red text-white text-xs font-bold rounded-full">
                    <Star className="w-3 h-3" />
                    Popular
                  </div>
                )}

                {/* Price badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-lg font-bold text-dimare-green dark:text-dimare-green-light">
                    ${drink.price}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] ml-1">
                    MXN
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-[var(--text-heading)] mb-2">
                  {drink.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {drink.description}
                </p>

                {/* Ingredients */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {drink.ingredients.map((ingId) => {
                    const ing = SAMPLE_INGREDIENTS.find((i) => i.id === ingId);
                    return ing ? (
                      <span
                        key={ingId}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--bg-tertiary)] rounded-full text-xs text-[var(--text-secondary)]"
                      >
                        <span>{ing.emoji}</span>
                        {ing.name}
                      </span>
                    ) : null;
                  })}
                </div>

                {/* CTA Button */}
                <Button
                  size="sm"
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full justify-center"
                  onClick={() => {
                    const appUrl =
                      import.meta.env.VITE_APP_URL || "https://app.dimare.mx";
                    window.location.href = `${appUrl}?drink=${drink.id}`;
                  }}
                >
                  Ordenar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Drink CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-block p-8 bg-gradient-to-br from-dimare-green to-dimare-green-dark rounded-3xl text-white">
            <Leaf className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="font-display text-2xl font-bold mb-3">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Crea tu propia combinación personalizada con nuestro diseñador de
              bebidas.
            </p>
            <Button
              as={Link}
              to="/disenador"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-dimare-green"
            >
              Diseña tu bebida
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
