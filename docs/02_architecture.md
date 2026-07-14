# 02 — Architecture & ADRs

> MVGN v3.5 — AI Governance Runtime + Telemetry TUI

---

## Regla: ADRs como contrato de arquitectura

> **A partir de v3.0, ningún cambio estructural importante (nuevo subsistema, cambio del Kernel, modificación del flujo de eventos, etc.) podrá implementarse sin un ADR aprobado.**

Los ADRs no son documentación opcional ni retrospectiva. Son el **mecanismo oficial de governance del Runtime**. Cada ADR constituye un gate arquitectónico: el Kernel no debe despachar implementación de un cambio estructural hasta que su ADR esté aprobado con firma humana.

Esta regla aplica para:
- Nuevos subsistemas
- Modificación del Kernel o su interfaz
- Cambios en el flujo de eventos
- Nuevos artefactos del Runtime (manifiestos, schemas)
- Cambios en la política de contexto

No aplica para:
- Corrección de bugs
- Cambios cosméticos en documentación
- Tareas atómicas dentro del alcance de un ADR ya aprobado

---

## ADR-001: Event-Driven AI Governance Runtime

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-08
**Decisor:** Ncape [✓]

### Contexto

MVGN nació como **Minimum Viable Governed Engineering** — un framework de reglas, gates y documentos para gobernar proyectos de desarrollo asistidos por IA. En v2.3, el framework demostró que la gobernanza mínima viable es efectiva: Lite runtime de ~12 KB, 3 gates, 6 estados, modo FLOW.

Sin embargo, el panorama tecnológico ha evolucionado. La IA ya no es solo un asistente conversacional: es un agente que ejecuta, decide y opera dentro de sistemas. La gobernanza ya no puede ser solo documentación estática. Necesita ser un **Runtime activo** que:

- Registre qué ocurre durante las sesiones (telemetría)
- Rastree qué actor hizo qué (trazabilidad)
- Derive métricas de productividad y salud del proyecto (analítica)
- Mantenga un historial inmutable de eventos (event history)
- Identifique actores de forma estable multi-proveedor (actor identity)

### Decisión

**M.V.G.N. evoluciona de un Framework de Gobernanza a un Event-Driven AI Governance Runtime.**

El posicionamiento completo incorpora el paradigma que define la arquitectura: **event-driven**. No es un Runtime que además tiene eventos. Es un Runtime donde los eventos son el mecanismo fundamental de representación de cambio.

La palabra "evoluciona" es deliberada. MVGN no rompe con su pasado — lo integra y lo supera. Las reglas, gates, estados y documentos de v2.3 siguen siendo la base. Sobre ellos se construye un Runtime regido por eventos, con trazabilidad, identidad de actores y métricas derivadas como capacidades nativas.

Esto implica:

1. **El Kernel** evoluciona de orquestador de capas a orquestador de capas + subsistemas.
2. **Event-Driven Runtime (ADR-002)** es el principio fundacional: todo cambio relevante es un evento.
3. **Los subsistemas de Telemetry, Traceability y Analytics** se incorporan como ciudadanos de primera clase.
4. **El Event History** se convierte en la fuente de verdad histórica (Append Only).
5. **Actor Identity** reemplaza Agent Identity con un esquema multi-tipo (IA, humano, automatización, CI/CD, scripts).
6. **Session Manager** se separa del Kernel como subsistema independiente.
7. **Skills** reemplazan el concepto de "prompts" como unidades reutilizables de comportamiento.
8. **Execution** reemplaza "Engine" como nombre del módulo de ejecución.
9. **Runtime Schema Version** acompaña cada artefacto de datos para permitir evolución independiente del formato.

### Consecuencias

| Positivas | Negativas |
|-----------|-----------|
| Posicionamiento claro y diferenciado | Incremento inevitable del presupuesto de contexto |
| Arquitectura preparada para ecosistema multi-actor | Riesgo de sobreingeniería si no se aplican las policies |
| ADRs como contrato: cada cambio estructural es trazable | Nuevos ADRs requieren aprobación humana |
| Runtime Specification pública (07_runtime_spec.md) | Un documento más que mantener |

### Opciones consideradas

1. **Mantener posicionamiento v2.3**: Rechazado. No refleja la dirección necesaria.
2. **"AI Governance Runtime" sin event-driven**: Rechazado. Incompleto — el paradigma event-driven es la innovación central de v3.0.
3. **Renombrar a "AI Agent Governance Platform"**: Rechazado. "Runtime" es más preciso que "Platform" y "Actor" es más inclusivo que "Agent".
4. **Crear un producto separado**: Rechazado. v3.0 es evolución, no bifurcación.

---

## ADR-002: Event-Driven Runtime

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-08
**Decisor:** Ncape [✓]

### Contexto

Para que Telemetry, Traceability, Analytics y Event History funcionen como un sistema coherente, el Runtime necesita un paradigma unificado de representación de cambios. Sin este principio, cada subsistema define sus propios eventos y no hay interoperabilidad.

### Decisión

> **"Todo cambio relevante dentro del Runtime se representa mediante un evento estructurado."**

Este principio es el fundamento arquitectónico de v3.0. Implica:

1. Las transiciones de estado del proyecto son eventos.
2. Las operaciones de los actores (IA, humano, automation) son eventos.
3. Las decisiones del Kernel (dispatch, arbitraje, bloqueo) son eventos.
4. Los gates (aprobados, fallados) son eventos.
5. Las operaciones de recovery y finalization son eventos.

### Consecuencias

| Positivas | Negativas |
|-----------|-----------|
| Lenguaje común para todos los subsistemas | Toda acción significativa debe modelarse como evento |
| El Event History puede reconstruir el estado completo | Los eventos deben tener un schema consistente |
| Analytics puede derivar métricas sin conocer la semántica interna | Curva de aprendizaje del paradigma |

### Relación con otros ADRs

- ADR-003 (Event Bus) define el mecanismo de dispatch
- ADR-004 (Runtime Events) define el catálogo de eventos
- ADR-004 también define Event Relationships como extensión del schema

---

## ADR-003: Event Bus

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-08
**Decisor:** Ncape [✓]

### Contexto

Con ADR-002 estableciendo que todo cambio relevante es un evento, surge la pregunta: ¿cómo fluyen esos eventos a los subsistemas que los consumen (Runtime State, Event History, Analytics, Traceability)?

Sin un mecanismo definido, cada subsistema debe implementar su propia escucha, lo que crea acoplamiento.

### Decisión

Introducir el concepto arquitectónico de **Event Bus** como punto único de enrutamiento.

```
Actor → Kernel → Event → Event Bus → [Runtime State, Event History, Analytics, Traceability]
```

**Importante:** El Event Bus es un **concepto arquitectónico**, no una infraestructura pesada. No es Kafka, RabbitMQ ni un message broker. Es una interfaz de dispatch que:

1. Recibe eventos del Kernel y los subsistemas
2. Los distribuye a los consumidores registrados
3. No almacena, no transforma, no encola

### Consecuencias

| Positivas | Negativas |
|-----------|-----------|
| Punto único de dispatch — añadir nuevo suscriptor no cambia emisores | Abstracción adicional que debe documentarse |
| Desacoplamiento entre emisores y consumidores | Riesgo de sobreingeniería si se complexifica |

### Restricción

Si la especificación del Event Bus supera las **100 líneas**, debe justificarse formalmente.

---

## ADR-004: Runtime Events Catalog

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-08
**Decisor:** Ncape [✓]

### Contexto

El ADR-002 establece que todo cambio relevante es un evento, pero no define cuáles son esos eventos. Sin un catálogo normalizado, distintos subsistemas pueden usar nombres distintos para el mismo concepto.

### Decisión

Establecer el siguiente catálogo oficial de eventos del Runtime, clasificado por dominio:

#### Dominio: Session

| Evento | Disparador | Payload mínimo |
|--------|-----------|----------------|
| `SESSION_STARTED` | Inicio de sesión | actor_id, timestamp, profile |
| `SESSION_RESUMED` | Reanudación de sesión | actor_id, timestamp, previous_session_id |
| `SESSION_FROZEN` | Congelación por recovery | actor_id, timestamp, reason |
| `SESSION_CLOSED` | Cierre de sesión | actor_id, timestamp, duration_ms |

#### Dominio: Task

| Evento | Disparador | Payload mínimo |
|--------|-----------|----------------|
| `TASK_CREATED` | Nueva tarea en 03_tasks.md | task_id, rf_ref, actor_id |
| `TASK_STARTED` | Inicio de ejecución | task_id, actor_id, timestamp |
| `TASK_COMPLETED` | Tarea completada + verificada | task_id, actor_id, output_summary |
| `TASK_CANCELLED` | Tarea cancelada | task_id, actor_id, reason |
| `TASK_BLOCKED` | Tarea bloqueada | task_id, blocker_code, reason |

#### Dominio: Gate

| Evento | Disparador | Payload mínimo |
|--------|-----------|----------------|
| `GATE_APPROVED` | Gate superado | gate_code (G01–G03), approved_by |
| `GATE_FAILED` | Gate no superado | gate_code, reason, blocker_code |

#### Dominio: Recovery

| Evento | Disparador | Payload mínimo |
|--------|-----------|----------------|
| `RECOVERY_STARTED` | Activación de recovery | trigger (B-06/humano/cascada) |
| `RECOVERY_FINISHED` | Recovery completado | new_state, docs_rebuilt[] |

#### Dominio: Profile

| Evento | Disparador | Payload mínimo |
|--------|-----------|----------------|
| `PROFILE_CHANGED` | Cambio de perfil | from, to, timestamp |

#### Dominio: Skill

| Evento | Disparador | Payload mínimo |
|--------|-----------|----------------|
| `SKILL_LOADED` | Skill cargada | skill_name, version |
| `SKILL_UNLOADED` | Skill descargada | skill_name |

#### Dominio: System

| Evento | Disparador | Payload mínimo |
|--------|-----------|----------------|
| `STATE_CHANGED` | Cambio de estado del proyecto | from, to, transition |
| `RELEASE_CREATED` | Release generada | version, semver |
| `MANIFEST_UPDATED` | Runtime Manifest modificado | previous_version, new_version |
| `ACTOR_REGISTERED` | Nuevo actor registrado | actor_id, actor_type, provider |

### Event Relationships

Cada evento puede incluir relaciones con otros eventos:

```yaml
event:
  id: "evt-001"
  type: TASK_COMPLETED
  relationships:
    - parent_event: "evt-000"    # TASK_STARTED
      relationship: "concludes"
    - parent_event: "evt-002"    # TASK_CREATED
      relationship: "implements"
```

Esto permite reconstruir completamente la historia de una tarea:

```
Task Creada → Task Iniciada → Task Completada
     ↑            ↑               ↑
  actor-X      actor-Y         actor-Z
```

**Decisión:** Event Relationships pertenece al **Event History**, no a Traceability. Traceability consume las relaciones; Event History las almacena.

---

## ADR-005: Actor Identity

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-08
**Decisor:** Ncape [✓]

### Contexto

El concepto de "Agent Identity" asumía que solo agentes de IA interactúan con el sistema. En la práctica, humanos, automatizaciones, CI/CD y scripts también realizan acciones que deben ser trazables.

### Decisión

Reemplazar **Agent Identity** por **Actor Identity** con el siguiente esquema:

```yaml
actor:
  id: string              # único dentro del proyecto
  type: enum              # [ai, human, automation, ci_cd, script, system]
  name: string            # nombre legible
  provider: string        # [openai, anthropic, google, mistral, ...] (si type=ai)
  model: string           # (si type=ai)
  adapter: string         # (si aplica)
  metadata: map           # extensible para futuros tipos
```

**Principios del esquema:**

1. **No depende de nombres comerciales temporales.** `provider` es un string, no un enum fijo. Nuevos proveedores se añaden por configuración, no por cambio de schema.
2. **Multi-tipo.** Un actor puede ser IA, humano o automatización sin cambiar la estructura.
3. **Extensible.** `metadata` permite capturar particularidades sin modificar el schema base.
4. **Sin dependencia de red.** El esquema funciona offline — no requiere validación externa.

### Migración desde Agent Identity

Los eventos existentes con Agent Identity se migran automáticamente estableciendo `type: ai`. El campo `agent_id` pasa a `actor_id`.

---

## ADR-006: Session Manager

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-08
**Decisor:** Ncape [✓]

### Contexto

Actualmente, el Kernel maneja lógica de sesiones: inicio, cierre, resume, freeze. Esto viola el principio de responsabilidad única. El Kernel debe ser orquestador puro.

### Decisión

Separar del Kernel toda la lógica relacionada con sesiones en un subsistema **Session Manager** responsable de:

| Responsabilidad | Descripción |
|----------------|-------------|
| **Iniciar sesión** | Crear nueva sesión, cargar perfil, validar estado |
| **Cerrar sesión** | Finalizar sesión, escribir evento de cierre, actualizar state_report |
| **Resume** | Reanudar sesión anterior, verificar validez |
| **Freeze** | Congelar sesión por recovery o bloqueo |
| **Recovery trigger** | Detectar condiciones de recovery y señalizar al Kernel |
| **Exportación de contexto** | Generar snapshot del contexto actual |
| **Ciclo de vida** | Gestionar el estado de la sesión (activa, frozen, cerrada) |

**El Kernel permanece como orquestador:**
- Kernel decide CUÁNDO iniciar/cerrar/reanudar una sesión
- Session Manager ejecuta CÓMO iniciar/cerrar/reanudar

### Interfaz Kernel ↔ Session Manager

```
Kernel → SessionManager.start(profile, actor)
Kernel → SessionManager.resume(session_id)
Kernel → SessionManager.freeze(reason)
Kernel → SessionManager.close()
SessionManager → Kernel: session_started_event | session_error_event
```

### Consecuencias

| Positivas | Negativas |
|-----------|-----------|
| Kernel más limpio (solo orquesta) | Un subsistema más que mantener |
| Session Manager puede evolucionar independientemente | Riesgo de que crezca más allá de su alcance |
| Recovery trigger desacoplado del Kernel | Documentación adicional |

### Restricción

Session Manager no debe gestionar tareas, reglas, gates ni analítica. Su alcance se limita al ciclo de vida de la sesión.

---

## ADR-007: Runtime Manifest

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-08
**Decisor:** Ncape [✓]

### Contexto

Actualmente no hay un archivo que describa la identidad técnica del Runtime: qué versión corre, qué perfil está activo, qué capacidades están habilitadas, qué skills están instaladas. Esta información está dispersa en varios archivos.

### Decisión

Incorporar un manifiesto oficial del Runtime: **`mvgn-runtime.json`**

```json
{
  "runtime_version": "3.0.0",
  "schema_version": "1.0.0",
  "profile": "lite",
  "capabilities": {
    "telemetry": true,
    "traceability": true,
    "analytics": false,
    "event_history": true
  },
  "skills": [],
  "policies": {
    "feature_cost": true,
    "deprecation": true,
    "context_budget_protection": true
  },
  "adapters": [],
  "actors": []
}
```

### Responsabilidades del Manifest

- Versión del Runtime
- Versión del schema
- Perfil activo
- Capacidades habilitadas (telemetry, traceability, analytics)
- Skills instaladas
- Policies activas
- Adapters configurados
- Actores registrados en el proyecto

### Lo que NO es el Manifest

- **No es Runtime State.** El estado vivo del proyecto sigue siendo `.mvgn-context.json`.
- **No es Event History.** El historial de eventos es el registro del pasado.
- **No es documentación.** Es un archivo máquina-legible.

### Runtime Schema Version

El Manifest incluye `schema_version` como campo independiente de `runtime_version`. La justificación:

> **El formato de los datos (Event History, Runtime Manifest, Context) puede evolucionar independientemente de la versión del Runtime.**

| Concepto | Cambia cuando | Ejemplo |
|----------|---------------|---------|
| `runtime_version` | Cambia la implementación del Runtime | `3.0.0` → `3.1.0` |
| `schema_version` | Cambia la estructura de cualquier artefacto de datos | `1.0.0` → `1.1.0` (nuevo campo opcional) |

Esta separación es práctica estándar en proyectos como **Kubernetes** (apiVersion), **OpenTelemetry** (schema_url) y **Terraform** (provider schema).

### Restricciones

- **Tamaño máximo: ≤ 3 KB**
- Se regenera al cambiar perfil, skills o policies — no en cada operación
- No se actualiza en cada evento (solo en cambios estructurales)
- `schema_version` se actualiza independientemente de `runtime_version`

---

## ADR-008: Context Budget Protection

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-08
**Decisor:** Ncape [✓]

### Contexto

La auditoría v2.2 identificó que el Context Budget First es uno de los principios más importantes de MVGN, pero no tenía una expresión operativa. Los subsistemas nuevos de v3.0 (Telemetry, Traceability, Analytics) corren el riesgo de incrementar el contexto activo sin justificación.

### Decisión

Establecer el siguiente principio como regla permanente de diseño:

> **"Ningún subsistema podrá incrementar el presupuesto de contexto del Runtime si no está siendo utilizado activamente."**

### Aplicación por subsistema

| Subsistema | Comportamiento |
|------------|---------------|
| **Telemetry** | Escribe eventos al Event History. **No carga contexto activo.** |
| **Traceability** | Registra relaciones. **No participa en decisiones del Runtime ni en el contexto activo.** |
| **Analytics** | **Bajo demanda.** Se ejecuta solo cuando se solicita. No tiene presencia en el contexto activo. |
| **Skills** | **Carga dinámica.** No se precargan al iniciar el Runtime. Se cargan cuando se invocan. |
| **Adapters** | **Desacoplados.** Se cargan solo cuando se usan. Permanecen como especificación, no como contexto activo. |

### Relación con Feature Cost Policy

- **Feature Cost Policy** evalúa *si* un subsistema debe existir.
- **Context Budget Protection** define *cómo* debe existir: sin ocupar contexto si no está activo.

Ambas policies se complementan. La primera controla el crecimiento; la segunda controla el impacto del crecimiento.

### Verificación

Cada release de v3.0 debe verificar que el Runtime base (Kernel + Policies + Profiles + Session Manager + Manifest) no excede el presupuesto de contexto definido en `README.md`.

---

## Arquitectura resultante

### Estructura modular

```
mvgn/
├── kernel/                ← Orquestación + Dispatch
├── policies/              ← Reglas, gates, transiciones (ex system-rules)
├── profiles/              ← Lite, Full, nuevos perfiles
├── session/               ← Session Manager (ciclo de vida de sesiones)
├── telemetry/             ← Registro de eventos estructurados
├── traceability/          ← Trazabilidad de actores
├── analytics/             ← Métricas derivadas (solo lectura, bajo demanda)
├── event-history/         ← Append Only log (Event History + Event Bus)
├── skills/                ← Comportamientos reutilizables (ex prompts)
├── adapters/              ← Conexión con proveedores de IA
├── runtime-state/         ← Estado vivo (.mvgn-context.json + mvgn-runtime.json)
└── docs/                  ← Documentación del proyecto (00-12)
```

### Flujo de datos

```
Actor (IA / Humano / Automation / CI/CD)
    │
    ▼
┌─────────────────────────────────────────┐
│           SESSION MANAGER                │
│  (ciclo de vida: start / resume / close) │
└───────────────────┬─────────────────────┘
                    │ sesión activa
                    ▼
┌─────────────────────────────────────────┐
│               KERNEL                     │
│  (orquesta: capas + subsistemas)        │
└──┬──────────┬──────────┬──────────┬─────┘
   │          │          │          │
   ▼          ▼          ▼          ▼
┌──────┐ ┌────────┐ ┌────────┐ ┌──────────┐
│RULES │ │POLICIES│ │EXECUTION│ │RECOVERY  │
└──┬───┘ └───┬────┘ └───┬────┘ └────┬─────┘
   │         │          │           │
   └─────────┴──────────┴───────────┘
                    │
                    ▼  Event (ADR-002)
           ┌────────────────────┐
           │     EVENT BUS      │
           │  (ADR-003)         │
           └──┬──────┬──────┬──┘
              │      │      │
              ▼      ▼      ▼
        ┌────────┐┌────────┐┌──────────┐
        │RUNTIME ││ EVENT  ││TRACEAB.  │
        │ STATE  ││ HISTORY││(consume) │
        └────────┘└───┬────┘└──────────┘
                      │
                      ▼
               ┌──────────┐
               │ANALYTICS │
               │(on-demand)│
               └──────────┘
```

### Cambios de nomenclatura

| v2.3 | v3.0 | Razón |
|------|------|-------|
| Engine | Execution | "Engine" es genérico. "Execution" describe responsabilidad. |
| Agent Identity | Actor Identity | Cubre IA + humano + automation + CI/CD. |
| .mvgn/kernel-spec.md | kernel/ | Pasa de archivo a módulo. |
| prompts/ | skills/ | "Prompts" especifica implementación; "Skills" especifica comportamiento. |

---

## ADR-009: Mobile Navigation — Pillnav + Hamburger Coexistencia

**Estado:** ✅ Aprobado
**Fecha de aprobación:** 2026-07-13
**Decisor:** Ncape [✓]

### Contexto

El sitio MVGN Digital Hub tenía dos problemas de navegación mobile detectados en la auditoría de responsividad (Sesión 020):

1. **Sin navegación entre páginas en mobile.** La topbar solo mostraba brand + theme toggle. Los únicos links a FAQ y Contacto estaban en el footer. En landing page, no había forma de llegar a otras páginas sin scrollear hasta el final.
2. **Pillnav con labels ilegibles.** En mobile, el pillnav (navegación on-page entre secciones) se movía al bottom con labels de 0.6rem (9.6px) y touch targets por debajo de 44px WCAG.

Además, el nombre "MVGN Labs" era invisible en dispositivos touch porque solo se revelaba en hover.

### Decisión

**Mantener el pillnav como bottom navigation + agregar hamburger menu en el topbar. No reemplazar uno por el otro.**

Razones:
- **Pillnav y hamburger resuelven problemas distintos.** El pillnav es navegación on-page (scroll-spy entre secciones del index). El hamburger es navegación global (entre páginas: Inicio, FAQ, Contacto, Laboratorio). No hay overlap funcional.
- **El pillnav es un identificador visual del sitio.** Es el elemento más distintivo de la UI. Removerlo rompe la identidad del proyecto.
- **El hamburger llena un gap real.** Hoy no existe navegación global en mobile. El footer es el único camino. Esto es una deficiencia de UX comprobada.
- **Bottom navigation es thumb-friendly.** El pillnav en bottom sigue el patrón de tab bars nativas (iOS/Android). Es más ergonómico que un hamburger para cambiar entre secciones de una misma página.

### Alternativas consideradas

| Alternativa | Veredicto | Razón |
|-------------|-----------|-------|
| Solo hamburger (remover pillnav) | ❌ Rechazado | Pierde scroll-spy, pierde identidad visual, añade fricción a navegación on-page |
| Solo pillnav (sin hamburger) | ❌ Rechazado | No resuelve el gap de navegación entre páginas |
| Pillnav convertido en navegación global | ❌ Rechazado | Mezcla concerns (on-page anchors + page links), confunde al usuario |
| **Pillnav + hamburger** | ✅ **Elegido** | Cada uno resuelve su concern. La topbar gana el hamburger; el index conserva el pillnav |

### Impacto

| Área | Afectado |
|------|----------|
| BaseLayout.astro | ✅ Nuevo: hamburger menu + drawer |
| DocsLayout.astro | ✅ Ajuste: coexistencia con sidebar hamburger existente |
| index.astro | ✅ Ajuste: pillnav labels + touch targets |
| Otras páginas | ❌ No afectado |
| Desktop layout | ❌ Sin cambios (solo visible en ≤767px) |

### Tradeoffs

- **Overhead de mantener dos sistemas de navegación.** El pillnav tiene su propio JS (scroll-spy, active state). El hamburger tendrá su propio toggle. Son independientes, pero hay que asegurar que no conflictúen (ej: ambos abiertos simultáneamente).
- **Bottom pillnav compite con floating actions.** Hay que ajustar `bottom` del pillnav para no solaparse con back-to-top y WhatsApp.

### Verificación

- Build pasa con 0 errores
- Pillnav sigue funcionando con scroll-spy en desktop y mobile
- Hamburger abre/cierra correctamente
- Sin regresión visual en desktop

---

## ADRs Registrados

| ADR | Título | Estado |
|-----|--------|--------|
| ADR-001 | Event-Driven AI Governance Runtime | ✅ Aprobado |
| ADR-002 | Event-Driven Runtime | ✅ Aprobado |
| ADR-003 | Event Bus | ✅ Aprobado |
| ADR-004 | Runtime Events Catalog + Event Relationships | ✅ Aprobado |
| ADR-005 | Actor Identity | ✅ Aprobado |
| ADR-006 | Session Manager | ✅ Aprobado |
| ADR-007 | Runtime Manifest | ✅ Aprobado |
| ADR-008 | Context Budget Protection | ✅ Aprobado |
| **ADR-009** | **Mobile Navigation — Pillnav + Hamburger Coexistencia** | **✅ Aprobado** |

---

**Historial:**
- 2026-07-13: ADR-009 incorporado — Mobile Navigation: Pillnav + Hamburger Coexistencia
- 2026-07-08: Actualización mayor — ADR-001 revisado, ADR-002 a ADR-008 incorporados, regla ADR como contrato, Actor Identity, Session Manager, Event Bus, Runtime Manifest, Context Budget Protection
- 2026-07-08: Creación inicial — ADR-001 + Arquitectura propuesta para v3.0
