# Referencias Técnicas de Interfaz y Comportamiento

## 1. Identidad Cromática de Referencia
- **Fondo Oscuro:** Violeta profundo `#1A0030`, negro profundo `#0D0010` o `#05000A`.
- **Acentos y Luces:** Morado eléctrico `#5B0FA8` / `#6A0FBE`, lavanda/lila translúcido `#C9A8F5` para bordes de tarjetas y glows.
- **Acentos Científicos (HUD):** Verde neón `#00FF6A` para marcadores anatómicos (puntos de mapeo sobre la piel) y estados activos de UI.
- **Fondo Claro de Contraste (Sección Médicos):** Blanco roto o crema `#F5F5F3` con tipografías negras.
- **Ajuste:** No se copiarán los contenidos de FacialClass, sino que se adaptará esta paleta al estilo de Benítez Aesthetic Studio.

## 2. Animación del Smartphone Flotante
- Un dispositivo de estilo smartphone (iPhone Notch / bisel sutil) posicionado verticalmente en el centro del viewport.
- Un video `.mp4` corriendo en loop silencioso dentro de la pantalla del smartphone (simulando un tratamiento o análisis de antes y después).
- **Tarjetas/Thumbnails Satélite:** 4 a 6 tarjetas flotando libremente alrededor del teléfono.
  - Cada tarjeta debe tener su propio desfase de velocidad (`parallax/drift`).
  - Animación de oscilación (up-and-down) y rotación sutil en 2D (`tilt` aleatorio de +/- 3 grados).
  - Entran con un fade-in sutil cuando se scrollea hasta esa sección.
- **Puntos HUD:** Puntos verde neón superpuestos en la pantalla que pulsan suavemente (`pulse/breathing`), representando mapeo facial anatómico.

## 3. Comportamientos Dinámicos Específicos
- **Navbar Camaleónico:** Pasa de ser completamente transparente sobre el fondo oscuro a ser de fondo blanco opaco con textos negros al entrar a la sección con fondo claro (y viceversa). Su botón CTA cambia de color en consecuencia.
- **Contador Numérico Animado (Stats):** Las métricas numéricas (ej. 19 años de experiencia, +26 Mil Alunos, etc.) deben tener una animación de conteo numérico que se dispare cuando la sección entra en pantalla.
- **Efecto de Dispersión Magnética (Scatter-to-Grid):** Al scrollear por la galería de profesionales, las fotos empiezan rotadas y desordenadas (flotando en el espacio) y, al continuar el scroll, se alinean magnéticamente en una grilla perfecta de columnas.
- **Texto Marquee (Testimonios):** Un carrusel de texto infinito gigante que se desliza horizontalmente de derecha a izquierda en loop continuo.
