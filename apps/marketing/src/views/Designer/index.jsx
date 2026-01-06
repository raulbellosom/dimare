import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Leaf,
  Droplets,
  Apple,
  ChevronDown,
  Check,
  ShoppingCart,
  Trash2,
  Star,
} from "lucide-react";
import { Button, Section } from "@/components/ui";
import {
  SAMPLE_INGREDIENTS,
  INGREDIENTS_CATEGORIES,
  SAMPLE_DRINKS,
  INGREDIENT_BENEFITS,
  DRINK_SIZES,
  BASE_PRICE,
} from "@/utils/constants";

const APP_URL = import.meta.env.VITE_APP_URL || "https://app.dimare.mx";

// Iconos por categoría
const CATEGORY_ICONS = {
  bases: Droplets,
  verdes: Leaf,
  frutas: Apple,
  extras: Sparkles,
};

// Scale factors para cada tamaño
const SIZE_SCALES = {
  "350ml": 0.85,
  "500ml": 1,
  "750ml": 1.15,
};

export default function DesignerPage() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSize, setSelectedSize] = useState("500ml");
  const [expandedCategory, setExpandedCategory] = useState("bases");

  useEffect(() => {
    document.title = "Diseña tu Bebida | Casa DI' MARE";
    // Forzar scroll al top inmediatamente y después de un pequeño delay
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);
  }, []);

  // Calcular precio total (la base no cuenta como ingrediente para el precio extra)
  const totalPrice = useMemo(() => {
    const ingredientsPrice = selectedIngredients.reduce((acc, ingId) => {
      const ing = SAMPLE_INGREDIENTS.find((i) => i.id === ingId);
      return acc + (ing?.price || 0);
    }, 0);
    // El precio de la base se suma separadamente
    const baseIngredient = selectedBase
      ? SAMPLE_INGREDIENTS.find((i) => i.id === selectedBase)
      : null;
    const basePrice = baseIngredient?.price || 0;
    const sizePrice =
      DRINK_SIZES.find((s) => s.id === selectedSize)?.price || 0;
    return BASE_PRICE + ingredientsPrice + basePrice + sizePrice;
  }, [selectedIngredients, selectedBase, selectedSize]);

  // Obtener beneficios únicos (incluye la base)
  const benefits = useMemo(() => {
    const allIngredients = selectedBase
      ? [selectedBase, ...selectedIngredients]
      : selectedIngredients;
    const allBenefits = allIngredients.flatMap(
      (id) => INGREDIENT_BENEFITS[id] || []
    );
    return [...new Set(allBenefits)];
  }, [selectedIngredients, selectedBase]);

  // Colores de los ingredientes seleccionados para la botella (incluye la base al inicio)
  const bottleColors = useMemo(() => {
    const allIngredients = selectedBase
      ? [selectedBase, ...selectedIngredients]
      : selectedIngredients;
    return allIngredients
      .map((id) => SAMPLE_INGREDIENTS.find((i) => i.id === id))
      .filter(Boolean)
      .map((ing) => ing.color);
  }, [selectedIngredients, selectedBase]);

  // Manejar selección de base (solo una)
  const selectBase = (id) => {
    setSelectedBase(selectedBase === id ? null : id);
  };

  const toggleIngredient = (id) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const loadPreset = (drink) => {
    // Separar la base de los otros ingredientes
    const baseIds = ["agua-natural", "agua-coco", "leche-almendras"];
    const presetBase = drink.ingredients.find((id) => baseIds.includes(id));
    const otherIngredients = drink.ingredients.filter(
      (id) => !baseIds.includes(id)
    );
    setSelectedBase(presetBase || null);
    setSelectedIngredients(otherIngredients.slice(0, 5));
  };

  const clearAll = () => {
    setSelectedIngredients([]);
    setSelectedBase(null);
  };

  const handleOrder = () => {
    const payload = {
      size: selectedSize,
      base: selectedBase,
      ingredients: selectedIngredients,
      price: totalPrice,
      benefits: benefits,
    };
    const encoded = encodeURIComponent(JSON.stringify(payload));
    window.location.href = `${APP_URL}/designer?order=${encoded}`;
  };

  const getSelectedByCategory = (categoryId) => {
    if (categoryId === "bases") {
      return selectedBase ? [selectedBase] : [];
    }
    return selectedIngredients.filter((id) => {
      const ing = SAMPLE_INGREDIENTS.find((i) => i.id === id);
      return ing?.category === categoryId;
    });
  };

  return (
    <Section
      className="relative pt-28 pb-20 min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(127,174,138,0.08) 0%, var(--bg-primary) 50%)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-dimare-gray hover:text-dimare-green dark:text-gray-400 dark:hover:text-dimare-green-light transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display text-sm">Volver al inicio</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-3">
            Diseñador de Bebidas
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Crea tu combinación perfecta en 4 sencillos pasos
          </p>
        </motion.div>

        {/* Preset Drinks */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-display text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
            Bebidas Populares
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {SAMPLE_DRINKS.filter((d) => d.popular).map((drink) => (
              <button
                key={drink.id}
                onClick={() => loadPreset(drink)}
                className="shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-dimare-green/30 transition-all shadow-sm"
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: drink.color }}
                />
                <div className="text-left">
                  <span className="block text-sm font-semibold text-[var(--text-heading)]">
                    {drink.name}
                  </span>
                  <span className="block text-xs text-[var(--text-muted)]">
                    ${drink.price} MXN
                  </span>
                </div>
                {drink.popular && (
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Collapsible Categories */}
          <div className="lg:col-span-3 space-y-3">
            {INGREDIENTS_CATEGORIES.map((category, idx) => {
              const CategoryIcon = CATEGORY_ICONS[category.id];
              const isExpanded = expandedCategory === category.id;
              const selectedInCategory = getSelectedByCategory(category.id);
              const categoryIngredients = SAMPLE_INGREDIENTS.filter(
                (i) => i.category === category.id
              );

              return (
                <motion.div
                  key={category.id}
                  className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  {/* Category Header */}
                  <button
                    onClick={() =>
                      setExpandedCategory(isExpanded ? null : category.id)
                    }
                    className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <CategoryIcon
                          className="w-5 h-5"
                          style={{ color: category.color }}
                        />
                      </div>
                      <div className="text-left">
                        <span className="block font-display font-semibold text-[var(--text-heading)]">
                          Paso {category.step}: {category.label}
                        </span>
                        <span className="block text-xs text-[var(--text-muted)]">
                          {category.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Selected badges when collapsed */}
                      {!isExpanded && selectedInCategory.length > 0 && (
                        <div className="flex -space-x-2">
                          {selectedInCategory.slice(0, 3).map((id) => {
                            const ing = SAMPLE_INGREDIENTS.find(
                              (i) => i.id === id
                            );
                            return (
                              <div
                                key={id}
                                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                                style={{ backgroundColor: ing?.color }}
                                title={ing?.name}
                              />
                            );
                          })}
                          {selectedInCategory.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-dimare-green text-white text-xs flex items-center justify-center border-2 border-white dark:border-gray-800">
                              +{selectedInCategory.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                      <ChevronDown
                        className={`w-5 h-5 text-dimare-gray transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Category Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                          {categoryIngredients.map((ingredient) => {
                            // Para bases usamos una lógica diferente
                            const isBase = category.id === "bases";
                            const isSelected = isBase
                              ? selectedBase === ingredient.id
                              : selectedIngredients.includes(ingredient.id);

                            return (
                              <button
                                key={ingredient.id}
                                onClick={() =>
                                  isBase
                                    ? selectBase(ingredient.id)
                                    : toggleIngredient(ingredient.id)
                                }
                                disabled={
                                  !isBase &&
                                  !isSelected &&
                                  selectedIngredients.length >= 5
                                }
                                className={`relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                                  isSelected
                                    ? "border-dimare-green bg-dimare-green/5 dark:bg-dimare-green/20"
                                    : !isBase && selectedIngredients.length >= 5
                                    ? "border-transparent bg-dimare-cream/30 dark:bg-white/5 opacity-50 cursor-not-allowed"
                                    : "border-transparent bg-dimare-cream/50 dark:bg-white/5 hover:border-dimare-green/30"
                                }`}
                              >
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{
                                    backgroundColor: `${ingredient.color}30`,
                                  }}
                                >
                                  <div
                                    className="w-6 h-6 rounded-full"
                                    style={{
                                      backgroundColor: ingredient.color,
                                    }}
                                  />
                                </div>
                                <div className="flex-1 text-left">
                                  <span className="block text-sm font-medium text-[var(--text-heading)]">
                                    {ingredient.name}
                                  </span>
                                  <span className="block text-xs text-[var(--text-muted)]">
                                    {ingredient.benefit}
                                  </span>
                                </div>
                                {isSelected && (
                                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-dimare-green flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                )}
                                {ingredient.price > 0 && (
                                  <span className="text-xs text-[var(--text-muted)]">
                                    +${ingredient.price}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Bottle Preview & Order */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              {/* Bottle Visualization */}
              <motion.div
                className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-color)] shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex justify-center mb-6">
                  <BottleVisualization
                    colors={bottleColors}
                    scale={SIZE_SCALES[selectedSize]}
                  />
                </div>

                {/* Selected Ingredients List */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold text-[var(--text-heading)]">
                      Tu Bebida
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        selectedIngredients.length >= 5
                          ? "bg-dimare-red/10 text-dimare-red"
                          : "bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                      }`}
                    >
                      {selectedIngredients.length}/5 ingredientes
                    </span>
                  </div>

                  {/* Mostrar base seleccionada primero */}
                  {selectedBase && (
                    <div className="mb-2 pb-2 border-b border-[var(--border-color)]">
                      <div className="flex items-center gap-2 text-sm">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: SAMPLE_INGREDIENTS.find(
                              (i) => i.id === selectedBase
                            )?.color,
                          }}
                        />
                        <span className="text-[var(--text-secondary)] font-medium">
                          {
                            SAMPLE_INGREDIENTS.find(
                              (i) => i.id === selectedBase
                            )?.name
                          }
                        </span>
                        <span className="text-xs text-dimare-green-light ml-auto">
                          Base
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedIngredients.length > 0 ? (
                    <div className="space-y-2 max-h-28 overflow-y-auto scrollbar-hide">
                      {selectedIngredients.map((id) => {
                        const ing = SAMPLE_INGREDIENTS.find((i) => i.id === id);
                        return (
                          <div
                            key={id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: ing?.color }}
                            />
                            <span className="text-[var(--text-secondary)] truncate">
                              {ing?.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--text-muted)] italic">
                      Selecciona ingredientes para comenzar
                    </p>
                  )}
                </div>

                {/* Size Selection */}
                <div className="mb-4">
                  <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Tamaño
                  </h4>
                  <div className="flex gap-2">
                    {DRINK_SIZES.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          selectedSize === size.id
                            ? "bg-dimare-green text-white"
                            : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-dimare-green/10"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between py-3 border-t border-[var(--border-color)]">
                  <span className="text-[var(--text-muted)]">Precio</span>
                  <span className="font-display text-2xl font-bold text-dimare-green-light">
                    ${totalPrice} MXN
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleOrder}
                    size="lg"
                    variant="primary"
                    className="flex-1 !bg-dimare-green hover:!bg-dimare-green-dark"
                    icon={<ShoppingCart className="w-5 h-5" />}
                    disabled={!selectedBase && selectedIngredients.length === 0}
                  >
                    Ordenar Bebida
                  </Button>
                  <Button
                    onClick={clearAll}
                    size="lg"
                    variant="outline"
                    className="flex-1 !border-dimare-green/30 !text-dimare-green dark:!text-dimare-green-light dark:!border-dimare-green-light/30 hover:!bg-dimare-green/10"
                    icon={<Trash2 className="w-5 h-5" />}
                    disabled={!selectedBase && selectedIngredients.length === 0}
                  >
                    Limpiar Todo
                  </Button>
                </div>
              </motion.div>

              {/* Benefits */}
              {benefits.length > 0 && (
                <motion.div
                  className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-color)] shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="font-display font-semibold text-[var(--text-heading)] mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Beneficios de tu Bebida
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {benefits.slice(0, 10).map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-dimare-green" />
                        <span className="text-[var(--text-secondary)]">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Componente de visualización de la botella
function BottleVisualization({ colors, scale = 1 }) {
  const gradientColors = colors.length > 0 ? colors : ["#E0E0E0"];
  // Limitar a máximo 6 colores para evitar overflow
  const displayColors = gradientColors.slice(0, 6);

  return (
    <motion.div
      className="relative"
      style={{
        width: `${10 * scale}rem`,
        height: `${20 * scale}rem`,
      }}
      animate={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Tapa de la botella */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-dimare-green-dark to-dimare-green rounded-t-lg z-10"
        style={{
          width: `${2.5 * scale}rem`,
          height: `${2 * scale}rem`,
        }}
      />

      {/* Cuello de la botella */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-t-sm"
        style={{
          top: `${1.5 * scale}rem`,
          width: `${3 * scale}rem`,
          height: `${2.5 * scale}rem`,
        }}
      >
        <div className="absolute inset-x-1 top-1 bottom-0 bg-gradient-to-b from-white/50 to-transparent rounded-t-sm" />
      </div>

      {/* Cuerpo de la botella */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-b-3xl overflow-hidden border border-gray-200 dark:border-gray-600"
        style={{
          top: `${3.75 * scale}rem`,
          width: `${9 * scale}rem`,
          height: `${15 * scale}rem`,
        }}
      >
        {/* Contenido líquido */}
        <div className="absolute bottom-0 left-0 right-0 h-[85%] overflow-hidden rounded-b-3xl">
          {displayColors.map((color, index) => {
            const height = 100 / displayColors.length;
            return (
              <motion.div
                key={`${color}-${index}`}
                className="absolute left-0 right-0"
                style={{
                  backgroundColor: color,
                  bottom: `${index * height}%`,
                  height: `${height}%`,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            );
          })}

          {/* Efecto de luz/brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/10" />

          {/* Burbujas */}
          {colors.length > 0 && (
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white/50 rounded-full shadow-sm"
                  style={{
                    width: `${0.5 * scale}rem`,
                    height: `${0.5 * scale}rem`,
                    left: `${15 + i * 13}%`,
                    bottom: "8%",
                  }}
                  animate={{
                    y: [-8, -100 * scale],
                    opacity: [0.7, 0],
                    scale: [1, 0.4],
                  }}
                  transition={{
                    duration: 3.5,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Reflejo del vidrio */}
        <div className="absolute top-0 left-2 w-4 h-full bg-gradient-to-b from-white/40 to-transparent rounded-full blur-sm" />
      </div>

      {/* Etiqueta decorativa */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-[var(--bg-card)] rounded-lg shadow-sm flex items-center justify-center border border-[var(--border-color)]"
        style={{
          bottom: `${5 * scale}rem`,
          width: `${6 * scale}rem`,
          height: `${3.5 * scale}rem`,
        }}
      >
        <div className="text-center">
          <span
            className="block text-[var(--text-muted)]"
            style={{ fontSize: `${0.5 * scale}rem` }}
          >
            Casa
          </span>
          <span
            className="block font-bold text-dimare-green-light"
            style={{ fontSize: `${0.85 * scale}rem` }}
          >
            DI' MARE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
