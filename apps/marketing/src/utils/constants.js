// Brand constants for Casa DI'MARE

export const BRAND = {
  name: "Casa DI' MARE",
  nameLine1: "Casa",
  nameLine2: "DI' MARE",
  slogan: "Naturalidad para ti",
  description: "Bebidas naturales artesanales, hechas en casa",
  phrase: "Casa DI' MARE desea que con cada sorbo regreses a lo natural.",
  website: "https://dimare.mx",
  app: "https://app.dimare.mx",
};

export const COLORS = {
  green: "#2E6B3F",
  greenLight: "#7FAE8A",
  greenDark: "#1D4A2B",
  red: "#8C2D2D",
  redLight: "#B84545",
  gray: "#5E6B63",
  cream: "#F6F2EA",
  creamDark: "#EDE7DB",
};

// Navegación reordenada: Diseña tu Bebida es el segundo elemento
export const NAVIGATION = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "disenador", label: "Diseña tu Bebida", href: "/disenador" },
  { id: "productos", label: "Productos", href: "/productos" },
  { id: "beneficios", label: "Beneficios", href: "/beneficios" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "nosotros", label: "Nosotros", href: "/nosotros" },
];

export const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/casadimare",
    icon: "Instagram",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/casadimare",
    icon: "Facebook",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/+521234567890",
    icon: "MessageCircle",
  },
];

export const FEATURES = [
  {
    id: "natural",
    title: "100% Natural",
    description:
      "Sin conservadores, sin azúcares añadidos. Solo ingredientes frescos y naturales.",
    icon: "Leaf",
  },
  {
    id: "artesanal",
    title: "Artesanal",
    description:
      "Cada bebida es preparada con cuidado, como lo harías en casa.",
    icon: "Heart",
  },
  {
    id: "fresco",
    title: "Fresco Diario",
    description:
      "Preparamos nuestras bebidas cada día para garantizar máxima frescura.",
    icon: "Sparkles",
  },
  {
    id: "personalizado",
    title: "Personalizado",
    description: "Crea tu propia combinación con nuestro diseñador de bebidas.",
    icon: "Palette",
  },
];

export const INGREDIENTS_CATEGORIES = [
  {
    id: "bases",
    label: "Base",
    icon: "Droplets",
    description: "Elige la base de tu bebida",
    color: "#4FC3F7",
    step: 1,
  },
  {
    id: "verdes",
    label: "Verdes",
    icon: "Leaf",
    description: "Añade hojas y vegetales verdes",
    color: "#2E7D32",
    step: 2,
  },
  {
    id: "frutas",
    label: "Frutas",
    icon: "Apple",
    description: "Selecciona tus frutas favoritas",
    color: "#F5A623",
    step: 3,
  },
  {
    id: "extras",
    label: "Extras",
    icon: "Sparkles",
    description: "Complementa con extras saludables",
    color: "#8E44AD",
    step: 4,
  },
];

export const SAMPLE_INGREDIENTS = [
  // Bases
  {
    id: "agua-natural",
    name: "Agua Natural",
    category: "bases",
    benefit: "Hidratación pura",
    color: "#4FC3F7",
    price: 0,
  },
  {
    id: "agua-coco",
    name: "Agua de Coco",
    category: "bases",
    benefit: "Electrolitos naturales",
    color: "#F5F5DC",
    price: 15,
  },
  {
    id: "leche-almendras",
    name: "Leche de Almendras",
    category: "bases",
    benefit: "Proteína vegetal",
    color: "#FFF8E7",
    price: 20,
  },

  // Frutas
  {
    id: "naranja",
    name: "Naranja",
    category: "frutas",
    benefit: "Vitamina C",
    color: "#F5A623",
    price: 10,
  },
  {
    id: "piña",
    name: "Piña",
    category: "frutas",
    benefit: "Digestión",
    color: "#F4D03F",
    price: 12,
  },
  {
    id: "mango",
    name: "Mango",
    category: "frutas",
    benefit: "Vitamina A",
    color: "#FF9800",
    price: 15,
  },
  {
    id: "fresa",
    name: "Fresa",
    category: "frutas",
    benefit: "Antioxidantes",
    color: "#E74C3C",
    price: 15,
  },
  {
    id: "sandia",
    name: "Sandía",
    category: "frutas",
    benefit: "Hidratación",
    color: "#FF6B6B",
    price: 10,
  },
  {
    id: "papaya",
    name: "Papaya",
    category: "frutas",
    benefit: "Digestión",
    color: "#FFAB40",
    price: 12,
  },
  {
    id: "limon",
    name: "Limón",
    category: "frutas",
    benefit: "Desintoxicante",
    color: "#F7DC6F",
    price: 5,
  },
  {
    id: "toronja",
    name: "Toronja",
    category: "frutas",
    benefit: "Metabolismo",
    color: "#FF7043",
    price: 10,
  },

  // Verdes
  {
    id: "espinaca",
    name: "Espinaca",
    category: "verdes",
    benefit: "Hierro",
    color: "#2E7D32",
    price: 8,
  },
  {
    id: "apio",
    name: "Apio",
    category: "verdes",
    benefit: "Hidratación",
    color: "#A8D5BA",
    price: 5,
  },
  {
    id: "pepino",
    name: "Pepino",
    category: "verdes",
    benefit: "Hidratación",
    color: "#27AE60",
    price: 5,
  },
  {
    id: "nopal",
    name: "Nopal",
    category: "verdes",
    benefit: "Fibra",
    color: "#4CAF50",
    price: 8,
  },
  {
    id: "kale",
    name: "Kale",
    category: "verdes",
    benefit: "Vitamina K",
    color: "#1B5E20",
    price: 10,
  },
  {
    id: "perejil",
    name: "Perejil",
    category: "verdes",
    benefit: "Detox",
    color: "#43A047",
    price: 5,
  },
  {
    id: "zanahoria",
    name: "Zanahoria",
    category: "verdes",
    benefit: "Betacarotenos",
    color: "#E67E22",
    price: 5,
  },
  {
    id: "betabel",
    name: "Betabel",
    category: "verdes",
    benefit: "Antioxidantes",
    color: "#880E4F",
    price: 8,
  },
  {
    id: "curcuma",
    name: "Cúrcuma",
    category: "verdes",
    benefit: "Antiinflamatorio",
    color: "#FF8F00",
    price: 10,
  },

  // Extras
  {
    id: "jengibre",
    name: "Jengibre",
    category: "extras",
    benefit: "Digestión",
    color: "#D4A574",
    price: 8,
  },
  {
    id: "chia",
    name: "Chía",
    category: "extras",
    benefit: "Omega 3",
    color: "#5D4037",
    price: 10,
  },
  {
    id: "miel",
    name: "Miel de Abeja",
    category: "extras",
    benefit: "Energía natural",
    color: "#FFC107",
    price: 10,
  },
  {
    id: "linaza",
    name: "Linaza",
    category: "extras",
    benefit: "Fibra",
    color: "#8D6E63",
    price: 8,
  },
  {
    id: "spirulina",
    name: "Spirulina",
    category: "extras",
    benefit: "Proteína",
    color: "#004D40",
    price: 15,
  },
  {
    id: "colageno",
    name: "Colágeno",
    category: "extras",
    benefit: "Piel y articulaciones",
    color: "#FFCCBC",
    price: 20,
  },
];

export const SAMPLE_DRINKS = [
  {
    id: "verde-detox",
    name: "Verde Detox",
    description: "Una explosión de verduras frescas para revitalizar tu día",
    ingredients: [
      "agua-natural",
      "espinaca",
      "pepino",
      "apio",
      "limon",
      "jengibre",
    ],
    color: "#2E7D32",
    price: 85,
    popular: true,
  },
  {
    id: "tropical-sunrise",
    name: "Tropical Sunrise",
    description: "El sabor del trópico en cada sorbo",
    ingredients: ["agua-coco", "kale", "naranja", "piña", "mango"],
    color: "#FF9800",
    price: 95,
    popular: true,
  },
  {
    id: "rojo-poder",
    name: "Rojo Poder",
    description: "Betabel y frutos rojos para un boost de energía natural",
    ingredients: [
      "agua-natural",
      "betabel",
      "zanahoria",
      "fresa",
      "naranja",
      "jengibre",
    ],
    color: "#880E4F",
    price: 90,
    popular: false,
  },
  {
    id: "refrescante-citrico",
    name: "Refrescante Cítrico",
    description: "Cítricos frescos para mantenerte hidratado",
    ingredients: [
      "agua-natural",
      "pepino",
      "naranja",
      "toronja",
      "limon",
      "miel",
    ],
    color: "#F5A623",
    price: 75,
    popular: true,
  },
];

// Beneficios posibles de los ingredientes
export const INGREDIENT_BENEFITS = {
  "agua-natural": ["Hidratación"],
  "agua-coco": ["Electrolitos", "Hidratación"],
  "leche-almendras": ["Proteína vegetal", "Calcio"],
  naranja: ["Vitamina C", "Refuerza el sistema inmune"],
  piña: ["Digestión", "Bromelina"],
  mango: ["Vitamina A", "Antioxidantes"],
  fresa: ["Antioxidantes", "Vitamina C"],
  sandia: ["Hidratación", "Licopeno"],
  papaya: ["Digestión", "Papaína"],
  limon: ["Desintoxicante", "Vitamina C"],
  toronja: ["Metabolismo", "Vitamina C"],
  espinaca: ["Hierro", "Vitamina K"],
  apio: ["Hidratación", "Fibra"],
  pepino: ["Hidratación", "Refrescante"],
  nopal: ["Fibra", "Control de azúcar"],
  kale: ["Vitamina K", "Antioxidantes"],
  perejil: ["Detox", "Vitamina K"],
  zanahoria: ["Betacarotenos", "Vitamina A"],
  betabel: ["Antioxidantes", "Mejora el flujo sanguíneo"],
  curcuma: ["Antiinflamatorio", "Curcumina"],
  jengibre: ["Digestión", "Antiinflamatorio"],
  chia: ["Omega 3", "Fibra"],
  miel: ["Energía natural", "Antibacterial"],
  linaza: ["Fibra", "Omega 3"],
  spirulina: ["Proteína", "Hierro"],
  colageno: ["Piel", "Articulaciones"],
};

// Tamaños disponibles
export const DRINK_SIZES = [
  { id: "350ml", label: "350ml", price: 0 },
  { id: "500ml", label: "500ml", price: 15 },
  { id: "750ml", label: "750ml", price: 30 },
];

// Precio base de la bebida
export const BASE_PRICE = 45;
