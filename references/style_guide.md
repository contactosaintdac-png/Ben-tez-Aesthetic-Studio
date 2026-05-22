# Análisis de Estilo y Composición Visual

## Visión General del Diseño
El sitio transmite una identidad extremadamente premium, técnica y moderna, orientada al mercado de medicina estética. Toda la experiencia está construida para generar:
- Autoridad.
- Sensación de tecnología avanzada (estética sci-fi).
- Exclusividad (Quiet Luxury).
- Movimiento constante (animaciones sutiles y fluidas).
- Profundidad visual (capas en el eje Z).
- Interfaces tipo plataforma SaaS y elementos flotantes 3D.

## Estructura General del Layout

### Navbar Superior
- Minimalista, fondo oscuro/transparente.
- Fino verticalmente, siempre visible (`fixed top-0`).
- Logo alineado a la izquierda, menú horizontal centrado, botón CTA redondeado a la derecha.
- Mucho espacio negativo, tipografía pequeña y limpia.
- Transición dinámica al hacer scroll (de transparente a blanco u opaco según la sección).

### Hero Section
- Ocupa prácticamente toda la pantalla.
- **División visual:** Izquierda = texto (título principal grande, subtítulo, lista de beneficios, CTA). Derecha = visual 3D o video (en este caso, el smartphone flotante con el video estético).
- **Título principal:** Tipografía sans-serif moderna, bold, mucho interlineado.
- **Fondo:** Gradientes radiales suaves (glows púrpuras), partículas sutiles en movimiento, nebulosas digitales. Nunca plano ni estático.

### Movimiento y Animaciones (Motion Design)
- **Nada está quieto:** Micro-movimientos de oscilación suave, flotación vertical en bucle y efecto parallax.
- **Entrada coreografiada:** Los elementos entran con fade in, ligeros desplazamientos verticales y delays (stagger) acumulativos:
  1. Fondo y resplandores (glows).
  2. Imagen principal / Smartphone.
  3. Títulos y textos.
  4. Botones CTA.
- **Ritmo visual:** Alternar secciones densas y oscuras con secciones limpias y claras (como la sección de profesionales en fondo claro) para evitar fatiga visual.
