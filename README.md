# 🌊 Casa DI' MARE

> Bebidas Naturales Artesanales — "El sabor del mar en tu vaso"

Casa DI' MARE es una marca de bebidas naturales artesanales, preparadas con ingredientes frescos y el cuidado de una receta casera. Este repositorio contiene el ecosistema digital completo de DI'MARE, organizado como un monorepo con dos aplicaciones independientes pero complementarias.

---

## 📋 Estructura del Proyecto

```
dimare/
├── apps/
│   ├── marketing/          # Sitio web público (dimare.mx)
│   └── webapp/            # Aplicación web (app.dimare.mx) - En desarrollo
└── resources/
    ├── docs/              # Documentación y requerimientos
    └── images/            # Recursos visuales compartidos
```

---

## 🎯 Aplicaciones

### 1️⃣ Marketing Site (`apps/marketing`)

**URL**: `dimare.mx`  
**Propósito**: Sitio web informativo y de marketing

#### Características Principales

- **Landing Page**: Presentación de la marca, filosofía y propuesta de valor
- **Catálogo de Productos**: Showcase de bebidas con información detallada
- **Diseñador de Bebidas (Demo)**: Simulador interactivo para crear combinaciones personalizadas
  - Máximo 6 ingredientes
  - Visualización de capas de la botella
  - Cálculo de precio estimado
  - Redirección a la app para pedidos reales
- **Blog Público**: Contenido consumido desde la aplicación web (app.dimare.mx)
- **Páginas Informativas**: Beneficios, sobre nosotros, contacto

#### Stack Tecnológico

- ⚛️ React 19
- ⚡ Vite 6
- 🎨 TailwindCSS 4
- 🎭 Framer Motion (animaciones)
- 🧭 React Router DOM 7
- 🎯 Optimizado para SEO y performance

#### Instalación y Uso

```bash
cd apps/marketing
npm install
npm run dev        # Modo desarrollo
npm run build      # Build para producción
npm run preview    # Preview del build
```

**Variables de Entorno**

```env
VITE_APP_URL=http://localhost:5174  # URL de la webapp
VITE_API_URL=https://api.dimare.mx  # API endpoint
```

---

### 2️⃣ Web Application (`apps/webapp`)

**URL**: `app.dimare.mx`  
**Propósito**: Plataforma completa para clientes y administradores

#### Características Principales

##### Para Clientes

- ✨ Registro e inicio de sesión
- 🍹 Diseñador de bebidas (pedidos reales)
  - Creación de combinaciones personalizadas
  - Importación de diseños del sitio marketing
  - Validaciones y compatibilidad de ingredientes
- 📦 Sistema de pedidos completo
  - Creación y seguimiento de pedidos
  - Historial de compras
  - Estados en tiempo real
- 🎁 Sistema de recompensas
  - Acumulación de puntos
  - Canjes y descuentos
  - Ofertas personalizadas

##### Para Administradores

- 📊 Dashboard con métricas de ventas
- 🛒 Gestión de pedidos y estados
- 🍓 CRUD de productos e ingredientes
- 👥 Gestión de clientes
- 📝 Editor de Blog (Puck.js)
  - Editor visual con bloques
  - Gestión de contenido público
  - Sistema de etiquetas y categorías
- 💰 Configuración de recompensas y ofertas

#### Stack Tecnológico

- ⚛️ React 19
- ⚡ Vite 6
- 🎨 TailwindCSS 4
- 🔐 Appwrite SDK 14 (autenticación y base de datos)
- 🔄 TanStack Query 5 (gestión de estado y cache)
- 🎭 Framer Motion
- 📊 Recharts (gráficas)
- ✍️ Puck.js (CMS visual)
- 🧭 React Router DOM 7

#### Instalación y Uso

```bash
cd apps/webapp
npm install
npm run dev        # Modo desarrollo
npm run build      # Build para producción
```

**Variables de Entorno** _(configurar según Appwrite)_

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
```

---

## 🔄 Integración entre Aplicaciones

### Flujo de Usuario

1. **Usuario descubre la marca** en `dimare.mx`
2. **Explora el diseñador demo** y crea una bebida
3. **Click en "Ordenar"** → redirige a `app.dimare.mx/login?redirect=/designer&order=<payload>`
4. **Usuario se registra/inicia sesión** en la webapp
5. **Continúa con su pedido** usando el diseño creado

### Comunicación de Datos

- **Marketing → Webapp**: Payload de diseño via query params (JSON codificado)
- **Webapp → Marketing**: Blog posts consumidos via API pública (Appwrite)

---

## 🎨 Identidad de Marca

### Colores Principales

- **Verde DI'MARE**: `#2E6B3F` (principal)
- **Verde Claro**: `#7FAE8A` (acentos)
- **Verde Oscuro**: `#1D4A2B` (contraste)
- **Crema**: `#F5F1E8` (fondos suaves)

### Tipografías

- **Display**: Poppins (títulos, marca)
- **Script**: Dancing Script (slogan, detalles)
- **Body**: Inter (texto general)

### Estilo Visual

- Artesanal moderno
- Natural y costero
- Limpio y accesible
- Animaciones sutiles y suaves

---

## 🚀 Desarrollo

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Instalación Inicial

```bash
# Clonar el repositorio
git clone <repository-url>
cd dimare

# Instalar dependencias en ambas apps
npm install

# O instalar en cada app individualmente
cd apps/marketing && npm install
cd ../webapp && npm install
```

### Scripts Principales

#### Marketing

```bash
npm run dev          # Desarrollo (puerto 5173)
npm run build        # Build producción
npm run preview      # Vista previa del build
npm run lint         # Linter
```

#### Webapp

```bash
npm run dev          # Desarrollo (puerto 5174)
npm run build        # Build producción
npm run preview      # Vista previa del build
```

---

## 📦 Características Técnicas

### Performance

- ⚡ Code splitting por rutas
- 🖼️ Lazy loading de imágenes
- 📱 Mobile-first responsive design
- 🎯 Core Web Vitals optimizados

### SEO (Marketing)

- 📄 Meta tags dinámicos
- 🗺️ Sitemap automático
- 🤖 robots.txt
- 📊 JSON-LD structured data
- 🔍 OpenGraph y Twitter cards

### Seguridad (Webapp)

- 🔐 Autenticación vía Appwrite
- 🛡️ Route guards por rol
- 🔒 Permisos granulares en base de datos
- 🚫 Validaciones client-side y server-side

### Accesibilidad

- ♿ WCAG AA compliant
- ⌨️ Navegación por teclado
- 🎨 Contraste de colores adecuado
- 🔊 Soporte para lectores de pantalla
- 🎬 Respeto a `prefers-reduced-motion`

---

## 📚 Documentación Adicional

- [Requerimientos Marketing](./resources/docs/requerimientos_dimare_mx.md)
- [Requerimientos Webapp](./resources/docs/requerimientos_app_dimare_mx.md)
- [Estructura del Monorepo](./resources/docs/requerimientos_monorepo_estructura.md)
- [Guía de Identidad Visual](./resources/docs/Casa_DIMARE_Identidad_Visual.md)

---

## 🤝 Contribución

Este es un proyecto privado de Casa DI'MARE. Para contribuir:

1. Crear una rama desde `develop`
2. Seguir los estándares de código establecidos
3. Escribir commits descriptivos
4. Crear Pull Request con descripción detallada

---

## 📝 Licencia

© 2026 Casa DI'MARE. Todos los derechos reservados.

---

## 📧 Contacto

Para consultas sobre el proyecto:

- **Email**: dev@dimare.mx
- **Website**: https://dimare.mx

---

<div align="center">
  <strong>Hecho con 💚 por el equipo de Casa DI' MARE</strong>
</div>
