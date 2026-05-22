# STACK TECNOLÓGICO — FACIALCLASS.COM.BR
### Análisis del código fuente · publicado 20 May 2026

---

## 1. CONFIRMADO POR EL CÓDIGO FUENTE

### 🏗️ Constructor / No-Code Builder

| Herramienta | Evidencia en el código |
|---|---|
| **Framer** | `<!-- Made in Framer · framer.com ✨ -->` · `<meta name="generator" content="Framer 600e657">` · todos los assets en `framerusercontent.com` |

> **El sitio entero fue construido en Framer** — incluyendo las animaciones, los layouts responsivos, el scroll-trigger, los efectos de entrada, los carruseles y los mockups flotantes. No se detecta React, Vue, Next.js ni ningún otro framework JavaScript de terceros en el HTML entregado al navegador.

---

### 🔤 Tipografías

Todas las fuentes se cargan vía `@font-face` declarados inline en el `<head>` del documento:

| Familia | Pesos cargados | Origen |
|---|---|---|
| **DM Sans** | 400 (Regular), 500 (Medium) | Google Fonts CDN (`fonts.gstatic.com`) |
| **Google Sans** | 400 (Regular) — con cobertura de +20 unicode ranges (armenio, bengalí, cirílico, devanagari, árabe, etc.) | Google Fonts CDN (`fonts.gstatic.com`) |
| **Silka** | Regular (400), Medium (500), SemiBold (600), Bold (700) | Framer CDN (`framerusercontent.com`) — tipografía custom sin licencia pública |
| **Inter** | Regular (400), Black (900), Black Italic (900i) | Framer CDN (`framerusercontent.com`) |

> **Silka** es la fuente principal del diseño — la que se ve en los titulares grandes, etiquetas de badge y texto de navegación. Es una sans-serif geométrica con carácter propio, disponible en Framer como fuente incluida.

---

### 📊 Analytics / Tag Management

| Herramienta | Evidencia |
|---|---|
| **Google Tag Manager (GTM)** | Script de GTM al inicio del `<head>` y en el `<body>` (noscript) |
| **Endpoint personalizado de GTM** | `load.tracker.jornada.facialacademy.com.br/3lowpxeupapq.js` — proxy server-side del script GTM para evadir ad-blockers. Sugiere una implementación de **server-side GTM** corriendo en su propio subdominio |
| **DataLayer** | `window.dataLayer` inicializado en el script de GTM — lo que implica eventos personalizados rastreados (clicks, scroll depth, conversiones, etc.) |

---

### 💬 Widget de WhatsApp

Implementado como **snippet JavaScript custom** inyectado por Framer en el `<body>`:

```
URL destino: https://link.facialacademy.com.br/suporte_oficial
Páginas activas: /cursos/facialclass · /cursos/facialblack
```

Características del snippet:
- Aparece con `opacity: 0` + `transform: scale(0.7)` y hace transición hacia visible al detectar scroll
- Animación de pulso verde (`@keyframes wa-pulse`) con `box-shadow` expandiéndose
- Umbral de activación: 25% de la altura del primer bloque visible en pantalla
- Totalmente custom — **no usa ninguna librería de terceros** (ni Tidio, ni Intercom, ni Crisp)

---

### 🖼️ CDN de Assets

| Origen | Tipo de contenido |
|---|---|
| `framerusercontent.com` | Fuentes (.woff2), imágenes (.webp, .png), JSON de search index |
| `fonts.gstatic.com` | Google Fonts (.woff2) |

---

### 🔍 SEO / Meta Tags

- Open Graph completo (`og:type`, `og:title`, `og:description`, `og:image`)
- Twitter Card (`summary_large_image`)
- `<link rel="icon">` diferenciado por `prefers-color-scheme` (light/dark)
- `<link rel="apple-touch-icon">` para iOS
- Framer Search Index (JSON) para indexación en el propio ecosistema Framer

---

### 🌐 Internacionalización

- `<html lang="pt-BR" dir="ltr">` — idioma declarado en el HTML
- Google Translate del navegador detectado activo durante la grabación (no es una integración del sitio)
- Las fuentes Google Sans tienen unicode-ranges que cubren scripts del mundo entero — señal de que Framer las genera automáticamente para soporte global

---

## 2. INFERIDO / NO VISIBLE EN EL HTML

> Framer genera el HTML final a partir de su propio runtime. Lo siguiente es lo que corre **internamente** en el motor de Framer pero no aparece explícitamente como código de terceros en el HTML estático:

| Capa interna de Framer | Descripción |
|---|---|
| **React** (bajo el capó de Framer) | Framer compila todos los componentes visuales a componentes React. El usuario no lo ve ni lo instala — es el runtime de Framer |
| **Framer Motion** | La librería de animaciones de Framer. Todas las animaciones de scroll-trigger, fade-in, stagger, floating loop y counter están generadas por Framer Motion internamente |
| **CSS transforms + keyframes** | Las animaciones de marquee (texto horizontal), pulsaciones, y las tarjetas flotantes usan CSS puro generado por Framer |
| **Intersection Observer API** | Las animaciones de entrada al viewport (scroll-triggered) se implementan via Intersection Observer nativo del browser, orquestado por Framer Motion |

---

## 3. LO QUE NO TIENE — Y TECNOLOGÍAS SUGERIDAS PARA REPLICAR EL RESULTADO

Si quisiera replicar este sitio **fuera de Framer** (por ejemplo en código propio con Next.js, Astro o HTML/CSS), estas son las herramientas que producen exactamente los mismos efectos:

---

### 🎬 Animaciones de scroll y entrada al viewport

**Lo que hace Framer internamente:**
Fade-in desde abajo, stagger entre ítems, animaciones de escala y opacidad al entrar al viewport.

**Alternativas recomendadas:**

| Librería | Por qué | Link |
|---|---|---|
| **Framer Motion** (standalone) | La misma librería que usa Framer internamente. Tiene `whileInView`, `variants`, `staggerChildren`. La opción más directa | `framer.com/motion` |
| **GSAP + ScrollTrigger** | El estándar de la industria para animaciones de scroll complejas. Más potente que Framer Motion para timelines y sincronización | `gsap.com` |
| **Motion One** | API moderna, ligera (~3KB). Basada en el Web Animations API nativo. Ideal si se busca rendimiento | `motion.dev` |
| **AOS (Animate On Scroll)** | La opción más simple para fade-ins básicos con data attributes. Sin configuración JavaScript | `michalsnik.github.io/aos` |

---

### 🃏 Tarjetas flotantes con movimiento orbital independiente (sección smartphone)

**Lo que hace el sitio:**
Miniaturas de video flotando alrededor de un smartphone central, cada una con trayectoria, velocidad y rotación leve distintas.

**Cómo replicarlo:**

```
GSAP + CSS transforms
→ Cada tarjeta: position: absolute, con animación de translateX + translateY + rotate en loop
→ Desfase de duration y delay por tarjeta para romper la sincronía
→ ease: "sine.inOut" para movimiento orgánico

Alternativa con CSS puro:
@keyframes float-card {
  0%, 100% { transform: translate(0, 0) rotate(-2deg); }
  50% { transform: translate(8px, -14px) rotate(2deg); }
}
→ Cada tarjeta con animation-duration y animation-delay distintos
```

---

### 📸 Efecto scatter → grid (sección profesores)

**Lo que hace el sitio:**
Las fotos aparecen dispersas, rotadas y en distintos tamaños, y al hacer scroll se organizan en grid alineado.

**Cómo replicarlo:**

| Herramienta | Técnica |
|---|---|
| **GSAP + Flip Plugin** | El plugin GSAP Flip calcula automáticamente la diferencia entre dos estados de layout y anima la transición. Exactamente para este efecto |
| **Framer Motion `layoutId`** | En React: `layoutId` en cada tarjeta hace que Framer Motion anime automáticamente el cambio de posición entre dos layouts |
| **View Transitions API** (nativa) | API nativa de Chrome/Safari. Sin librerías. Define `view-transition-name` en los elementos y el browser anima la transición de layout. Limitación: soporte aún parcial en Firefox |

---

### 🔢 Counter Animation (números +26 Mil, +26 Países)

**Lo que hace el sitio:**
Los números cuentan hacia arriba al hacer scroll hasta ellos.

**Opciones:**

| Herramienta | Notas |
|---|---|
| **CountUp.js** | Librería de 5KB específica para este efecto. Muy configurable (decimales, prefijos, easing) | 
| **GSAP `gsap.to({ val: 0 }, { val: 26000 })`** | Si ya usas GSAP, no necesitas CountUp. Un tween sobre una propiedad numérica con `onUpdate` para actualizar el DOM |
| **Framer Motion `useMotionValue` + `useTransform`** | Solución pura en React sin dependencia extra |

---

### ↔️ Marquee / Ticker de texto horizontal (sección testimonios)

**Lo que hace el sitio:**
Texto muy grande desplazándose de derecha a izquierda en bucle continuo.

**Opciones:**

| Herramienta | Notas |
|---|---|
| **CSS puro** (`@keyframes marquee`) | La opción más ligera. Solo funciona bien si el texto no tiene interactividad |
| **`react-fast-marquee`** | Componente React de 4KB. Pausa en hover, gradiente en bordes, velocidad configurable. El estándar en proyectos React |
| **GSAP `gsap.to()` con loop infinito** | Más control sobre velocidad, pausa en hover, sincronización con scroll |

```css
/* CSS puro */
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.ticker { 
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}
/* Duplicar el texto en el HTML para que el loop sea seamless */
```

---

### 📱 Glassmorphism (tarjetas semitransparentes)

**Lo que hace el sitio:**
Tarjetas de estadísticas con fondo semitransparente oscuro sobre el fondo morado.

```css
/* CSS */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

> No requiere ninguna librería. CSS puro con `backdrop-filter: blur()`.

---

### ⚡ Sugerencia de Stack Completo para Replicar el Sitio

Si se quisiera construir un sitio equivalente **en código propio**, este sería el stack recomendado:

```
Framework:        Next.js 15 (App Router)    → SSG/SSR, performance, SEO
Animaciones:      GSAP + ScrollTrigger        → control total sobre timelines
                  Framer Motion               → animaciones de UI y layout
Estilos:          Tailwind CSS v4             → utilidades + tokens de diseño
Fuentes:          Silka (Framer/Licensing)
                  DM Sans (Google Fonts, libre)
Carruseles:       Embla Carousel              → ligero, sin dependencias, accesible
Marquee:          react-fast-marquee          → 4KB, accesible, configurable  
Counter:          CountUp.js                  → 5KB, preciso
3D / Esferas:     Three.js o CSS 3D           → para los globos translúcidos
Analytics:        Google Tag Manager          → mismo que el sitio actual
Deploy:           Vercel                      → integración nativa con Next.js
```

---

## 4. RESUMEN EJECUTIVO DEL STACK

```
┌─────────────────────────────────────────────────────────┐
│                   FACIALCLASS.COM.BR                    │
├─────────────────────────────────────────────────────────┤
│  Constructor        Framer (no-code / visual editor)    │
│  Runtime interno    React + Framer Motion               │
│  Fuente principal   Silka (Regular / SemiBold / Bold)   │
│  Fuente secundaria  DM Sans + Inter + Google Sans       │
│  Analytics          Google Tag Manager (server-side)    │
│  WhatsApp widget    Script custom JavaScript            │
│  Hosting            Framer Hosting (CDN propio)         │
│  Assets CDN         framerusercontent.com               │
│  Fuentes CDN        fonts.gstatic.com                   │
└─────────────────────────────────────────────────────────┘
```

---

*Documento generado a partir del análisis del código fuente HTML del sitio (628 líneas) combinado con el análisis visual frame a frame de la grabación de pantalla.*
