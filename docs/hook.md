# useStickyScroll Hook
Este custom hook permite implementar un comportamiento sticky (pegajoso) para un componente en función de la posición del scroll. Se puede configurar para que se active solo al hacer scroll hacia arriba y también considerar offsets personalizados.

## 📦 Importación
```
import { useStickyScroll } from './modules/useStickyScroll'
```

## 📌 Parámetros
El hook recibe un objeto de configuración con los siguientes campos:

| Parámetro            | Tipo                      | Requerido | Descripción                                                                                 |
|----------------------|---------------------------|-----------|---------------------------------------------------------------------------------------------|
| `position`           | `Positions (TOP o BOTTOM)`| No        | Indica si el sticky se aplica al tope o al fondo de la ventana.                             |
| `verticalSpacing`    | `number`                  | No        | Espacio adicional (padding/margin) que se suma al cálculo del offset. Por defecto: `0`.     |
| `stickOffset`        | `number`                  | No        | Offset adicional aplicado al comportamiento sticky. Útil para dejar espacio por encima/abajo. Por defecto: `0`. |
| `contentHeight`      | `number \| string`        | Sí        | Altura del contenido sticky. Debe ser un número para que el cálculo sea válido.             |
| `wrapperOffsetTop`   | `number`                  | Sí        | Distancia desde la parte superior del wrapper al viewport.                                  |
| `onlyWhenScrollingUp`| `boolean`                 | No        | Si está activado, el sticky solo se aplicará al hacer scroll hacia arriba. Por defecto: `false`. |

## 🔄 Comportamiento
Escucha los eventos de scroll y resize del navegador mediante el hook useWindowListener.

Calcula si el elemento debe pegarse (isStuck) basándose en:

La posición actual del scroll (window.scrollY).

El valor de position (TOP o BOTTOM).

Si se está haciendo scroll hacia arriba (cuando onlyWhenScrollingUp es true).

Devuelve el estado isStuck que puede usarse para aplicar clases CSS, estilos o lógica condicional.

## 🧠 Lógica Interna
Scroll hacia arriba (opcional): Usa useRef para guardar el último valor de scroll y compararlo con el actual.

Offset: Calcula el stuckPosition comparando currentScrollY con el wrapper.

Condicional Sticky: Si el scroll supera el punto de anclaje (stuckPosition), y las condiciones lo permiten, se activa setStuck(true).

✅ Retorno
```
{
  isStuck: boolean
}
```
Valor booleano que indica si el componente actualmente está “pegado” en pantalla (true) o no (false).

## 📘 Ejemplo de uso
```
const { isStuck } = useStickyScroll({
  position: Positions.TOP,
  verticalSpacing: 20,
  contentHeight: 100,
  wrapperOffsetTop: 300,
  onlyWhenScrollingUp: true,
})

return (
  <div className={isStuck ? 'sticky' : ''}>
    Contenido Sticky
  </div>
)
```