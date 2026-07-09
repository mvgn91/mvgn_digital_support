# Roadmap — MVGN Labs

> Centro de Soporte Digital · Sitio web estático construido con Astro v6

---

## Estado Actual (v1.7)

### ✅ Completado

#### Landing Page (`/`)
- Hero con animaciones 3D de teléfonos en cascada (Framer Motion)
- Secciones: servicios, características, how-it-works, planes de precios, filosofía, contacto
- Fondo animado con shader WebGL (`HellBackground`)
- Tema oscuro/claro con modo toggle

#### Páginas estáticas
- `/faq` — 8 preguntas frecuentes con acordeón
- `/contact` — Canales de soporte, horarios, tiempos de respuesta

#### Guías de soporte (`/support/[slug]`)
- 2 guías: "Todo en Uno" y "Biblioteca Personal" (MDX con colecciones de contenido)
- Protegidas con contraseña via StatiCrypt (post-build)
- Sidebar de progreso, lightbox para capturas, callouts informativos

#### Sistema de diseño
- Tokens CSS personalizados (`tokens.css`)
- Sistema de cuadrícula de 8px, tipografía Inter, efectos glassmorphism
- Tema claro/oscuro completo
- Clases utilitarias (`utilities.css`)

#### Infraestructura
- Build estático con Astro v6
- Post-build: cifrado de páginas de soporte con StatiCrypt
- Desplegado en Vercel (`mvgnlabs.vercel.app`)
- Integración React + Framer Motion para componentes interactivos

---

## Próximos Pasos (Corto Plazo)

### 1. Correcciones técnicas
- [ ] Renombrar `package.json` — el campo `name` actualmente es `--typescript` (placeholder)
- [ ] Declarar dependencias faltantes: `@react-three/fiber` y `@react-three/drei` usadas en `Phone3D.tsx` pero no en `package.json`
- [ ] Desduplicar componentes similares: `CascadeMobileScreens.tsx` vs `CascadingPhones.tsx`
- [ ] Migrar assets de `/public/assets/` a usar import módular de Astro para mejor hashing y caché

### 2. Mejoras de UX
- [ ] **Buscador** — el componente `SearchBar` ya existe pero está deshabilitado ("coming soon")
- [ ] Navegación móvil — probar y pulir el menú hamburguesa con overlay
- [ ] Animaciones de transición entre páginas (View Transitions API de Astro)
- [ ] Soporte PWA (manifest, service worker para caché offline de guías)

### 3. Contenido
- [ ] Más guías de soporte en la colección `apps` (ej: "Configuración Avanzada", "Solución de Problemas")
- [ ] Página 404 personalizada
- [ ] Página "Sobre Nosotros" con historia del proyecto

---

## Expansión (Mediano Plazo)

### 🌐 Alcance y Contenido
- **Blog / Avisos** — publicar actualizaciones de servicios, nuevas apps compatibles, changelog
- **Sistema de tickets** — formulario integrado que envíe a WhatsApp o email con estructura
- **Galería de capturas** — página tipo showcase con los diseños de las apps compatibles
- **Multi-idioma** — soporte inglés para llegar a audiencia internacional (i18n con Astro)

### ⚙️ Funcionalidades
- **Área de cliente** — portal ligero donde los clientes puedan ver sus apps, estado, facturas
- **Dashboard interno** — estadísticas de visitas, guías más vistas, control de contenido
- **Foro / comunidad** — espacio de discusión entre clientes (integración con Discord o similar)
- **API pública** — endpoints para consultar disponibilidad, precios, compatibilidad de dispositivos

### 📱 Canales Adicionales
- **Bot de WhatsApp** — automatizar respuestas frecuentes y envío de guías
- **App Android MVGN Labs** — Progressive Web App empaquetada con Trusted Web Activity
- **Mini-app para Telegram** — catálogo y guías rápidas

---

## Visión a Largo Plazo

```
MVGN Labs como plataforma integral:
┌─────────────────────────────────────┐
│  Página Web (landing + docs)       │ ◄── ESTAMOS AQUÍ
│  Bot de WhatsApp automatizado      │
│  Portal de cliente con facturación │
│  App Android (TWA)                 │
│  Comunidad / Foro                  │
│  API de servicios                  │
└─────────────────────────────────────┘
```

---

## Stack Técnico (Actual)

| Capa | Tecnología |
|------|-----------|
| Framework | Astro v6 — Static Site Generation |
| UI interactiva | React 19 + Framer Motion |
| Animaciones 3D | Three.js / React Three Fiber |
| Contenido | MDX + Content Collections |
| Estilos | CSS nativo + Design Tokens |
| Protección | StatiCrypt (cifrado AES) |
| CI/CD | Vercel (Git integration) |
| Password | `STATICRYPT_PASSWORD` en `.env` |

---

Este roadmap es un documento vivo — actualízalo conforme el proyecto evoluciona.
