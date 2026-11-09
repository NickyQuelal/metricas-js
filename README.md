# Actividad: Métricas de calidad en JavaScript (ISO/IEC 25010)

**Nombre:** Nicole Estefanía Quelal Néjer **Fecha:** 04/11/2026
**Modalidad:** individual · **Código evaluado:** `src/pedidos.js` (Anexo A)
**Repositorio:** https://github.com/NickyQuelal/metricas-js· Ramas: `medicion-inicial` y `refactorizacion`

---

## 1. Modelo de calidad (GQM) — Paso 2

| Característica ISO 25010 | Objetivo | Pregunta | Métrica | Meta |
|---|---|---|---|---|
| Mantenibilidad (modificabilidad, analizabilidad) | Que el cálculo de pedidos sea fácil de entender y cambiar | ¿Qué tan fácil es modificar el cálculo de pedidos sin repetir cambios? | CC por función, Índice de mantenibilidad, % duplicación | CC máx ≤ 10 (prom ≤ 5) · MI ≥ 65 (ideal ≥ 85) · duplicación ≤ 3 % |
| Capacidad de prueba | Que las pruebas ejerciten todas las decisiones del código | ¿Las pruebas recorren todas las ramas de descuentos y cupones? | Cobertura de líneas y de ramas | Líneas ≥ 70 % · ramas ≥ 60 % |
| Fiabilidad | Que el código no tenga defectos conocidos | ¿Cuántos defectos hay por cada 1 000 líneas? | Errores ESLint, pruebas fallidas, densidad de defectos | 0 errores · densidad < 1 por KLOC |

---

## 2. Medición inicial — Pasos 3 a 6 (rama `medicion-inicial`)

| Herramienta | Resultado inicial |
|---|---|
| `sloc` | Physical = 35 · **Source (SLOC) = 32** · Comment = 1 |
| ESLint (complexity) | `calcularTotal` = **8** · `calcularTotalTienda` = **6** |
| ESLint (estándares) | 0 errores · 0 advertencias (umbral complexity = 10) |
| `es6-plato` | Mantenibilidad = **59.06** |
| `jscpd` | 1 clon · **12 líneas duplicadas (34.29 %)** |
| `jest --coverage` (solo las 2 pruebas del Anexo B) | Stmts 47.61 % · Branch 50 % · Funcs 50 % · Lines 47.61 % (sin cubrir: líneas 12, 15, 21-32) |
| `jest --coverage` (13 pruebas, paso 6) | Stmts / Branch / Funcs / Lines = **100 %** |
| Densidad de defectos | (0 pruebas fallidas + 0 errores ESLint) ÷ (32 ÷ 1000) = **0 por KLOC** |

> Se usó SLOC (32) y no LOC físico (35) para la densidad, como pide la guía.

### Cálculo manual de la CC — Paso 4

Función `calcularTotal` (grafo en `docs/grafo_calcularTotal.png`):

- **Con la fórmula del grafo:** N = 13 nodos, E = 19 aristas, P = 1 → CC = 19 − 13 + 2 = **8**
- **Contando decisiones + 1:** `for` (1) + `if` (1) + `&&` (1) + `if VIP` (1) + `else if FRECUENTE` (1) + `if total > 100` (1) + `||` (1) = 7 → 7 + 1 = **8**
- **ESLint:** 8. **Coinciden.** ESLint cuenta cada `&&` y `||` como una decisión, y en el grafo se representan como nodos separados (4 y 11).

Top de funciones por CC (el código solo tiene 2): 1) `calcularTotal` = 8 · 2) `calcularTotalTienda` = 6.

---

## 3. Hallazgos y acciones — Paso 7

| # | Problema | Métrica afectada | Acción propuesta |
|---|---|---|---|
| 1 | `calcularTotal` y `calcularTotalTienda` repiten el mismo bloque (subtotal + descuento de cliente) | Duplicación 34.29 %, MI 59.06 (< 65) | Extraer `calcularSubtotal` y `aplicarDescuentoCliente`; `calcularTotal` reutiliza `calcularTotalTienda` |
| 2 | Cadena `if / else if` de descuentos y números mágicos (0.9, 0.95, 100, 5) | CC 8 y 6 | Usar un `Map` de descuentos y constantes con nombre |
| 3 | `calcularTotal` hace 4 cosas a la vez (filtra, suma, descuenta por cliente, descuenta fijo) | CC 8, MI | Funciones pequeñas con una sola responsabilidad |
| 4 | Cobertura de 47.61 % con las pruebas del Anexo B | Cobertura | Completar pruebas hasta 100 % de ramas (13 pruebas, todas con `expect`) |

---

## 4. Plantilla antes / después — Paso 8

Fórmula de variación: (después − antes) ÷ antes × 100.

| Métrica | Umbral | Antes | Después | Variación | ¿Cumple (después)? |
|---|---|---|---|---|---|
| SLOC | Solo referencia | 32 | 29 | −9.4 % | — |
| CC promedio por función | ≤ 5 | 7.0 (8 y 6) | 1.57 (7 funciones) | −77.6 % | Sí (antes: No) |
| CC máxima | ≤ 10 | 8 | 2 | −75 % | Sí |
| Funciones con CC > 10 | 0 | 0 | 0 | 0 % | Sí |
| Índice de mantenibilidad (Plato) | ≥ 65 / ≥ 85 | 59.06 | 88.14 | +49.2 % | Sí, nivel "bueno" (antes: No) |
| Errores ESLint | 0 | 0 | 0 | 0 % | Sí |
| Advertencias ESLint | Deben disminuir | 0 | 0 | 0 % | Sí (ya eran 0) |
| Líneas duplicadas (jscpd) | ≤ 3 % | 34.29 % | 0 % | −100 % | Sí (antes: No) |
| Cobertura de líneas | ≥ 70 % | 100 % | 100 % | 0 % | Sí |
| Cobertura de ramas | ≥ 60 % | 100 % | 100 % | 0 % | Sí |
| Densidad de defectos | < 1 por KLOC | 0 | 0 | 0 % | Sí |

Notas:
- Las 13 pruebas pasaron después de cada commit (el comportamiento no cambió).
- Con un umbral de `complexity` de 5, ESLint daba 2 advertencias antes (8 y 6) y 0 después.
- Si se quiere contar la cobertura de las 2 pruebas del Anexo B como "antes" (47.61 % líneas, 50 % ramas), la mejora de cobertura es +52.4 puntos en líneas y +50 puntos en ramas.

**Commits de la rama `refactorizacion`:**
1. `Elimina duplicación: extrae calcularSubtotal y aplicarDescuentoCliente`
2. `Usa Map de descuentos y constantes con nombre en lugar de if/else y números mágicos`
3. `Compatibilidad con Plato (sin ??) y deja de versionar reportes generados`

---

## 5. Reflexión

**1. ¿Qué métrica mejoró más y qué cambio concreto la mejoró?**
La duplicación bajó de 34.29 % a 0 % (−100 %), al extraer `calcularSubtotal` y `aplicarDescuentoCliente` y hacer que `calcularTotal` reutilice `calcularTotalTienda`. Esa misma acción subió el índice de mantenibilidad de 59.06 a 88.14 y redujo la CC máxima de 8 a 2 (el `Map` de descuentos eliminó la cadena `if / else if`).

**2. ¿Alguna métrica empeoró al mejorar otra?**
Sí, el LOC físico subió de 35 a 37 líneas y el número de funciones pasó de 2 a 7, porque cada función nueva trae su declaración, llaves y líneas en blanco. El SLOC sí bajó (32 → 29) porque se eliminó el código repetido. No es un problema: más funciones pequeñas no significan peor mantenibilidad (el MI subió), y cada función es más fácil de leer y probar. Sería un problema solo si se fragmentara tanto que seguir el flujo fuera difícil.

**3. ¿Una cobertura del 100 % garantiza que no hay errores?**
No. Mi código tiene 100 % de cobertura de líneas y ramas y aun así tiene un defecto: `calcularTotal({ cliente: "VIP", cupon: true, items: [{ cantidad: 1, precio: 5 }] })` devuelve **−0.5**, un total negativo, porque el cupón resta 5 sin comprobar que el total sea mayor. Además, `calcularTotal({ cliente: "VIP" })` (sin `items`) lanza un error. La cobertura solo dice qué líneas se ejecutaron, no si las pruebas comprueban todos los casos relevantes. Tampoco se corrigió en la refactorización porque ahí el comportamiento debía mantenerse; el arreglo sería `Math.max(0, total - 5)`.

**4. ¿Qué característica de ISO/IEC 25010 no pudieron medir y cómo la medirían?**
Seguridad y eficiencia de desempeño. La seguridad se mediría con `npm audit` (dependencias vulnerables), un análisis estático de seguridad (SAST) como ESLint con `eslint-plugin-security` o CodeQL, y validación de entradas. La eficiencia se mediría con pruebas de rendimiento (por ejemplo, tiempo de `calcularTotal` con 100 000 ítems usando `console.time` o `benchmark.js`). La usabilidad tampoco se puede medir con estas herramientas; requeriría pruebas con usuarios.

**5. Umbrales para aceptar código nuevo (como líder de proyecto)**
- 0 errores de ESLint y 0 advertencias nuevas.
- CC ≤ 10 por función (ideal ≤ 5).
- Índice de mantenibilidad ≥ 85 por archivo.
- Duplicación ≤ 3 %.
- Cobertura de líneas ≥ 80 % y de ramas ≥ 70 % en el código nuevo.
- Todas las pruebas pasan, con `expect` significativos.
- Ningún defecto conocido abierto en el módulo (densidad < 1 por KLOC).

---

## 6. Cómo reproducir

```bash
npm install
npm run tamano
npm run lint
npm run duplicados
npm run mantenibilidad    # abre reporte-plato/index.html
npm run cobertura         # abre coverage/lcov-report/index.html
```
