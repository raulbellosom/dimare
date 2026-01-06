import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Sparkles, ArrowRight, Heart } from "lucide-react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  Button,
  Card,
  Badge,
  Blob,
  FruitDecoration,
  WaveDecoration,
} from "@/components/ui";
import { SAMPLE_DRINKS, SAMPLE_INGREDIENTS } from "@/utils/constants";
import { staggerContainer, staggerItem, hoverLift } from "@/utils/animations";

// Imágenes de bebidas de Unsplash para el catálogo
const DRINK_IMAGES = [
  "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop", // Green juice
  "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop", // Orange juice
  "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&h=300&fit=crop", // Detox water
  "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop", // Smoothie
  "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop", // Fresh juice
  "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop", // Fruit drink
];

export default function ProductsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [hoveredDrink, setHoveredDrink] = useState(null);

  const getIngredientEmoji = (ingredientId) => {
    const ingredient = SAMPLE_INGREDIENTS.find((i) => i.id === ingredientId);
    return ingredient?.emoji || "🍹";
  };

  return (
    <Section
      id="productos"
      variant="gradient"
      className="relative overflow-hidden bg-[var(--wave-section-bg)]"
      ref={containerRef}
    >
      {/* Wave Top - white flowing down from About section */}
      <WaveDecoration color="primary" position="top" />

      {/* Background Decorations */}
      <Blob className="-top-32 -right-32 opacity-30" color="green" size="xl" />
      <Blob
        className="-bottom-32 -left-32 opacity-20"
        color="cream"
        size="xl"
      />

      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-[10%]"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <FruitDecoration type="orange" size="lg" className="opacity-30" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[5%]"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <FruitDecoration type="leaf" size="xl" className="opacity-20" />
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
            <Sparkles className="w-5 h-5 text-dimare-green-light" />
            <span className="font-display text-dimare-green-light uppercase tracking-wider text-sm">
              Nuestras Bebidas
            </span>
            <Sparkles className="w-5 h-5 text-dimare-green-light" />
          </motion.div>

          <SectionTitle>Productos Destacados</SectionTitle>

          <SectionDescription>
            Descubre nuestras combinaciones más populares, creadas con los
            ingredientes más frescos para darte energía natural y un sabor
            inolvidable.
          </SectionDescription>
        </SectionHeader>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {SAMPLE_DRINKS.map((drink, index) => (
            <motion.div
              key={drink.id}
              variants={staggerItem}
              onMouseEnter={() => setHoveredDrink(drink.id)}
              onMouseLeave={() => setHoveredDrink(null)}
            >
              <Card
                variant="default"
                className="h-full group cursor-pointer"
                onClick={() => setSelectedDrink(drink)}
              >
                {/* Visual Header with Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* Background Image */}
                  <img
                    src={DRINK_IMAGES[index % DRINK_IMAGES.length]}
                    alt={drink.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${drink.color}60 0%, ${drink.color}30 50%, transparent 100%)`,
                    }}
                  />

                  {/* Popular Badge */}
                  {drink.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge
                        variant="accent"
                        className="flex items-center gap-1"
                      >
                        <Star className="w-3 h-3 fill-current" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Center Circle with emoji */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center bg-white/90 dark:bg-black/50 shadow-lg backdrop-blur-sm"
                      animate={
                        hoveredDrink === drink.id
                          ? { scale: 1.1, rotate: 5 }
                          : { scale: 1, rotate: 0 }
                      }
                    >
                      <span className="text-4xl">🍹</span>
                    </motion.div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="font-display text-xl font-bold mb-2 uppercase tracking-wide text-[var(--text-heading)]">
                    {drink.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                    {drink.description}
                  </p>

                  {/* Ingredients Preview */}
                  <div className="flex items-center gap-1 mb-4">
                    {drink.ingredients.slice(0, 4).map((ingredientId) => (
                      <span
                        key={ingredientId}
                        className="text-lg"
                        title={
                          SAMPLE_INGREDIENTS.find((i) => i.id === ingredientId)
                            ?.name
                        }
                      >
                        {getIngredientEmoji(ingredientId)}
                      </span>
                    ))}
                    {drink.ingredients.length > 4 && (
                      <span className="text-xs text-dimare-gray">
                        +{drink.ingredients.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-dimare-gray">Desde</span>
                      <p className="font-display text-2xl font-bold text-dimare-green dark:text-dimare-green-light">
                        ${drink.price}
                      </p>
                    </div>

                    <motion.div {...hoverLift}>
                      <Button
                        size="sm"
                        variant="outline"
                        icon={<ShoppingBag className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          const appUrl =
                            import.meta.env.VITE_APP_URL ||
                            "https://app.dimare.mx";
                          window.location.href = `${appUrl}?drink=${drink.id}`;
                        }}
                      >
                        Ordenar
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            variant="primary"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            onClick={() => (window.location.href = "/productos")}
          >
            Ver Todos los Productos
          </Button>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedDrink && (
          <ProductModal
            drink={selectedDrink}
            onClose={() => setSelectedDrink(null)}
            getIngredientEmoji={getIngredientEmoji}
          />
        )}
      </AnimatePresence>

      {/* Bottom Wave - dark green connecting to Benefits section */}
      <WaveDecoration color="green" position="bottom" />
    </Section>
  );
}

function ProductModal({ drink, onClose, getIngredientEmoji }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div
          className="relative h-48 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${drink.color}30 0%, ${drink.color}60 100%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            ✕
          </button>

          {/* Large Glass Icon */}
          <motion.div
            className="text-8xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            🍹
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2
                className="font-display text-2xl font-bold uppercase"
                style={{ color: drink.color }}
              >
                {drink.name}
              </h2>
              {drink.popular && (
                <Badge variant="accent" className="mt-2">
                  <Star className="w-3 h-3 fill-current mr-1" />
                  Más Popular
                </Badge>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs text-[var(--text-muted)]">Desde</span>
              <p className="font-display text-3xl font-bold text-dimare-green">
                ${drink.price}
              </p>
            </div>
          </div>

          <p className="text-[var(--text-secondary)] mb-6">
            {drink.description}
          </p>

          {/* Ingredients */}
          <div className="mb-6">
            <h4 className="font-display font-bold text-[var(--text-heading)] mb-3">
              Ingredientes
            </h4>
            <div className="flex flex-wrap gap-2">
              {drink.ingredients.map((ingredientId) => {
                const ingredient = SAMPLE_INGREDIENTS.find(
                  (i) => i.id === ingredientId
                );
                return (
                  <motion.span
                    key={ingredientId}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm"
                    style={{ backgroundColor: ingredient?.color + "20" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {getIngredientEmoji(ingredientId)}
                    <span className="font-medium">{ingredient?.name}</span>
                  </motion.span>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              icon={<Heart className="w-5 h-5" />}
            >
              Favorito
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              icon={<ShoppingBag className="w-5 h-5" />}
              onClick={() => {
                const appUrl =
                  import.meta.env.VITE_APP_URL || "https://app.dimare.mx";
                window.location.href = `${appUrl}?drink=${drink.id}`;
              }}
            >
              Ordenar Ahora
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
