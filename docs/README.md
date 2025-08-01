# 📌 StickyLayoutComponent (React - VTEX IO)
## ✅ Propósito
Este componente envuelve contenido que necesita permanecer fijo (sticky/fixed) en la pantalla al hacer scroll. Es útil para elementos como barras de navegación, botones flotantes, o módulos promocionales que deben estar visibles en la parte superior o inferior del viewport.

Se integra con el contexto de stacking (StackContext) para coordinar el comportamiento sticky entre múltiples instancias, evitando superposiciones incorrectas.

## 📦 Dependencias
React: Manejo del ciclo de vida, estados y referencias.

ReactResizeDetector: Detecta cambios en el alto del contenido para ajustar dinámicamente la altura del wrapper.

vtex.css-handles: Aplica clases con convenciones CSS personalizadas.

StackContext: Contexto que permite a múltiples StickyLayouts coordinar su posición y espacio.

useStickyScroll: Hook personalizado que determina si el elemento debe estar en modo sticky o no.

useWindowListener: Hook personalizado que escucha eventos de ventana como DOMContentLoaded y resize.

## ⚙️ Props
Prop	Tipo	Descripción
position	Positions	Posición donde el sticky debe anclarse (top o bottom).
verticalSpacing	number	Espaciado en píxeles desde el borde (top/bottom) hasta el contenido sticky.
zIndex	number	Valor de z-index del elemento sticky. Si no se proporciona, se usa 999.

## 🧠 Lógica Interna
1. Referencias (useRef)
wrapperRef: Contenedor externo que envuelve el sticky, usado para medir su offsetTop.

containerRef: Elemento que se vuelve sticky (clase fixed) cuando corresponde.

2. Estados (useState)
contentHeight: Almacena la altura del contenido sticky para mantener el layout sin sobresaltos cuando se posiciona como fixed.

wrapperOffsetTop: Guarda la distancia del contenedor sticky respecto al top del documento, usada para determinar cuándo se vuelve "stuck".

3. Offset dinámico (useCallback + useLayoutEffect)
Se ejecuta cada 3 segundos un setInterval para actualizar el offsetTop del wrapper en caso de que el layout del DOM haya cambiado dinámicamente.

También se actualiza al cargar el DOM y en resize.

4. Detección de sticky (useStickyScroll)
Calcula si el elemento debe cambiar a fixed basándose en stickOffset, wrapperOffsetTop, position y el scrollY actual del navegador.

5. Manejo de conflictos de posición
Si el StackContext define una posición y se pasó también por props, se lanza un warning en consola ya que el contexto prevalece.

## 🧩 Estilos
Clases CSS (usando vtex.css-handles)
container: Contenedor principal que cambia entre fixed o relative.

wrapper: Wrapper que contiene al sticky; se le aplica el modificador stuck si está en modo sticky.

Estilo en línea
containerStyle: Posiciona el sticky en top o bottom con un offset y aplica el zIndex.

wrapperStyle: Mantiene el layout cuando el elemento está en modo sticky, evitando colapsos de altura.

## 🧪 Resize dinámico
Al cambiar el tamaño del contenido (por ejemplo, si cambia el texto, imagen o botón), ReactResizeDetector actualiza contentHeight solo cuando el elemento no está en modo sticky. Esto evita que el tamaño fijo se actualice cuando ya está posicionado.

## 💡 Ejemplo de uso
```
//tsx
<StickyLayoutComponent position="top" verticalSpacing={16} zIndex={1000}>
  <MyFloatingBar />
</StickyLayoutComponent>
```
### ⚠️ Consideraciones
Si el componente está dentro de un StackContainer, se recomienda no pasar explícitamente la prop position ya que será sobrescrita.

Actualiza su estado de sticky cada 3 segundos de forma pasiva, lo que mejora el rendimiento frente a una detección continua en scroll.
