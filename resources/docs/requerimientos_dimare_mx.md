# DI’MARE — Requerimientos (Frontend 1)
## Sitio marketing: **dimare.mx**

> Propósito: aplicación **meramente informativa** (SEO/marketing) con un **simulador** de creador de bebidas (demo) y un **blog público** consumido desde contenido gestionado en la app (app.dimare.mx).

---

## 1) Objetivos del producto
- Comunicar claramente **qué es DI’MARE**, su filosofía y propuesta artesanal.
- Presentar **productos / bebidas**, beneficios informativos (sin promesas milagro), ingredientes y estilo de marca.
- Permitir explorar un **Diseñador de bebidas (modo demo sin cuenta)**.
- Generar conversión:
  - CTA “Iniciar sesión” → `https://app.dimare.mx/login`
  - CTA “Ordenar” desde el demo → `https://app.dimare.mx` con parámetros del diseño seleccionado.
- Mostrar **Blog público** (listado + detalle) consumiendo un API/endpoint (preferentemente Appwrite) donde el contenido se administra desde la app.

---

## 2) Alcance (MVP)
### 2.1 Páginas públicas
- **Home / Landing**
  - Hero (headline + subheadline + CTA)
  - Sección de “Qué somos” / Filosofía
  - Productos destacados
  - Beneficios / enfoque (informativo)
  - CTA “Diseña tu bebida”
  - CTA “Iniciar sesión”
- **Productos**
  - Catálogo de bebidas (cards)
  - Detalle de bebida (ingredientes + descripción + info nutrimental/propiedades informativas)
- **Beneficios / Ingredientes**
  - Sección educativa por ingrediente (propiedades, origen, notas)
  - Aviso de responsabilidad (no reemplaza tratamientos)
- **Blog**
  - Listado paginado / infinito
  - Búsqueda (título, tags)
  - Detalle de post (SEO friendly)
- **Sobre DI’MARE**
  - Historia / marca
  - FAQ
- **Contacto**
  - Formulario + canales (WhatsApp/IG/correo) *(si aplica)*
- **Legal**
  - Privacidad / términos
  - Avisos / disclaimers

### 2.2 Módulo: Diseñador de bebidas (Demo sin cuenta)
- **Objetivo**: mostrar experiencia del producto y “jugar” con combinaciones.
- Reglas:
  - Máximo **6 ingredientes** (configurable).
  - Secciones: Base / Verdes / Frutas / Extras.
  - Visual “bottle layers” (capas) o composición visual.
  - Cálculo estimado:
    - Precio estimado (según ingredientes + tamaño)
    - Kcal estimadas (si existe tabla base)
  - Guardado temporal:
    - En memoria (state) + opcional en `localStorage` para recuperar al regresar.
- CTA:
  - **“Ordenar”**:
    - Si el usuario **no tiene sesión**, redirigir a:
      `https://app.dimare.mx/login?redirect=/designer&builderPayload=<...>`
    - Si **ya tiene sesión**, redirigir a:
      `https://app.dimare.mx/designer?builderPayload=<...>`

**Formato recomendado para pasar parámetros**
- Usar `builderPayload` como:
  - JSON compacto → `encodeURIComponent(JSON.stringify(payload))`
  - o un `id` temporal si se decide guardar el draft en backend (mejor para URL limpia).

**Payload mínimo**
```json
{
  "sizeMl": 500,
  "ingredients": [
    {"id":"pepino","qty":1},
    {"id":"piña","qty":1}
  ],
  "notes": "sin hielo",
  "estimatedPrice": 95
}
```

---

## 3) Integraciones
### 3.1 Consumo de Blog (desde app.dimare.mx)
- dimare.mx **NO** administra contenido; **solo consume**:
  - Listado (paginación, filtros, tags)
  - Detalle por `slug`
- Fuente recomendada:
  - **Appwrite** (mismo endpoint/proyecto) pero con permisos públicos para lectura.
- Requerimientos:
  - `GET /posts?enabled=true&published=true`
  - `GET /posts/:slug`
  - `GET /tags`
- Imágenes:
  - CDN/Storage (Appwrite Storage o equivalente)
  - Optimización: `srcset`, lazy loading.

### 3.2 Auth
- No es obligatorio loguear en marketing.
- Botón “Iniciar sesión” redirige a webapp.
- Si se implementa “ver sesión” en marketing:
  - Validar sesión con Appwrite SDK contra el mismo endpoint (opcional).

---

## 4) UX/UI y diseño (alto énfasis)
- Estilo: artesanal moderno, natural, costero; UI limpia.
- Animaciones:
  - Micro-interacciones (hover, tap, reveal)
  - Animaciones de scroll suaves (Framer Motion)
  - Transiciones de página sutiles
- Accesibilidad:
  - Contraste AA
  - Navegación por teclado
  - Preferencias `prefers-reduced-motion`
- Responsive:
  - Mobile-first
  - Layout optimizado para lectura

---

## 5) SEO y performance (crítico)
- SEO técnico:
  - Títulos, metas, OpenGraph, Twitter cards
  - JSON-LD (Organization, BlogPosting, Product si aplica)
  - Sitemap + robots.txt
- Performance:
  - Lazy-load imágenes y secciones
  - Code splitting por rutas (React Router)
  - Evitar LCP alto (hero optimizado)
- PWA (opcional en marketing):
  - Normalmente no necesario, pero puede habilitarse si se quiere “Add to home”.

---

## 6) Analítica (opcional recomendado)
- Eventos:
  - Click en “Diseña tu bebida”
  - Click en “Ordenar”
  - Inicio de sesión (redirect)
  - Lecturas de blog

---

## 7) Stack tecnológico (válido)
- React 19 + Vite 6
- React Router DOM 7
- TailwindCSS 4 + tailwind-merge + clsx
- Framer Motion + lucide-react
- TanStack Query (solo si se desea caching de blog)
- Appwrite SDK (opcional, si solo consumirá API también puede ser fetch)
- vite-plugin-pwa (opcional)

---

## 8) Entregables
- Rutas y layout implementados
- Componentes compartibles (Hero, Section, Card, CTA, BlogCard, ProductCard)
- Conector de Blog (client + hooks)
- Diseñador demo (con export de payload y redirección a app)
- Checklist SEO/performance listo para producción
