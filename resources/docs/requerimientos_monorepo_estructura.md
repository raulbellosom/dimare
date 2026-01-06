# DI’MARE — Requerimientos iniciales (Monorepo + Estructura de carpetas)

## 1) Decisión de arquitectura: 2 frontends en 1 solo repositorio (Monorepo)

**Objetivo:** mantener **dimare.mx** (marketing) y **app.dimare.mx** (aplicación) en un mismo repo para:
- Reusar componentes UI, hooks, utilidades y clientes (Appwrite, fetchers, helpers).
- Mantener **consistencia visual** (tokens, tipografías, colores, animaciones).
- Evitar duplicidad (mismos botones, cards, layouts, loaders, validaciones, etc).
- Desplegar cada app de forma independiente, sin perder coherencia.

---

## 2) Estructura del repositorio (alto nivel)

```
dimare/
  apps/
    marketing/     # dimare.mx (informativo + blog público + builder demo)
    webapp/        # app.dimare.mx (auth + pedidos + admin + blog CMS con Puck)
  packages/
    ui/            # UI kit compartido (Button, Card, Modal, etc.)
    lib/           # clientes y utilidades de infraestructura (appwrite, http, env)
    shared/        # piezas compartidas “de dominio” (blog models, builders, types)
```

> Nota: Esta estructura se basa en un enfoque **“feature-based / modular”** (similar a “Feature-Sliced Design / Bulletproof React”), no MVC clásico.  
> En frontend moderno, “MVC” se reemplaza por: **app (bootstrap) + pages + features + entities + shared**.

---

## 3) Reglas de oro (para evitar repetición y caos)

### 3.1 Dónde va cada cosa
- **`packages/ui`**: componentes UI genéricos, sin reglas de negocio:
  - Button, Card, Badge, Tabs, Modal, Tooltip, Skeleton, EmptyState, Table primitives
  - Animaciones base (motion wrappers) reutilizables
  - Estilos y tokens
- **`packages/lib`**: infraestructura compartida:
  - Cliente Appwrite (singleton), configuración env, http client, helpers de fechas, storage, persistencia
  - “SDK interno”: `getAppwrite()`, `queryClient`, `persister`, `logger`, `featureFlags`
- **`packages/shared`**: piezas compartidas que sí dependen del “dominio DI’MARE”:
  - Tipos/Modelos: `BlogPost`, `Ingredient`, `Product`, `Order`, `Reward`
  - Validaciones (schemas), constantes de negocio, helpers del builder (cálculo precio)
  - Componentes **de dominio** reutilizables (ej. `DrinkBuilder`, `IngredientPicker`)
  - NO meter aquí UI genérica; eso va en `packages/ui`.

### 3.2 En cada app (`apps/*/src`)
- **`src/app`**: bootstrap y composición global:
  - router, providers (Query, Theme), layouts raíz, guards, inicialización PWA
- **`src/pages`**: páginas como “rutas” (no contienen lógica pesada):
  - importan y componen features/widgets
- **`src/features`**: casos de uso / funcionalidades:
  - auth, blog reader, builder demo, checkout, rewards, admin dashboard
  - cada feature contiene: UI específica + hooks específicos + services específicos del feature
- **`src/entities`** *(opcional recomendado en webapp)*: entidades del negocio:
  - `order`, `product`, `ingredient`, `blogPost`, `user`, `reward`
  - helpers y componentes cercanos a la entidad (ej. `OrderStatusBadge`)
- **`src/widgets`** *(opcional)*: bloques UI grandes y reusables a nivel página:
  - `Header`, `Footer`, `Sidebar`, `Topbar`, `BlogHero`, `ProductGrid`
- **`src/shared`**: utilidades compartidas dentro de esa app (solo si no aplica mover a packages)
  - si algo se usa en ambas apps, **subirlo a packages**.

### 3.3 Evitar carpetas duplicadas
- **No duplicar** `hooks/`, `services/`, `utils/` por todos lados sin control.
- Regla:
  - Si es **genérico** → `packages/ui` o `packages/lib`
  - Si es **de dominio DI’MARE** → `packages/shared`
  - Si es **solo de una app** → `apps/<app>/src/features/<feature>/...`

---

## 4) Propuesta de estructura detallada (recomendada)

### 4.1 `packages/ui` (UI kit)
```
packages/ui/
  src/
    components/
      button/
      card/
      modal/
      tabs/
      table/
      form/
      skeleton/
      empty-state/
    motion/
      FadeIn.tsx
      PageTransition.tsx
    theme/
      tokens.css
      tailwind.preset.ts
    utils/
      cn.ts
  package.json
  README.md
```

### 4.2 `packages/lib` (infra)
```
packages/lib/
  src/
    appwrite/
      client.ts        # getAppwrite()
      auth.ts          # helpers: getSession, login, logout
      db.ts            # helpers: listDocuments, createDocument...
      storage.ts
    query/
      queryClient.ts
      persister.ts     # localforage
    env/
      env.ts           # validate env vars
    http/
      fetcher.ts       # wrapper fetch/axios-like (si aplica)
    utils/
      dates.ts         # date-fns / tz
      format.ts
  package.json
  README.md
```

### 4.3 `packages/shared` (dominio DI’MARE)
```
packages/shared/
  src/
    domain/
      ingredients/
        types.ts
        pricing.ts
        nutrition.ts
      products/
        types.ts
      orders/
        types.ts
        status.ts
      rewards/
        types.ts
        rules.ts
      blog/
        types.ts
        slug.ts
    components/
      drink-builder/
        DrinkBuilder.tsx
        useDrinkBuilder.ts
        serializer.ts      # builderPayload encode/decode
  package.json
  README.md
```

---

## 5) Estructura por app

### 5.1 `apps/marketing` (dimare.mx)
**Enfoque:** SEO/marketing + blog público + builder demo (sin cuenta).

```
apps/marketing/
  src/
    app/
      router.tsx
      providers.tsx
      layouts/
        MarketingLayout.tsx
    pages/
      Home/
      Products/
      ProductDetail/
      Benefits/
      Blog/
      BlogPost/
      About/
      Contact/
      Legal/
      DesignerDemo/
    features/
      blog/
        api.ts            # usa packages/lib appwrite o fetcher
        hooks.ts
        components/
          BlogCard.tsx
      designer-demo/
        components/
          DemoBuilder.tsx
          OrderCTA.tsx
        serializer.ts     # builderPayload (usa packages/shared)
    widgets/
      Navbar/
      Footer/
      Hero/
    shared/
      seo/
        meta.ts
        jsonld.ts
  public/
  vite.config.ts
  package.json
```

**Requerimiento clave de flujo**
- En `DesignerDemo`, el botón **Ordenar** debe redirigir a:
  - `app.dimare.mx/login?redirect=/designer&builderPayload=...` si no hay sesión
  - `app.dimare.mx/designer?builderPayload=...` si hay sesión *(opcional: verificar con Appwrite)*

---

### 5.2 `apps/webapp` (app.dimare.mx)
**Enfoque:** aplicación con auth, pedidos, rewards, admin, blog CMS con Puck.js.

```
apps/webapp/
  src/
    app/
      router.tsx
      providers.tsx
      layouts/
        AppLayout.tsx
        AuthLayout.tsx
        AdminLayout.tsx
      guards/
        ProtectedRoute.tsx
        AdminRoute.tsx
    pages/
      Auth/
        Login/
        Register/
      Catalog/
      ProductDetail/
      Designer/
      Orders/
      OrderDetail/
      Rewards/
      Profile/
      Admin/
        Dashboard/
        Orders/
        Products/
        Ingredients/
        Customers/
        Rewards/
        Offers/
        Blog/
    features/
      auth/
        api.ts
        hooks.ts
        components/
      catalog/
      designer/
        components/
        DrinkDesigner.tsx     # usa packages/shared DrinkBuilder
        serializer.ts         # builderPayload decode para prefill
      orders/
      rewards/
      offers/
      admin-dashboard/
      blog-cms/               # Puck.js
        puck/
          config.ts
          blocks/
        api.ts
        components/
          PostEditor.tsx
          PostList.tsx
    entities/                 # recomendado para mantener orden en webapp
      product/
      ingredient/
      order/
      blogPost/
      reward/
    widgets/
      Sidebar/
      Topbar/
      Notifications/
    shared/
      permissions/
        roles.ts
  public/
  vite.config.ts
  package.json
```

---

## 6) Convenciones para el “Agente de IA” (y para el equipo)

### 6.1 Naming y límites
- Componentes **UI genéricos**: `packages/ui/src/components/*`
- Componentes **de dominio** (DI’MARE): `packages/shared/src/components/*`
- Feature específica: `apps/<app>/src/features/<feature>/components/*`
- Páginas deben ser “delgadas”: componen features/widgets y orquestan.

### 6.2 Imports (dirección permitida)
- ✅ `apps/*` puede importar desde `packages/*`
- ✅ `features/*` puede importar `entities/*` y `shared/*`
- ❌ `packages/ui` **no** importa desde apps ni desde dominio
- ❌ `packages/lib` no debe depender de UI

### 6.3 Services / API
- Cliente Appwrite y helpers de query en `packages/lib`
- Endpoints del blog y colecciones:
  - Definiciones de modelos/tipos en `packages/shared`
  - Implementación “api.ts” por feature en cada app

---

## 7) Checklist de calidad (desde el día 1)
- SEO (marketing): metas, OG, JSON-LD, sitemap, performance budgets
- Performance: code splitting, lazy images, cache, persistencia de queries
- Accesibilidad: keyboard, focus, AA contrast, reduced motion
- Consistencia visual: tokens + componentes de `packages/ui`

---

## 8) Entregable de este documento
Este documento establece:
1) Monorepo obligatorio (2 apps + packages compartidos)  
2) Estructura modular “feature-based” (no repetitiva)  
3) Reglas de colocación de componentes para que el agente de IA ubique el código correctamente  
