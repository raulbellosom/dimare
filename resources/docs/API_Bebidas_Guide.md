# Guía de API - Sistema de Bebidas Casa DI' MARE

Esta guía describe la estructura y endpoints necesarios para el sistema de bebidas personalizadas de Casa DI' MARE.

## Índice

1. [Autenticación](#autenticación)
2. [Endpoints de Productos](#endpoints-de-productos)
3. [Endpoints de Ingredientes](#endpoints-de-ingredientes)
4. [Endpoints de Bebidas](#endpoints-de-bebidas)
5. [Endpoints de Órdenes](#endpoints-de-órdenes)
6. [Modelos de Datos](#modelos-de-datos)
7. [Códigos de Error](#códigos-de-error)

---

## Autenticación

Todos los endpoints protegidos requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

### Endpoints públicos (sin autenticación)

- Listar productos
- Listar ingredientes
- Listar bebidas populares
- Listar tamaños
- Listar beneficios

### Endpoints protegidos (requieren autenticación)

- Crear orden
- Historial de órdenes
- Perfil de usuario

---

## Endpoints de Productos

### Listar todos los productos

```http
GET /api/v1/productos
```

**Query Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `page` | number | Número de página (default: 1) |
| `limit` | number | Items por página (default: 20) |
| `category` | string | Filtrar por categoría |
| `popular` | boolean | Solo productos populares |

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "verde-detox",
        "name": "Verde Detox",
        "description": "Una explosión de verduras frescas para revitalizar tu día",
        "ingredients": [
          "agua-natural",
          "espinaca",
          "pepino",
          "apio",
          "limon",
          "jengibre"
        ],
        "color": "#2E7D32",
        "price": 85,
        "popular": true,
        "image_url": "https://cdn.dimare.mx/productos/verde-detox.jpg",
        "benefits": ["Desintoxicante", "Hidratación", "Vitamina C"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

### Obtener producto por ID

```http
GET /api/v1/productos/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "verde-detox",
    "name": "Verde Detox",
    "description": "Una explosión de verduras frescas para revitalizar tu día",
    "ingredients": [
      {
        "id": "agua-natural",
        "name": "Agua Natural",
        "color": "#4FC3F7"
      }
    ],
    "color": "#2E7D32",
    "price": 85,
    "popular": true,
    "nutritional_info": {
      "calories": 45,
      "carbs": 10,
      "protein": 2,
      "fiber": 3
    },
    "benefits": ["Desintoxicante", "Hidratación", "Vitamina C"]
  }
}
```

---

## Endpoints de Ingredientes

### Listar todos los ingredientes

```http
GET /api/v1/ingredientes
```

**Query Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `category` | string | Filtrar por categoría: `bases`, `verdes`, `frutas`, `extras` |

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "agua-natural",
      "name": "Agua Natural",
      "category": "bases",
      "benefit": "Hidratación pura",
      "color": "#4FC3F7",
      "price": 0,
      "is_base": true,
      "available": true
    },
    {
      "id": "agua-coco",
      "name": "Agua de Coco",
      "category": "bases",
      "benefit": "Electrolitos naturales",
      "color": "#F5F5DC",
      "price": 15,
      "is_base": true,
      "available": true
    },
    {
      "id": "naranja",
      "name": "Naranja",
      "category": "frutas",
      "benefit": "Vitamina C",
      "color": "#F5A623",
      "price": 10,
      "is_base": false,
      "available": true
    }
  ]
}
```

### Listar categorías de ingredientes

```http
GET /api/v1/ingredientes/categorias
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "bases",
      "label": "Base",
      "description": "Elige la base de tu bebida",
      "color": "#4FC3F7",
      "step": 1,
      "icon": "droplets"
    },
    {
      "id": "verdes",
      "label": "Verdes",
      "description": "Añade hojas y vegetales verdes",
      "color": "#2E7D32",
      "step": 2,
      "icon": "leaf"
    },
    {
      "id": "frutas",
      "label": "Frutas",
      "description": "Selecciona tus frutas favoritas",
      "color": "#F5A623",
      "step": 3,
      "icon": "apple"
    },
    {
      "id": "extras",
      "label": "Extras",
      "description": "Complementa con extras saludables",
      "color": "#8E44AD",
      "step": 4,
      "icon": "sparkles"
    }
  ]
}
```

### Obtener beneficios de ingredientes

```http
GET /api/v1/ingredientes/beneficios
```

**Response:**

```json
{
  "success": true,
  "data": {
    "agua-natural": ["Hidratación"],
    "agua-coco": ["Electrolitos", "Hidratación"],
    "leche-almendras": ["Proteína vegetal", "Calcio"],
    "naranja": ["Vitamina C", "Refuerza el sistema inmune"],
    "espinaca": ["Hierro", "Vitamina K"],
    "jengibre": ["Digestión", "Antiinflamatorio"]
  }
}
```

---

## Endpoints de Bebidas

### Listar bebidas populares

```http
GET /api/v1/bebidas/populares
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "verde-detox",
      "name": "Verde Detox",
      "description": "Una explosión de verduras frescas para revitalizar tu día",
      "ingredients": [
        "agua-natural",
        "espinaca",
        "pepino",
        "apio",
        "limon",
        "jengibre"
      ],
      "color": "#2E7D32",
      "price": 85,
      "rating": 4.8,
      "reviews_count": 234
    }
  ]
}
```

### Listar tamaños disponibles

```http
GET /api/v1/bebidas/tamanos
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "350ml",
      "label": "350ml",
      "price": 0,
      "description": "Tamaño personal"
    },
    {
      "id": "500ml",
      "label": "500ml",
      "price": 15,
      "description": "Tamaño regular"
    },
    {
      "id": "750ml",
      "label": "750ml",
      "price": 30,
      "description": "Tamaño grande"
    }
  ]
}
```

### Calcular precio de bebida personalizada

```http
POST /api/v1/bebidas/calcular-precio
```

**Request Body:**

```json
{
  "base": "agua-coco",
  "ingredients": ["espinaca", "naranja", "jengibre"],
  "size": "500ml"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "base_price": 45,
    "base_cost": 15,
    "ingredients_cost": 28,
    "size_cost": 15,
    "total": 103,
    "breakdown": {
      "agua-coco": 15,
      "espinaca": 8,
      "naranja": 10,
      "jengibre": 8,
      "size_500ml": 15
    },
    "benefits": [
      "Electrolitos",
      "Hidratación",
      "Hierro",
      "Vitamina C",
      "Digestión",
      "Antiinflamatorio"
    ]
  }
}
```

---

## Endpoints de Órdenes

### Crear nueva orden

```http
POST /api/v1/ordenes
```

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "items": [
    {
      "type": "custom",
      "base": "agua-coco",
      "ingredients": ["espinaca", "naranja", "jengibre"],
      "size": "500ml",
      "quantity": 1,
      "notes": "Sin hielo"
    },
    {
      "type": "preset",
      "product_id": "verde-detox",
      "size": "350ml",
      "quantity": 2
    }
  ],
  "delivery": {
    "type": "pickup",
    "store_id": "cdmx-roma",
    "scheduled_time": "2026-01-06T14:30:00Z"
  },
  "payment": {
    "method": "card",
    "card_token": "tok_visa_1234"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "order_id": "ORD-2026-001234",
    "status": "confirmed",
    "items": [
      {
        "id": "item-001",
        "type": "custom",
        "name": "Bebida Personalizada",
        "base": {
          "id": "agua-coco",
          "name": "Agua de Coco"
        },
        "ingredients": [
          { "id": "espinaca", "name": "Espinaca" },
          { "id": "naranja", "name": "Naranja" },
          { "id": "jengibre", "name": "Jengibre" }
        ],
        "size": "500ml",
        "quantity": 1,
        "unit_price": 103,
        "total": 103
      }
    ],
    "subtotal": 273,
    "tax": 43.68,
    "total": 316.68,
    "delivery": {
      "type": "pickup",
      "store": {
        "id": "cdmx-roma",
        "name": "Casa DI' MARE Roma",
        "address": "Av. Álvaro Obregón 123, Roma Norte, CDMX"
      },
      "scheduled_time": "2026-01-06T14:30:00Z",
      "estimated_ready": "2026-01-06T14:30:00Z"
    },
    "payment": {
      "method": "card",
      "status": "paid",
      "transaction_id": "txn_abc123"
    },
    "created_at": "2026-01-06T12:00:00Z"
  }
}
```

### Obtener estado de orden

```http
GET /api/v1/ordenes/:orderId
```

**Response:**

```json
{
  "success": true,
  "data": {
    "order_id": "ORD-2026-001234",
    "status": "preparing",
    "status_history": [
      { "status": "confirmed", "timestamp": "2026-01-06T12:00:00Z" },
      { "status": "preparing", "timestamp": "2026-01-06T14:20:00Z" }
    ],
    "estimated_ready": "2026-01-06T14:30:00Z"
  }
}
```

### Historial de órdenes del usuario

```http
GET /api/v1/ordenes/historial
```

**Query Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `page` | number | Número de página |
| `limit` | number | Items por página |
| `status` | string | Filtrar por estado |

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "order_id": "ORD-2026-001234",
        "status": "completed",
        "total": 316.68,
        "items_count": 3,
        "created_at": "2026-01-06T12:00:00Z",
        "completed_at": "2026-01-06T14:35:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

---

## Modelos de Datos

### Ingrediente

```typescript
interface Ingredient {
  id: string; // Identificador único (slug)
  name: string; // Nombre del ingrediente
  category: "bases" | "verdes" | "frutas" | "extras";
  benefit: string; // Beneficio principal
  color: string; // Color hex para visualización
  price: number; // Precio adicional en MXN
  is_base: boolean; // Si es un ingrediente base
  available: boolean; // Disponibilidad actual
  emoji?: string; // Emoji representativo
  nutritional_info?: {
    calories: number;
    carbs: number;
    protein: number;
    fiber: number;
  };
}
```

### Bebida/Producto

```typescript
interface Drink {
  id: string;
  name: string;
  description: string;
  ingredients: string[]; // Array de IDs de ingredientes
  color: string; // Color principal para UI
  price: number; // Precio base en MXN
  popular: boolean;
  rating?: number;
  reviews_count?: number;
  image_url?: string;
  benefits: string[];
}
```

### Orden

```typescript
interface Order {
  order_id: string;
  user_id: string;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "completed"
    | "cancelled";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  id: string;
  type: "custom" | "preset";
  product_id?: string; // Si es preset
  base?: string; // Si es custom
  ingredients?: string[]; // Si es custom
  size: string;
  quantity: number;
  unit_price: number;
  total: number;
  notes?: string;
}
```

### Tamaño

```typescript
interface DrinkSize {
  id: string; // '350ml', '500ml', '750ml'
  label: string; // Etiqueta para mostrar
  price: number; // Costo adicional
  description: string;
}
```

---

## Códigos de Error

### Estructura de Error

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INGREDIENTS",
    "message": "Uno o más ingredientes no están disponibles",
    "details": {
      "unavailable": ["spirulina", "colageno"]
    }
  }
}
```

### Códigos Comunes

| Código                | HTTP Status | Descripción                             |
| --------------------- | ----------- | --------------------------------------- |
| `AUTH_REQUIRED`       | 401         | Se requiere autenticación               |
| `AUTH_INVALID`        | 401         | Token inválido o expirado               |
| `FORBIDDEN`           | 403         | Sin permisos para esta acción           |
| `NOT_FOUND`           | 404         | Recurso no encontrado                   |
| `INVALID_INGREDIENTS` | 400         | Ingredientes inválidos o no disponibles |
| `MAX_INGREDIENTS`     | 400         | Excede el límite de 5 ingredientes      |
| `INVALID_SIZE`        | 400         | Tamaño no válido                        |
| `INVALID_BASE`        | 400         | Base no válida o no seleccionada        |
| `STORE_CLOSED`        | 400         | La tienda está cerrada                  |
| `PAYMENT_FAILED`      | 402         | Error en el pago                        |
| `ORDER_NOT_FOUND`     | 404         | Orden no encontrada                     |
| `SERVER_ERROR`        | 500         | Error interno del servidor              |

---

## Flujo de Integración: Ordenar Bebida desde Marketing

### 1. URL de Redirección

Desde la página de marketing, el usuario es redirigido a la app con los parámetros de la bebida:

```
https://app.dimare.mx/order?base=agua-coco&ingredients=espinaca,naranja,jengibre&size=500ml
```

### 2. Flujo en la App

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Marketing     │────▶│   App Login     │────▶│  Confirmación   │
│   /disenador    │     │   /login        │     │  de Orden       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
   Diseñar bebida         Autenticar            Procesar pago
   Seleccionar tamaño     usuario              Confirmar orden
   Click "Ordenar"        Redirigir a /order   Mostrar tracking
```

### 3. Ejemplo de Implementación (React)

```jsx
// En la app, capturar los parámetros de la URL
import { useSearchParams } from "react-router-dom";

function OrderPage() {
  const [searchParams] = useSearchParams();

  const base = searchParams.get("base");
  const ingredients = searchParams.get("ingredients")?.split(",") || [];
  const size = searchParams.get("size") || "500ml";

  // Cargar la bebida preconfigurada
  useEffect(() => {
    if (base || ingredients.length > 0) {
      loadBeverageFromParams({ base, ingredients, size });
    }
  }, [base, ingredients, size]);

  const handleOrder = async () => {
    const response = await fetch("/api/v1/ordenes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            type: "custom",
            base,
            ingredients,
            size,
            quantity: 1,
          },
        ],
        delivery: { type: "pickup", store_id: selectedStore },
        payment: { method: "card", card_token: cardToken },
      }),
    });

    const data = await response.json();
    // Manejar respuesta...
  };
}
```

---

## Variables de Entorno

```env
# API Base URL
VITE_API_URL=https://api.dimare.mx

# App URL para redirección desde marketing
VITE_APP_URL=https://app.dimare.mx

# Stripe/Pago
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx

# Feature Flags
VITE_ENABLE_DELIVERY=true
VITE_ENABLE_CUSTOM_DRINKS=true
```

---

## Notas de Implementación

### Caché y Rendimiento

- Los ingredientes y categorías pueden cachearse por 1 hora
- Las bebidas populares pueden cachearse por 15 minutos
- Los precios deben calcularse en tiempo real

### Validaciones del Backend

1. **Base obligatoria**: Toda bebida personalizada debe tener una base
2. **Máximo 5 ingredientes**: Sin contar la base
3. **Disponibilidad**: Verificar que todos los ingredientes estén disponibles
4. **Horarios**: Validar horarios de tiendas para pickup/delivery

### Webhooks (Opcional)

Para integración con sistemas externos:

```http
POST /api/v1/webhooks/order-status
```

Eventos:

- `order.created`
- `order.confirmed`
- `order.preparing`
- `order.ready`
- `order.completed`
- `order.cancelled`

---

## Contacto

Para dudas sobre la API:

- **Email**: dev@dimare.mx
- **Documentación**: https://docs.dimare.mx/api
