import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  RefreshCw,
  Trash2,
  Sparkles,
  ArrowRight,
  Droplets,
} from "lucide-react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  Button,
  Badge,
  Blob,
  FruitDecoration,
  WaveDecoration,
} from "@/components/ui";
import { SAMPLE_INGREDIENTS, INGREDIENTS_CATEGORIES } from "@/utils/constants";
import { staggerContainer, staggerItem, hoverScale } from "@/utils/animations";
import { cn } from "@/utils/helpers";

const MAX_INGREDIENTS = 6;

export default function DesignerSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [activeCategory, setActiveCategory] = useState("frutas");
  const [bottleSize, setBottleSize] = useState(500);

  const addIngredient = (ingredient) => {
    if (selectedIngredients.length >= MAX_INGREDIENTS) return;
    if (selectedIngredients.find((i) => i.id === ingredient.id)) return;

    setSelectedIngredients([...selectedIngredients, { ...ingredient, qty: 1 }]);
  };

  const removeIngredient = (ingredientId) => {
    setSelectedIngredients(
      selectedIngredients.filter((i) => i.id !== ingredientId)
    );
  };

  const clearAll = () => {
    setSelectedIngredients([]);
  };

  const randomize = () => {
    const shuffled = [...SAMPLE_INGREDIENTS].sort(() => Math.random() - 0.5);
    const random = shuffled
      .slice(0, Math.floor(Math.random() * 4) + 2)
      .map((i) => ({ ...i, qty: 1 }));
    setSelectedIngredients(random);
  };

  const estimatedPrice =
    45 + selectedIngredients.length * 10 + (bottleSize === 750 ? 20 : 0);

  const filteredIngredients = SAMPLE_INGREDIENTS.filter(
    (i) => i.category === activeCategory
  );

  const handleOrder = () => {
    const payload = {
      sizeMl: bottleSize,
      ingredients: selectedIngredients.map((i) => ({ id: i.id, qty: i.qty })),
      estimatedPrice,
    };
    const encoded = encodeURIComponent(JSON.stringify(payload));
    const appUrl = import.meta.env.VITE_APP_URL || "https://app.dimare.mx";
    window.location.href = `${appUrl}/designer?order=${encoded}`;
  };

  return (
    <Section
      id="diseñador"
      variant="white"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(127,174,138,0.07) 0%, var(--bg-primary) 65%)",
      }}
      ref={containerRef}
    >
      {/* Wave Top */}
      <WaveDecoration color="cream" position="top" flip />

      {/* Background Decorations */}
      <Blob className="-top-32 left-1/4 opacity-20" color="green" size="xl" />
      <Blob
        className="-bottom-32 right-1/4 opacity-20"
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
            <Sparkles className="w-5 h-5 text-dimare-green" />
            <span className="font-display text-dimare-green uppercase tracking-wider text-sm">
              Crea tu Combinación
            </span>
            <Sparkles className="w-5 h-5 text-dimare-green" />
          </motion.div>

          <SectionTitle gradient>Diseña tu Bebida</SectionTitle>

          <SectionDescription>
            Explora, mezcla y crea tu combinación perfecta. Selecciona hasta{" "}
            {MAX_INGREDIENTS} ingredientes y descubre sabores únicos hechos a tu
            medida.
          </SectionDescription>
        </SectionHeader>

        {/* Designer Interface */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {/* Left: Ingredient Selection */}
          <div className="lg:col-span-2">
            <div className="bg-dimare-cream dark:bg-white/5 rounded-3xl p-6 md:p-8">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {INGREDIENTS_CATEGORIES.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "px-4 py-2 rounded-full font-display text-sm font-medium transition-all",
                      activeCategory === category.id
                        ? "bg-dimare-green text-white"
                        : "bg-white dark:bg-white/10 text-dimare-gray hover:bg-dimare-green/10"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>

              {/* Ingredients Grid */}
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                key={activeCategory}
              >
                <AnimatePresence mode="popLayout">
                  {filteredIngredients.map((ingredient) => {
                    const isSelected = selectedIngredients.find(
                      (i) => i.id === ingredient.id
                    );
                    const isDisabled =
                      selectedIngredients.length >= MAX_INGREDIENTS &&
                      !isSelected;

                    return (
                      <motion.button
                        key={ingredient.id}
                        variants={staggerItem}
                        layout
                        onClick={() =>
                          isSelected
                            ? removeIngredient(ingredient.id)
                            : addIngredient(ingredient)
                        }
                        disabled={isDisabled}
                        className={cn(
                          "relative flex flex-col items-center p-3 rounded-2xl transition-all",
                          isSelected
                            ? "bg-dimare-green text-white shadow-lg ring-2 ring-dimare-green"
                            : "bg-white dark:bg-white/10 hover:bg-dimare-green/10",
                          isDisabled && "opacity-40 cursor-not-allowed"
                        )}
                        whileHover={!isDisabled ? { scale: 1.05, y: -3 } : {}}
                        whileTap={!isDisabled ? { scale: 0.95 } : {}}
                      >
                        <span className="text-3xl mb-1">
                          {ingredient.emoji}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-medium text-center leading-tight",
                            isSelected ? "text-white" : "text-dimare-gray"
                          )}
                        >
                          {ingredient.name}
                        </span>

                        {isSelected && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-5 h-5 bg-dimare-red rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Minus className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-dimare-green/10">
                <motion.button
                  onClick={randomize}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/10 text-dimare-gray hover:text-dimare-green transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Sorpréndeme</span>
                </motion.button>

                {selectedIngredients.length > 0 && (
                  <motion.button
                    onClick={clearAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-dimare-red hover:bg-dimare-red/10 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Limpiar</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Preview & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-dimare-green/10 to-dimare-cream dark:from-dimare-green/20 dark:to-gray-800/50 rounded-3xl p-6 sticky top-24">
              {/* Bottle Preview */}
              <div className="relative h-64 mb-6 flex items-center justify-center">
                {/* Bottle Shape */}
                <motion.div
                  className="relative w-24 h-48"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Bottle Neck */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-full" />

                  {/* Bottle Body */}
                  <div className="absolute top-10 left-0 right-0 bottom-0 bg-gradient-to-b from-white/80 to-white/40 rounded-b-3xl border-2 border-white/50 overflow-hidden backdrop-blur-sm">
                    {/* Liquid Layers */}
                    <div className="absolute inset-0 flex flex-col-reverse">
                      {selectedIngredients.map((ingredient, index) => {
                        const height =
                          100 / Math.max(selectedIngredients.length, 1);
                        return (
                          <motion.div
                            key={ingredient.id}
                            className="w-full"
                            style={{
                              height: `${height}%`,
                              backgroundColor: ingredient.color + "80",
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            exit={{ height: 0 }}
                          />
                        );
                      })}
                    </div>

                    {/* Empty State */}
                    {selectedIngredients.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center text-dimare-gray/40">
                        <Droplets className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Cap */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-dimare-green rounded-full" />
                </motion.div>

                {/* Floating Ingredients */}
                <div className="absolute inset-0 pointer-events-none">
                  {selectedIngredients.slice(0, 4).map((ingredient, index) => {
                    const positions = [
                      { top: "20%", left: "10%" },
                      { top: "30%", right: "10%" },
                      { bottom: "30%", left: "15%" },
                      { bottom: "20%", right: "15%" },
                    ];
                    return (
                      <motion.span
                        key={ingredient.id}
                        className="absolute text-2xl"
                        style={positions[index]}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 0.7,
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      >
                        {ingredient.emoji}
                      </motion.span>
                    );
                  })}
                </div>
              </div>

              {/* Selected Ingredients List */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-[var(--text-heading)]">
                    Tu Mezcla
                  </span>
                  <Badge>
                    {selectedIngredients.length} / {MAX_INGREDIENTS}
                  </Badge>
                </div>

                {selectedIngredients.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredients.map((ingredient) => (
                      <motion.span
                        key={ingredient.id}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-sm"
                        layout
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {ingredient.emoji}
                        <span className="text-xs">{ingredient.name}</span>
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-muted)] italic">
                    Selecciona ingredientes para comenzar
                  </p>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <span className="block font-display font-bold text-[var(--text-heading)] mb-3">
                  Tamaño
                </span>
                <div className="flex gap-2">
                  {[
                    { size: 500, label: "500ml" },
                    { size: 750, label: "750ml" },
                  ].map(({ size, label }) => (
                    <motion.button
                      key={size}
                      onClick={() => setBottleSize(size)}
                      className={cn(
                        "flex-1 py-2 rounded-xl font-medium text-sm transition-all",
                        bottleSize === size
                          ? "bg-dimare-green text-white"
                          : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-dimare-green/10 border border-[var(--border-color)]"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-dimare-gray">Precio estimado</span>
                  <motion.span
                    className="font-display text-2xl font-bold text-dimare-green"
                    key={estimatedPrice}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  >
                    ${estimatedPrice}
                  </motion.span>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                disabled={selectedIngredients.length === 0}
                onClick={handleOrder}
              >
                Ordenar Ahora
              </Button>

              <p className="text-xs text-center text-dimare-gray/60 mt-4">
                * Serás redirigido a nuestra app para completar tu pedido
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <WaveDecoration color="green" position="bottom" />
    </Section>
  );
}
