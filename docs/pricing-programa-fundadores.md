# Precios — Programa Fundadores (archivado, pendiente de reactivar)

**Estado:** oculto del landing público desde 2026-09-15. El producto aún no está
terminado y no queremos exponer precios ni el modelo de tarificación a
clientes ni a la competencia mientras tanto.

Este documento es la fuente de verdad para **reinstalar** la sección de
precios cuando corresponda. El CSS (`assets/css/style.css`) y el JS
(`assets/js/main.js`) del calculador **no se borraron** — quedaron intactos
pero inertes porque el HTML que los activa ya no existe en `index.html`.
Para reactivar todo, solo hay que devolver el HTML de más abajo a su lugar
original (ver "Cómo reactivar").

## Modelo de precios

Tarificación progresiva por tramos sobre "personas activas" (recursos que
cubren turnos + usuarios sin recurso vinculado, sin duplicar). Nunca se
recalcula todo el volumen al tramo superior — solo el tramo correspondiente,
igual que un impuesto progresivo.

| Tramo | Precio |
|---|---|
| Primeras 10 personas | $124.900 CLP/mes (mínimo facturable) |
| Personas 11–50 | $7.490 c/u |
| Personas 51–100 | $4.990 c/u |
| Personas 101–250 | $3.490 c/u |
| Personas 251–500 | $2.490 c/u |
| Personas 501–1.000 | $1.790 c/u |
| Desde 1.001 | $1.290 c/u |

Descuento anual: 20%, beneficio exclusivo del Programa Fundadores (no
permanente para todo futuro cliente). Sobre 2.000 personas la calculadora
sigue funcionando pero se muestra un aviso discreto invitando a
"Solicitar propuesta" en vez de reemplazar el precio.

Fórmula (ya implementada en `assets/js/main.js`, funciones `calcMonthlyPrice`,
`updateCalculator`, `initCalculator`, `toggleBilling`):

```js
var FOUNDER_BASE = 124900;
var FOUNDER_MIN_PEOPLE = 10;
var ANNUAL_DISCOUNT = 0.2;
var PRICE_TIERS = [
  {from: 10, to: 50, rate: 7490},
  {from: 50, to: 100, rate: 4990},
  {from: 100, to: 250, rate: 3490},
  {from: 250, to: 500, rate: 2490},
  {from: 500, to: 1000, rate: 1790},
  {from: 1000, to: Infinity, rate: 1290}
];

function calcMonthlyPrice(people) {
  var n = Math.max(FOUNDER_MIN_PEOPLE, Math.round(people));
  var total = FOUNDER_BASE;
  PRICE_TIERS.forEach(function(t) {
    if (n > t.from) total += (Math.min(n, t.to) - t.from) * t.rate;
  });
  return total;
}
```

Valores de referencia validados (mensual, sin descuento anual):

| Personas | Precio |
|---|---|
| 10 | $124.900 |
| 50 | $424.500 |
| 100 | $674.000 |
| 250 | $1.197.500 |
| 500 | $1.820.000 |
| 1.000 | $2.715.000 |
| 2.000 | $4.005.000 |

## Por qué se rediseñó (contexto)

El modelo anterior aplicaba el precio reducido a **todas** las personas al
superar 50 (modelo "cliff"), lo que producía un bug real: sumar una persona
podía **bajar** el total facturado (50 personas = $624.500 vs. 51 personas =
$509.490). El modelo por tramos progresivos elimina ese bug — el precio
nunca decrece al sumar personas.

## HTML a restaurar

Va completo, tal cual estaba en `index.html` entre la sección `#early`
(Clientes fundadores) y la sección `#faq`, justo antes de `<section id="faq">`:

```html
<section id="pricing">
<div class="pricing-header sr">
<div class="section-label">Un modelo simple</div>
<h2>Un precio que sigue<br/>el tamaño real de tu operación</h2>
<p class="section-sub">Pagas por las personas activas que coordinas en Asygna. Los clientes, sucursales y puntos de servicio que necesites están incluidos.</p>
<div style="margin-top:1.5rem;">
<span class="launch-banner">Programa Fundadores · Cupos limitados</span>
</div>
</div>
<div class="billing-toggle">
<span class="toggle-label active" id="lbl-monthly">Mensual</span>
<button aria-label="Cambiar ciclo de facturación" aria-pressed="false" class="toggle-pill-btn" id="billing-toggle" onclick="toggleBilling()">
<div class="toggle-thumb" id="toggle-thumb"></div>
</button>
<span class="toggle-label" id="lbl-annual">Anual</span>
<span class="badge-save">Ahorra 20%</span>
</div>
<div class="pricing-layout">
<div class="plan-card founder-plan featured sr">
<div class="featured-badge">Oferta fundadora</div>
<div class="plan-name">Programa Fundadores</div>
<div class="plan-price-lead"><span class="plan-price-from">Desde</span><div class="plan-price" id="founder-price">$124.900<sub> CLP/mes</sub></div></div>
<div class="plan-licenses" id="founder-minimum">10 personas activas incluidas</div>
<p class="plan-price-note">El valor por persona disminuye progresivamente a medida que crece tu operación.</p>
<div aria-label="Calculadora de precio" class="price-calc">
<div class="price-calc-head">
<label for="calc-input">¿Cuántas personas coordinas?</label>
<div class="price-calc-input-wrap"><input aria-describedby="calc-result" id="calc-input" inputmode="numeric" max="20000" min="1" type="number" value="100"/><span>personas</span></div>
</div>
<input aria-label="Personas coordinadas" class="price-calc-slider" id="calc-slider" max="3000" min="1" step="1" type="range" value="100"/>
<div class="price-calc-result" id="calc-result">
<div class="price-calc-total"><strong id="calc-total">$674.000</strong><span> CLP/mes</span></div>
<small id="calc-avg">$6.740 promedio por persona</small>
</div>
<div class="price-calc-enterprise" hidden id="calc-enterprise">
<span>¿Tienes una operación de mayor tamaño? Conversemos.</span>
<a class="price-calc-enterprise-btn" href="#contact">Solicitar propuesta</a>
</div>
</div>
<details class="tier-details">
<summary>Ver cómo bajan los tramos</summary>
<div class="tier-table" id="tier-table">
<div class="tier-row" data-from="0" data-to="10"><span>Primeras 10 personas</span><strong>$124.900</strong></div>
<div class="tier-row" data-from="10" data-to="50"><span>Personas 11–50</span><strong>$7.490 <small>c/u</small></strong></div>
<div class="tier-row" data-from="50" data-to="100"><span>Personas 51–100</span><strong>$4.990 <small>c/u</small></strong></div>
<div class="tier-row" data-from="100" data-to="250"><span>Personas 101–250</span><strong>$3.490 <small>c/u</small></strong></div>
<div class="tier-row" data-from="250" data-to="500"><span>Personas 251–500</span><strong>$2.490 <small>c/u</small></strong></div>
<div class="tier-row" data-from="500" data-to="1000"><span>Personas 501–1.000</span><strong>$1.790 <small>c/u</small></strong></div>
<div class="tier-row" data-from="1000" data-to="100000000"><span>Desde 1.001</span><strong>$1.290 <small>c/u</small></strong></div>
</div>
</details>
<p class="plan-summary">Toda la operación conectada desde el primer turno hasta la liquidación y facturación, sin bloquear el control financiero.</p>
<ul class="plan-features">
<li><svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg> Planificación, asignación y cobertura de turnos</li>
<li><svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg> Ausencias, reemplazos y trazabilidad</li>
<li><svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg> Validación de horas y cumplimiento</li>
<li><svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg> Liquidaciones, facturación y reportes</li>
<li><svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg> Clientes y puntos de servicio ilimitados</li>
<li><svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg> Implementación inicial acompañada</li>
</ul>
<a class="plan-btn plan-btn-solid" href="#contact">Quiero ser cliente fundador</a>
</div>
<aside class="pricing-explainer sr sr-d1">
<div class="explainer-kicker">Cómo se calcula</div>
<h3>Una persona,<br/>un solo cobro.</h3>
<div class="counting-list">
<div class="counting-item"><span>01</span><div><strong>Recursos activos</strong><p>Quienes cubren turnos o prestan servicios.</p></div></div>
<div class="counting-item"><span>02</span><div><strong>Usuarios activos sin recurso</strong><p>Administradores, supervisores u otros usuarios también cuentan.</p></div></div>
<div class="counting-item"><span>03</span><div><strong>Sin duplicar personas</strong><p>Si alguien tiene usuario y recurso vinculados, se cobra una sola vez.</p></div></div>
</div>
<div class="unlimited-note"><strong>Incluido sin costo adicional</strong><span>Todos los clientes, sucursales y puntos de servicio que tu operación necesite.</span></div>
<p class="consultative-note"><strong>¿Necesitas integraciones, SLA u onboarding masivo?</strong> Diseñamos la implementación contigo sin esconder el corazón del producto detrás de otro plan.</p>
</div>
</div>
<p class="pricing-footnote sr">El mínimo facturable es de 10 personas activas. El precio final se confirma durante una evaluación breve de tu operación. El 20% de descuento anual es un beneficio exclusivo para clientes del Programa Fundadores.</p>
</section>
```

## FAQ eliminada

También se sacó esta entrada de `#faq` (revelaba montos exactos de los tramos):

```html
<div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)"><span class="faq-q-text">¿El precio baja si tengo más personas?</span><span>⌄</span></button><div class="faq-a">Sí. El precio se calcula por tramos: las primeras 10 personas activas están incluidas en $124.900, y cada tramo adicional (11–50, 51–100, 101–250, 251–500, 501–1.000 y desde 1.001) tiene un valor por persona más bajo que el anterior. Solo se recalcula el tramo correspondiente, nunca todas las personas. Usa la calculadora para ver tu precio exacto.</div></div>
```

## Otros cambios de copy al ocultar precios

- Nav: se quitó el link `<a href="#pricing">Precios</a>` de `.nav-links`.
- Sección de contacto: el botón `"Solicitar evaluación y precio"` volvió a
  `"Solicitar evaluación"`.
- Sección de contacto: se quitó el trust-item `"Precio por persona activa"`
  (quedaron `"Implementación acompañada"` e `"Información protegida"`).

## Cómo reactivar

1. Pegar el bloque `<section id="pricing">...</section>` de arriba en
   `index.html`, inmediatamente antes de `<section id="faq">`.
2. Volver a agregar `<a href="#pricing">Precios</a>` en `.nav-links`.
3. Volver a agregar la entrada de FAQ de arriba (por ejemplo, como primera
   entrada del FAQ o donde tenga más sentido en ese momento).
4. Revisar si el botón/trust-item de la sección de contacto deben volver a
   mencionar precio explícitamente.
5. **Importante:** subir el parámetro de versión `?v=` en los `<link>`/`<script>`
   de `style.css` y `main.js` en `index.html` para invalidar caché (ver
   README del repo) — de lo contrario el navegador/CDN puede seguir sirviendo
   la versión sin precios.
6. Revisar que los números sigan vigentes (UF, costos, competencia) antes de
   publicar — este documento es de 2026-09-15.
