# Informe de Auditoría — Eficiencia de MVGN v2.2

> **Proyecto:** MVGN Starter Kit (auditoría meta)
> **Fecha:** 2026-06-27
> **Perfil activo durante la auditoría:** Lite (modo FLOW)
> **Brújula de la evaluación:** `Valor obtenido / Contexto consumido`
> **Aplicación meta:** este proceso de auditoría aplica los mismos principios que evalúa.

---

## 0. Inventario base (T-001)

### 0.1 Archivos por capa

| Capa | Archivo | Líneas | Bytes |
|---|---|---:|---:|
| Core (Lite) | `core/session-contract.md` | 63 | 1.914 |
| Core (Lite) | `core/kernel-spec.md` | 80 | 3.337 |
| Core (Lite) | `core/authority-map.md` | 50 | 1.441 |
| Core (Lite) | `core/README.md` | 14 | 554 |
| **Subtotal core (Lite)** | | **207** | **7.246** |
| Lite `.mvgn` | `profiles/lite/.mvgn/lite-rules.md` | 93 | 3.067 |
| Lite `.mvgn` | `profiles/lite/.mvgn/lite-engine.md` | 65 | 1.775 |
| Lite `.mvgn` | `profiles/lite/.mvgn/lite-recovery.md` | 51 | 1.045 |
| **Subtotal Lite runtime** | | **209** | **5.887** |
| **Total contexto Lite activo (core + runtime)** | | **416** | **13.133** |
| Full `.mvgn` | `.mvgn/system-rules.md` | 283 | 12.214 |
| Full `.mvgn` | `.mvgn/execution-engine.md` | 286 | 10.410 |
| Full `.mvgn` | `.mvgn/recovery-protocol.md` | 330 | 11.970 |
| Full `.mvgn` | `.mvgn/finalization-protocol.md` | **578** | **20.570** |
| Full `.mvgn` | `.mvgn/session-contract.md` | 183 | 6.748 |
| Full `.mvgn` | `.mvgn/kernel-spec.md` | 382 | 15.367 |
| Full `.mvgn` | `.mvgn/authority-map.md` | 123 | 6.773 |
| **Subtotal Full runtime (`.mvgn/`)** | | **2.165** | **84.052** |
| **Total Full activo (full runtime + core duplicado)** | | **~2.372** | **~91.298** |
| Prompts | `prompts/master-prompt.md` | 75 | 3.197 |
| Prompts (Lite) | `profiles/lite/prompts/lite-prompt.md` | 46 | 1.467 |
| CLI | `tools/mvgn.ps1` | 664 | 24.368 |
| CLI | `tools/mvgn-loader.ps1` | 240 | 8.823 |
| CLI | `install-mvgn.ps1` | 129 | 4.809 |

### 0.2 Docs de proyecto por perfil

| Doc | Full | Lite |
|---|:-:|:-:|
| `00_idea.md` | obligatorio | obligatorio |
| `01_prd.md` | obligatorio | obligatorio |
| `02_architecture.md` | **obligatorio** | opcional |
| `03_tasks.md` | obligatorio | obligatorio (en READING_TO_BUILD) |
| `04_changelog.md` | obligatorio | obligatorio (al cerrar batch) |
| `05_lessons_learned.md` | obligatorio (si hay incidentes) | solo si hay incidentes |
| `06_state_report.md` | obligatorio | obligatorio |
| `07_release_notes.md` | generado por Finalization | — |
| `08_technical_summary.md` | generado por Finalization | — |
| `09_deployment_report.md` | generado por Finalization | — |
| `10_maintenance_guide.md` | generado por Finalization | — |
| `11_performance_report.md` | generado por Finalization | — |

### 0.3 Estados y gates por perfil

| Aspecto | Full | Lite |
|---|---|---|
| Estados | 9 (INIT, PRD_REQUIRED, PRD_APPROVED, ARCH_REQUIRED, ARCH_APPROVED, READY_TO_BUILD, IN_PROGRESS, COMPLETED, BLOCKED) | 6 (INIT, PRD_REQUIRED, READING_TO_BUILD, IN_PROGRESS, COMPLETED, BLOCKED) |
| Gates | 7 (G01–G07) | 3 (G01–G03) |
| Modos | 3 (FAST, DEBUG, FULL) | 1 (FLOW) |
| Fases de recovery | 5 (FREEZE, DIAGNOSE, REBUILD, VALIDATE, RESUME) | 3 (FREEZE, DIAGNOSE, RESUME) |

### 0.4 Conclusión del inventario

- El **Lite runtime carga ~13 KB** de contexto.
- El **Full runtime carga ~91 KB** (~7× más).
- La **mayor parte del peso Full** viene de `finalization-protocol.md` (20 KB, 578 líneas) y `kernel-spec.md` (15 KB, 382 líneas).
- Hay **dos kernels** (uno en `core/` para Lite, otro en `.mvgn/` para Full) — **el mayor problema de duplicación**.

---

## 1. Principio 1 — Context Budget First

**Definición:** toda decisión de diseño debe responder "¿el beneficio justifica el contexto que consume?"

### Estado: ⚠️ AMBIGUO con violaciones claras

### Evidencia

| Hallazgo | Evidencia |
|---|---|
| No existe política explícita de "presupuesto por estado" | `core/kernel-spec.md` (80 líneas) no menciona loading policy; `.mvgn/kernel-spec.md` (382 líneas) tampoco tiene sección de budget |
| `finalization-protocol.md` es **578 líneas / 20 KB** — enorme | `.mvgn/finalization-protocol.md` — supera a cualquier otro archivo del framework |
| `system-rules.md` define **7 gates + 9 estados + 8 condiciones de bloqueo + 8 infracciones + 4 modos** sin cuantificar el costo de cada uno | `.mvgn/system-rules.md` §3, §2, §5.1, §8 |
| `execution-engine.md` define **3 modos × 6 aspectos del task loop = 18 celdas de matriz** | `.mvgn/execution-engine.md` §1 |
| El session-contract Full exige **cargar las 4 capas completas** para activar el sistema | `.mvgn/session-contract.md` §1 |

### Brechas

1. **No hay tabla "estado → docs requeridos".** El Kernel no sabe cuánto contexto debería cargar en cada momento.
2. **No hay métrica de ratio Valor/Contexto por gate o regla.** No se puede saber si G05 (Scope) o G06 (Finalization) justifican su costo.
3. **`finalization-protocol.md` no se justifica en proyectos pequeños.** 578 líneas para cerrar un proyecto de 3 tareas es desproporcionado.

### Recomendaciones

1. Añadir `kernel-spec.md` §X "Loading Policy" con tabla estado → mínimo de docs.
2. Cuantificar el costo en bytes/líneas de cada gate y publicarlo en `system-rules.md`.
3. Partir `finalization-protocol.md` en dos: una "core" de ~150 líneas (obligatoria) y una "extended" opcional.

---

## 2. Principio 2 — Minimum Effective Governance

**Definición:** impedir errores importantes con el mínimo número de documentos, gates y reglas.

### Estado: ❌ VIOLA activamente (Full); ✅ cumple (Lite)

### Evidencia

| Hallazgo | Evidencia |
|---|---|
| Full tiene **7 gates permanentes** | `.mvgn/system-rules.md` §3 — varios gates solo aplican a momentos específicos |
| **G06 (Finalization)** y **G07 (Release)** son gates pero solo se evalúan al cierre | `.mvgn/system-rules.md` §3 — G06 y G07 son terminología de cierre, no gates de desarrollo |
| **G05 (Scope)** podría ser regla del engine, no gate | `.mvgn/system-rules.md` §3 — la verificación de scope ocurre en code review, no es precondición |
| Full tiene **9 estados**, dos de los cuales son redundantes: `PRD_APPROVED` y `ARCHITECTURE_REQUIRED` | `.mvgn/system-rules.md` §2 |
| Lite tiene 6 estados; **PRD_REQUIRED** podría ser sub-estado visual de INIT | `profiles/lite/.mvgn/lite-rules.md` §2 |
| El **Finalization Protocol** genera **5 docs automáticamente** (07-11) | `.mvgn/finalization-protocol.md` §3.1 — la mayoría son para humanos, no para IA |
| **3 modos** (FAST, DEBUG, FULL) — DEBUG rara vez se usa y FULL es ceremony pesada | `.mvgn/execution-engine.md` §1 |

### Brechas

1. **Sobre-proceso en Full.** 7 gates + 9 estados + 3 modos es excesivo. El Lite demuestra que con 3 gates + 6 estados + 1 modo se obtiene control suficiente.
2. **Gates terminales no son gates.** G06 y G07 deberían ser "procedimientos terminales", no condiciones pre-ejecución.
3. **Estados intermedios innecesarios.** `PRD_APPROVED` y `ARCHITECTURE_REQUIRED` podrían colapsarse si la aprobación es simultánea al "READY_TO_BUILD" en muchos casos.

### Recomendaciones

1. Reducir gates Full de 7 a **4 esenciales**: PRD, Architecture, Tasks, State. Mover Finalization/Release a "protocolos terminales" no-gates.
2. Colapsar `PRD_APPROVED` + `ARCHITECTURE_REQUIRED` en un solo estado `APPROVED` con flags `prd_signed` y `arch_signed`.
3. Reducir modos Full de 3 a 2: FAST (default) y AUDIT (reemplaza DEBUG+FULL combinando sus mejores aspectos).
4. Hacer los docs 07-11 **opcionales** y solo recomendarlos para proyectos con release público.

---

## 3. Principio 3 — Progressive Loading

**Definición:** el Kernel nunca asume todos los documentos cargados; debe trabajar con los necesarios para el estado actual.

### Estado: ❌ VIOLA

### Evidencia

| Hallazgo | Evidencia |
|---|---|
| El session-contract Full exige **las 4 capas de `.mvgn/` cargadas** para activar | `.mvgn/session-contract.md` §1 |
| El session-contract Lite exige `lite-rules + lite-engine + 06_state_report + contract` cargados | `core/session-contract.md` §1 |
| **No hay tabla estado → docs requeridos** | `core/kernel-spec.md` y `.mvgn/kernel-spec.md` no tienen loading policy |
| El Kernel no tiene función de "solicitar carga adicional" | `core/kernel-spec.md` §6 solo lista interface entrada/salida, no carga lazy |
| El prompt del usuario propone explícitamente: `INIT → Session Contract + PRD; READY_TO_BUILD → Session Contract + Tasks + State Report; ARCHITECTURE → Session Contract + PRD + Architecture; COMPLETED → Finalization + Changelog + Lessons Learned` | prompt del usuario, sección 3 |

### Brechas

1. **Carga monolítica.** Activar MVGN Full = cargar 91 KB de una vez.
2. **No hay carga por estado.** El Kernel no puede decir "estoy en INIT, no necesito recovery-protocol".
3. **No hay mecanismo de carga perezosa.** El usuario debe saber de antemano qué docs necesita cada estado.

### Recomendaciones

1. **CRÍTICO:** Añadir a `kernel-spec.md` la sección "Loading Policy" con tabla estado → docs. Ejemplo:
   ```
   | Estado          | Docs requeridos                              |
   |-----------------|----------------------------------------------|
   | INIT            | session-contract, lite-rules, lite-engine, lite-recovery (Lite) o system-rules (Full) |
   | PRD_REQUIRED    | anteriores + lite-prompt o master-prompt     |
   | READING_TO_BUILD| anteriores + 03_tasks (cuando exista)        |
   | IN_PROGRESS     | anteriores + 06_state_report                 |
   | COMPLETED       | 06_state_report + 04_changelog + 05_lessons  |
   ```
2. Modificar `session-contract.md` para que la activación sea **mínima por estado**, no total. Activación Lite debería requerir solo `session-contract + lite-rules` en INIT.
3. Implementar comando de inspección: "¿qué necesito cargar para llegar al estado X?"
4. El usuario debe poder operar en Lite con ~3 KB de contexto en INIT, no 13 KB.

---

## 4. Principio 4 — Profile-driven Context

**Definición:** cada perfil es un compromiso distinto entre contexto y control.

### Estado: ⚠️ CUMPLE parcialmente (la idea sí; la ejecución no)

### Evidencia

| Hallazgo | Evidencia |
|---|---|
| Lite (3 gates) vs Full (7 gates) ✓ | `profiles/lite/.mvgn/lite-rules.md` §3 vs `.mvgn/system-rules.md` §3 |
| Lite (4 docs obligatorios) vs Full (11+) ✓ | `profiles/lite/.mvgn/lite-rules.md` §4 vs `.mvgn/system-rules.md` §9 |
| Lite (1 modo FLOW) vs Full (3 modos) ✓ | `profiles/lite/.mvgn/lite-engine.md` §1 vs `.mvgn/execution-engine.md` §1 |
| **PERO**: el "presupuesto de contexto" no está declarado | ningún archivo lo cuantifica |
| **PERO**: hay **dos kernels** (Lite en `core/`, Full en `.mvgn/`) | `core/` (Lite-flavored) + `.mvgn/` (Full-flavored) |
| Lite no es opt-in por feature; es un paquete separado | `install-mvgn.ps1 -Profile lite` |

### Brechas

1. **El compromiso contexto/control no es explícito.** No hay statement del estilo "Lite = máx 15 KB de runtime; Full = máx 100 KB".
2. **Duplicación del Kernel viola el principio.** Si Lite y Full son perfiles, deben compartir Kernel. Hoy son frameworks separados.
3. **No hay medición del delta real.** No se publica cuántos bytes/líneas ahorra Lite vs Full.

### Recomendaciones

1. **Publicar el presupuesto por perfil** como metadato del starter kit:
   ```
   Lite runtime: ~13 KB / ~416 líneas
   Full runtime: ~91 KB / ~2.372 líneas
   Ratio Lite/Full: 14% (Lite entrega control suficiente con 14% del contexto)
   ```
2. Medir y reportar la ratio en cada release.
3. Considerar hacer Lite el default y Full opt-in por feature individual (no por paquete).

---

## 5. Principio 5 — Single Kernel Philosophy

**Definición:** Lite y Full son perfiles del mismo Kernel; toda lógica compartida reside en el Kernel; los perfiles solo modifican gates, runtime, recovery, finalization y documentos requeridos.

### Estado: ❌ VIOLA (es el hallazgo más grave)

### Evidencia

**Duplicación de archivos core:**

| Concepto | Versión Lite (`core/`) | Versión Full (`.mvgn/`) |
|---|---|---|
| Session Contract | 63 líneas / 1.914 B | 183 líneas / 6.748 B |
| Kernel Spec | 80 líneas / 3.337 B | 382 líneas / 15.367 B |
| Authority Map | 50 líneas / 1.441 B | 123 líneas / 6.773 B |
| **Total** | **193 líneas / 6.692 B** | **688 líneas / 28.888 B** |

**Diferencias sustanciales** entre las dos versiones del mismo concepto:

- `kernel-spec.md`: la versión Full (382 líneas) tiene 5× más contenido que Lite (80). Incluye modos FAST/DEBUG/FULL, sistema de arbitraje extenso, fail-safe.
- `authority-map.md`: la versión Full (123 líneas) tiene 6 prioridades explícitas + tabla de resolución; Lite (50 líneas) tiene solo 4 prioridades resumidas.
- `session-contract.md`: Full (183 líneas) tiene 8 secciones + flujo obligatorio de 6 pasos; Lite (63 líneas) tiene 7 secciones condensadas.

Esto significa que **cualquier cambio en reglas del Kernel debe duplicarse manualmente en ambos archivos**. El framework no tiene una fuente única de verdad para sus propias reglas.

### Brechas

1. **Dos kernels separados.** Lite y Full no son perfiles del mismo Kernel; son dos kernels distintos.
2. **Riesgo de drift.** Las dos versiones pueden divergir con el tiempo (de hecho ya divergieron: la versión Full tiene fail-safe y modos que Lite no tiene).
3. **Costo de mantenimiento doble.** Cualquier mejora al Kernel cuesta 2× en esfuerzo.

### Recomendaciones

1. **CRÍTICO:** Consolidar en un único Kernel compartido. Opciones:
   - **(A) Mover todo a `core/`** y hacer que `.mvgn/` solo tenga las capas Full-específicas (system-rules Full, execution-engine, recovery-protocol completo, finalization-protocol).
   - **(B) Mover todo a `.mvgn/`** y eliminar `core/`, con un flag `mode: lite` que activa condicionalmente las secciones Lite.
   - **Recomendada: opción A.** `core/` se convierte en el Kernel compartido. Los perfiles solo modifican parámetros.
2. Las diferencias Lite/Full deben vivir en **archivos de configuración del perfil** (no en documentos separados):
   ```
   profiles/lite/kernel.config.yaml
   profiles/full/kernel.config.yaml
   ```
   Con campos como `gates: 3`, `modes: [FLOW]`, `recovery_phases: 3`, etc.
3. Eliminar la divergencia actual. Hacer un diff entre `core/kernel-spec.md` y `.mvgn/kernel-spec.md` para identificar qué se duplica y qué es realmente Lite-específico.

---

## 6. Principio 6 — Feature Cost Policy

**Definición:** toda nueva característica debe justificar su existencia. Evaluar si reduce errores, trabajo humano, mensajes o iteraciones.

### Estado: ⚠️ VIOLA parcialmente

### Evidencia

| Feature | Costo en contexto | ¿Reduce errores? | ¿Reduce trabajo humano? | ¿Reduce mensajes? | ¿Reduce iteraciones? | ¿Justifica? |
|---|---|---|---|---|---|---|
| Modo DEBUG | ~50 líneas en execution-engine | Marginal | No (suma decisión) | Marginal | No | Marginal |
| Modo FULL | ~80 líneas | No (los humanos ya revisan) | No (los humanos ya confirman) | No | No | **No** |
| G05 (Scope) | ~10 líneas | Sí (evita scope creep) | Sí | Sí | Sí | **Sí** |
| G06 (Finalization) | Gate permanente + 578 líneas de protocolo | Sí (garantiza cierre) | No (suma ceremony) | No | No | Marginal |
| G07 (Release) | ~5 líneas + nomenclatura | No (humano ya decide nombre) | No (humano ya renombra) | No | No | **No** |
| Doc 11_performance_report | ~80 líneas plantilla | No (se llena post-hoc) | No (es retrospectivo) | No | No | **No** |
| `mvgn.ps1` CLI (664 líneas) | 24 KB | N/A (es para humanos) | Sí | N/A | N/A | **Sí** (es runtime, no contexto IA) |
| `install-lite.ps1` separado | 3.3 KB | N/A | Marginal (mejor DX) | N/A | N/A | Marginal |

### Brechas

1. **No hay proceso formal de "Feature Cost Assessment".** El framework no tiene una sección que obligue a evaluar cada feature nueva.
2. **Hay features que probablemente no se justifican** (DEBUG, FULL, doc 11, G07).
3. **El éxito de Lite demuestra que el autor reconoce el problema** (Lite existe precisamente porque Full es excesivo para algunos casos), pero esto no está formalizado como policy.

### Recomendaciones

1. Añadir a `system-rules.md` §X "Feature Cost Policy" con el cuestionario del prompt:
   - ¿Reduce errores?
   - ¿Reduce trabajo humano?
   - ¿Reduce mensajes?
   - ¿Reduce iteraciones?
   - Si las cuatro son "no", la feature se rechaza.
2. **Eliminar el modo FULL.** Su valor es marginal y suma complejidad. Reemplazar con un flag `audit: true` opcional.
3. **Eliminar o hacer opcional G07 (Release).** El humano decide el nombre cuando lo decide.
4. **Eliminar el doc 11 (`performance_report.md`)** del Finalization Protocol automático. Es retrospectivo y no afecta el cierre.
5. Cada release debe publicar "removed" o "simplified", no solo "added".

---

## 7. Principio 7 — AI-first Engineering

**Definición:** MVGN optimiza para IA (ventanas de contexto reducidas, modelos gratuitos, modelos locales, asistentes conversacionales).

### Estado: ⚠️ AMBIGUO

### Evidencia a favor

- Documentos estructurados con tablas y listas: ✓ (más denso por token que prosa)
- Estados, gates y transiciones formalizados: ✓ (ayuda a la IA a razonar)
- Glosarios en cada documento: ✓
- Una sección "Finalización cancelada" cubre el caso de la IA rechazando: ✓

### Evidencia en contra

| Hallazgo | Impacto |
|---|---|
| Contexto Full = ~91 KB | Cabe en ventana de modelos grandes (200K+) pero NO en modelos locales pequeños (8K-32K) |
| `finalization-protocol.md` = 20 KB por sí solo | Un solo documento excede la ventana de muchos modelos locales |
| Docs 07-11 son para humanos pero cuentan como obligatorios para COMPLETED | La IA los carga aunque no los necesite |
| `execution-engine.md` §1 define 3 modos × 6 filas = 18 celdas de tabla con prosa explicativa | Podría ser 1 modo + 1 flag |
| `recovery-protocol.md` §2.3 tiene un bloque ASCII art decorativo (`╔══╗`) | No aporta información; ocupa tokens |

### Brechas

1. **Contexto total demasiado alto para modelos locales pequeños.** Un proyecto Lite + IA en Ollama con 8K no podría usar MVGN Full.
2. **Mezcla de docs IA y humanos.** La IA tiene que cargar release notes y maintenance guides para determinar que el proyecto está COMPLETED.
3. **Decoración visual.** Bloques ASCII art y emojis consumen tokens sin información.

### Recomendaciones

1. **Separar explícitamente "AI-load docs" de "human-facing docs":**
   - AI-load: 00_idea, 01_prd, 02_architecture, 03_tasks, 06_state_report (los 5 que la IA necesita para razonar)
   - Human-facing: 04_changelog, 05_lessons_learned, 07_release_notes, 08_technical_summary, 09_deployment, 10_maintenance, 11_performance (los 7 que el humano quiere leer)
2. **Optimizar densidad:** reemplazar prosa por tablas y listas. Una tabla de 5 filas consume menos tokens que 5 párrafos.
3. **Eliminar decoración ASCII.** Los bloques `╔══╗` no aportan información.
4. **Lite debería caber en 32K-64K de contexto total.** Hoy son 13 KB de runtime + docs del proyecto. Es viable.
5. **Full debería caber en 128K.** Hoy son 91 KB + docs. También viable, pero con margen limitado.

---

## 8. Nueva responsabilidad del Kernel — Optimización automática de contexto

**Definición:** el Kernel debe optimizar automáticamente el contexto de trabajo, intentando operar con el menor conjunto posible de documentos activos.

### Estado: ❌ NO IMPLEMENTADO

### Evidencia

| Búsqueda | Resultado |
|---|---|
| Búsqueda de "loading policy" en `kernel-spec.md` (ambas versiones) | No encontrado |
| Búsqueda de "context budget" en todos los archivos `.md` | No encontrado |
| Búsqueda de "lazy load" en todos los archivos | No encontrado |
| Búsqueda de "mínimo de documentos" | Solo en `lite-rules.md` §4 (docs obligatorios, no carga) |
| ¿El Kernel ajusta lo que carga según el estado? | **No.** La única "optimización" es la diferencia Lite/Full a nivel de perfil. |
| ¿El Kernel mide el contexto activo? | **No.** |

### Brechas

1. **El Kernel no optimiza.** La carga de contexto es estática (todo o nada por perfil).
2. **No hay introspección.** El humano/IA no puede preguntar "¿cuánto contexto estoy usando?".
3. **No hay carga perezosa.** Si necesitas `recovery-protocol.md` en medio de `IN_PROGRESS`, debes haberlo cargado desde el inicio.

### Recomendaciones

1. **Añadir al Kernel una "Context Optimization Policy":**
   ```
   CONTEXT_POLICY = {
     "INIT":            ["session-contract", "lite-rules"],
     "PRD_REQUIRED":    ["session-contract", "lite-rules", "lite-prompt", "01_prd"],
     "READING_TO_BUILD":["session-contract", "lite-rules", "lite-engine", "03_tasks", "06_state_report"],
     "IN_PROGRESS":     ["session-contract", "lite-engine", "06_state_report"],
     "COMPLETED":       ["06_state_report", "04_changelog", "05_lessons_learned"],
     "BLOCKED":         ["lite-recovery", "06_state_report"]
   }
   ```
2. **Añadir comando `mvgn context [--state X]`** que muestre qué docs están cargados y cuáles faltarían.
3. **Medir uso real.** Cada sesión debería reportar bytes/líneas consumidos por capa.

---

## 9. Restricción permanente — No growth by accumulation

**Definición:** MVGN no debe crecer por acumulación; debe evolucionar aumentando `Valor/Contexto`.

### Estado: ❌ NO IMPLEMENTADO (mecanismo); ⚠️ CUMPLE parcialmente (intención)

### Evidencia

**Crecimiento histórico observado:**

| Versión | Cambio | Tipo |
|---|---|---|
| Inicial | 4-5 docs, ~3-4 gates | base |
| v2.0 | añade Kernel + CLI | valor (orquestación) |
| v2.1 | añade Finalization Protocol (578 líneas, 5 docs auto-gen) | **acumulación** |
| v2.2 | añade perfil Lite | valor (alternativa ligera) |

**No hay "deprecation policy":**

- No existe en `system-rules.md` ninguna sección sobre cómo eliminar/deprecar features.
- No hay release notes que digan "esto se eliminó".
- No hay auditoría que pregunte "¿qué reglas no se han usado en N proyectos?".
- Phase 0 → Phase 7 del starter kit muestran crecimiento acumulativo puro.

**Pero la intención está presente:**

- Lite existe precisamente porque el autor reconoció que Full era excesivo para algunos casos.
- La estructura de perfiles本身就是 una declaración de que el tamaño importa.

### Brechas

1. **No hay mecanismo formal anti-acumulación.**
2. **No se reporta la ratio Valor/Contexto por release.**
3. **No hay deprecation policy.**

### Recomendaciones

1. **Añadir a `system-rules.md` §X "Deprecation Policy":**
   - Cada release debe listar qué se eliminó o simplificó, no solo qué se añadió.
   - Una regla que no se ha usado en 3 releases consecutivos se marca como candidata a eliminar.
   - Una regla que se ha usado pero genera fricción se marca como candidata a simplificar.
2. **Publicar la ratio Valor/Contexto por release** (ej: "v2.3 entrega 15% más control con 10% menos contexto").
3. **Auditoría anual** del framework contra sí mismo.
4. Adoptar la regla "ratio Valor/Contexto" como métrica oficial.

---

## 10. Hallazgos cruzados y priorización (T-011)

### 10.1 Mapa de brechas

| # | Brecha | Principios violados | Impacto | Esfuerzo |
|---|---|---|---|---|
| B-01 | Dos kernels separados (Lite en `core/` + Full en `.mvgn/`) | 5, 4, 7 | **Alto** | **M** |
| B-02 | Sin loading policy por estado | 3, 8 | **Alto** | **S** |
| B-03 | `finalization-protocol.md` (578 líneas, 20 KB) sobredimensionado | 1, 2, 7 | **Alto** | **M** |
| B-04 | 7 gates en Full cuando 3-4 son esenciales | 2, 6 | Medio | **S** |
| B-05 | 9 estados en Full con redundancias intermedias | 2 | Medio | **S** |
| B-06 | 3 modos en Full (DEBUG/FULL marginales) | 2, 6 | Bajo | **S** |
| B-07 | Docs 07-11 obligatorios cuando la mayoría son para humanos | 2, 7 | Medio | **S** |
| B-08 | No hay Feature Cost Policy formal | 6, 9 | Medio | **S** |
| B-09 | No hay Deprecation Policy | 9 | Medio | **S** |
| B-10 | No hay medición de contexto activo por sesión | 1, 3, 8 | Bajo | **M** |
| B-11 | Decoración visual (bloques ASCII art) consume tokens | 7 | Bajo | **S** |
| B-12 | Docs de proyecto mezclan AI-load y human-facing | 7 | Medio | **M** |
| B-13 | El presupuesto de contexto por perfil no es explícito | 1, 4 | Bajo | **S** |
| B-14 | Finalization Protocol no justificado para proyectos pequeños | 2, 6 | Medio | **M** |
| B-15 | Docs 04 (changelog) + 05 (lessons) están mal clasificados en Lite | 4, 7 | Bajo | **S** |

### 10.2 Quick wins (S + alto impacto)

1. **Eliminar decoración ASCII** (B-11) — 1 hora, baja fricción.
2. **Eliminar doc 11 (`performance_report.md`) del Finalization Protocol** (parte de B-07) — 1-2 horas.
3. **Hacer opcional G07 (Release)** (parte de B-04) — 30 min.
4. **Eliminar modo FULL** (B-06) — 1 hora.
5. **Eliminar modo DEBUG** (B-06) — 1 hora. Reemplazar con flag `audit: true`.
6. **Hacer opcionales docs 07-10** (resto de B-07) — 1 hora.
7. **Añadir Loading Policy table al Kernel** (B-02) — 2-3 horas.
8. **Publicar presupuesto por perfil en README** (B-13) — 30 min.

**Total quick wins: ~10 horas, baja fricción, mejora inmediata.**

### 10.3 Refactors estructurales (M + alto impacto)

1. **Consolidar los dos kernels** (B-01) — 1-2 sprints. CRÍTICO.
2. **Partir `finalization-protocol.md` en core + extended** (B-03, B-14) — 1 sprint.
3. **Implementar carga perezosa y medición de contexto** (B-02, B-10) — 1-2 sprints.
4. **Separar AI-load docs de human-facing docs** (B-12) — 1 sprint.

### 10.4 Roadmap sugerido (3 releases)

#### v2.3 — Quick wins (1 sprint)
- [ ] Quick wins 1-8
- [ ] Añadir Feature Cost Policy a `system-rules.md`
- [ ] Añadir Deprecation Policy
- [ ] Publicar ratio Lite/Full en README

#### v2.4 — Consolidación del Kernel (2 sprints)
- [ ] B-01: Consolidar kernel único en `core/`
- [ ] Mover parámetros Lite/Full a archivos de config por perfil
- [ ] Eliminar divergencia entre las dos versiones

#### v2.5 — Optimización de contexto (2 sprints)
- [ ] B-02 + B-10: Implementar Loading Policy real
- [ ] B-03 + B-14: Finalization Protocol lite + extended
- [ ] B-12: Separar AI-load de human-facing docs
- [ ] Primer release con métrica Valor/Contexto publicada

### 10.5 Métricas de éxito por release

| Release | Métrica |
|---|---|
| v2.3 | Quick wins completados; ratio Lite/Full documentado |
| v2.4 | Un solo Kernel; cero duplicación de archivos core |
| v2.5 | Lite runtime ≤ 10 KB; Full runtime ≤ 70 KB; soporte para modelo local 32K |

---

## 11. Resumen ejecutivo

**MVGN v2.2 cumple 2 de 7 principios explícitamente (Lite como respuesta a sobre-proceso, formato AI-friendly). Viola 4 activamente (Single Kernel, Progressive Loading, no growth-by-accumulation, automatic context optimization). Y es ambiguo en 1 (Context Budget First).**

**El hallazgo más grave es la duplicación del Kernel** (`core/` + `.mvgn/`), que viola Single Kernel Philosophy y hace que cualquier mejora cueste 2× en esfuerzo.

**El segundo hallazgo más grave es la ausencia de Loading Policy**, que hace que MVGN Full consuma ~91 KB de contexto de forma monolítica en lugar de cargar progresivamente según el estado.

**Hay una hoja de ruta clara de 3 releases** para resolver las brechas, con quick wins que pueden hacerse en ~10 horas y dar mejora inmediata.

**El framework tiene el problema opuesto al que ataca:** dice "minimum effective governance" pero su perfil Full es lo opuesto a mínimo. La existencia misma de Lite demuestra que el autor reconoce el problema, pero esto no está formalizado como política.
