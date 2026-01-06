# DI’MARE — Requerimientos (Frontend 2)
## Aplicación: **app.dimare.mx**

> Propósito: plataforma completa para **clientes** (registro, pedidos, recompensas) y **administradores** (dashboard, gestión, contenido del blog con Puck.js).

---

## 1) Objetivos del producto
- Permitir a un usuario:
  - Registrarse / iniciar sesión
  - Diseñar bebidas (modo pedido real)
  - Realizar pedidos y ver historial
  - Recibir recompensas / ofertas personalizadas
- Permitir a un admin:
  - Gestionar ventas, pedidos, productos, ingredientes
  - Gestionar clientes / roles / permisos
  - Administrar contenido del blog usando **Puck.js**
  - Configurar recompensas y ofertas

---

## 2) Roles y permisos (mínimo)
### 2.1 Roles
- **Cliente**
  - Ver catálogo y su diseñador
  - Crear pedidos y ver historial propio
  - Ver recompensas propias
- **Admin**
  - Acceso a dashboard
  - CRUD de bebidas/ingredientes
  - CRUD de pedidos (cambios de estado)
  - Gestión de blog (Puck)
  - Gestión de promociones y reglas de rewards

### 2.2 Requerimientos de seguridad
- Route guards:
  - `PublicRoute` (login/register)
  - `ProtectedRoute` (cliente)
  - `AdminRoute` (admin)
- Permisos Appwrite:
  - Contenido público del blog: lectura pública en `dimare.mx`
  - Operaciones sensibles: solo roles/admin

---

## 3) Módulos de la app (MVP)
### 3.1 Autenticación
- Registro (email + password) / Login / Logout
- Recuperación de contraseña (si Appwrite lo habilita)
- Persistencia de sesión:
  - Appwrite session cookie
  - TanStack Query persist (localforage) para cache UI/queries

### 3.2 Catálogo
- Listado de bebidas
- Detalle de bebida
- “Recetas populares” / destacados (opcional)
- Filtros (tipo: verdes, rojos, aguas, etc.)
- Búsqueda

### 3.3 Diseñador de bebidas (Pedido real)
- Reglas:
  - Máximo **6 ingredientes**
  - Tamaños (ej. 350ml / 500ml / 600ml) configurables
  - Validaciones (compatibilidad, máximos por categoría)
- UI:
  - Visual de botella/capas
  - Resumen: ingredientes, tamaño, precio final, notas
- Flujo:
  - `app.dimare.mx/designer` permite:
    - Crear nuevo
    - Cargar payload desde `builderPayload` (cuando viene de dimare.mx)
- Carrito (si aplica) o pedido directo:
  - “Agregar al carrito” (opcional)
  - “Ordenar ahora” (MVP puede ser directo)

### 3.4 Pedidos
- Crear pedido:
  - Dirección / método de entrega *(si aplica)*
  - Fecha/hora (si hay agenda)
  - Notas (sin hielo / sin azúcar / etc.)
- Estados de pedido:
  - `draft` → `paid`/`confirmed` → `preparing` → `ready` → `delivered` / `cancelled`
- Historial de pedidos (cliente)
- Vista de detalle de pedido

### 3.5 Rewards / Recompensas
- Saldo/puntos por usuario
- Reglas:
  - Puntos por compra (ej. % del total)
  - Bonos por primera compra
  - Promos por temporada
- Canjes:
  - Descuento aplicado en pedido
  - Producto gratis (cupón)

### 3.6 Ofertas personalizadas
- Segmentación:
  - frecuencia de compra
  - ticket promedio
  - productos preferidos
- Entrega:
  - banners dentro de la app
  - cupones en checkout
  - notificaciones (opcional)

---

## 4) Módulos Admin (Backoffice)
### 4.1 Dashboard (ventas / pedidos)
- KPIs:
  - Ventas totales (día/semana/mes)
  - Pedidos por estado
  - Ticket promedio
  - Top bebidas/ingredientes
- Gráficas:
  - Recharts (líneas/ barras)
- Tablas:
  - Pedidos recientes
  - Clientes recientes (opcional)

### 4.2 Gestión de pedidos
- Lista de pedidos con filtros por estado/fecha
- Detalle + acciones:
  - Cambiar estado
  - Reembolsar/cancelar (si aplica)
  - Notas internas
- Exportación CSV (opcional)

### 4.3 Gestión de bebidas (productos)
- CRUD:
  - nombre, descripción, categoría
  - precio base
  - imagen
  - “activa” (enabled)
- “Recetas populares” (flag)
- Información informativa:
  - propiedades / beneficios (informativo)
  - disclaimers

### 4.4 Gestión de ingredientes
- CRUD:
  - nombre, tipo (base/verde/fruta/extra)
  - costo / impacto en precio
  - info nutrimental (si aplica)
  - alérgenos (si aplica)
  - enabled
- Reglas:
  - compatibilidades (opcional)
  - límites (máx. por categoría)

### 4.5 Gestión de clientes
- Lista y detalle
- Ver historial de pedidos
- Ajuste de roles (cliente/admin) *(solo superadmin si existiera)*

### 4.6 Blog con Puck.js (CMS interno)
- Editor visual con bloques (Puck)
- Entidades:
  - `posts` con `title`, `slug`, `content`, `excerpt`, `cover`, `tags`, `publishedAt`, `enabled`
- Funciones:
  - crear/editar/previsualizar
  - publicar/despublicar
  - versionado simple (opcional)
- Requisito clave:
  - El output debe ser consumible por **dimare.mx** como “blog público”

---

## 5) Modelo de datos (orientativo)
> Se implementa en Appwrite (DB + Storage) y permisos por rol.

### 5.1 Colecciones sugeridas
- `ingredients`
- `products` (bebidas predefinidas)
- `recipes` (opcional, para “populares”)
- `builder_presets` (opcional)
- `orders`
- `order_items` (o embebido en `orders`)
- `rewards_wallets`
- `rewards_rules`
- `coupons`
- `offers`
- `blog_posts`
- `blog_tags`

### 5.2 Storage
- `product_images`
- `blog_covers`
- (opcional) `ingredient_icons`

---

## 6) Navegación / Rutas (sugeridas)
### 6.1 Cliente
- `/login`
- `/register`
- `/catalog`
- `/products/:id`
- `/designer`
- `/orders`
- `/orders/:id`
- `/rewards`
- `/profile`

### 6.2 Admin
- `/admin`
- `/admin/orders`
- `/admin/orders/:id`
- `/admin/products`
- `/admin/ingredients`
- `/admin/customers`
- `/admin/rewards`
- `/admin/offers`
- `/admin/blog` (Puck)
- `/admin/blog/:id`

---

## 7) UX/UI y performance (crítico)
- UI moderna, ligera, con animaciones (Framer Motion) sin sacrificar FPS.
- Skeletons y estados de carga consistentes (React Query).
- Optimización:
  - code splitting por rutas
  - memoización de componentes pesados (builder)
  - persistencia de queries (tanstack query persist + localforage)
- Modo oscuro (react-theme-switch-animation).

---

## 8) Stack tecnológico (válido)
**Dependencias base**
- React 19, React Router DOM 7
- Appwrite SDK 14
- TanStack Query 5 + persist
- Framer Motion, lucide-react
- Tailwind 4, clsx, tailwind-merge
- date-fns + date-fns-tz
- recharts
- @use-gesture/react (gestos en el builder)

**Dev**
- Vite 6 + @vitejs/plugin-react
- Tailwind vite
- ESLint
- vite-plugin-pwa (recomendado para app)

**CMS**
- Puck.js (editor de blog)

---

## 9) Entregables
- App completa con módulos Cliente + Admin
- Guards de rutas + manejo de sesión Appwrite
- CRUDs principales (ingredientes, productos, pedidos, blog)
- Dashboard con métricas y gráficas
- Integración Puck (editor + render)
- Endpoints/clients listos para que dimare.mx consuma posts
