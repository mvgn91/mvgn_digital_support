# 07 — Runtime Specification

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 2.0.0
> **Propósito:** Especificación técnica del Runtime. Define qué es un evento, su estructura, garantías y límites.

---

## 1. ¿Qué es un evento?

Un **evento** es la representación estructurada de un cambio relevante dentro del Runtime.

**Principio:** todo cambio relevante dentro del Runtime se representa mediante un evento estructurado (ADR-002).

Un evento NO es:
- Un log de depuración
- Una conversación completa
- Un prompt enviado a un modelo
- El código generado por un actor

## 2. Estructura del evento

### 2.1 Formato

Los eventos se serializan en **JSONL** (JSON Lines) — cada línea es un objeto JSON válido. Esto permite:
- Append eficiente
- Lectura línea a línea sin cargar el archivo completo
- Procesamiento con herramientas estándar (grep, jq, awk)
- Rotación simple por archivo

### 2.2 Campos obligatorios

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `id` | string | Identificador único del evento (UUIDv4) | `"evt-001a2b3c"` |
| `type` | string | Tipo de evento según catálogo oficial | `"TASK_STARTED"` |
| `timestamp` | string | ISO 8601 con zona horaria | `"2026-07-08T14:30:00Z"` |
| `actor` | object | Actor que generó el evento (ver §3) | `{ "id": "...", "type": "ai" }` |
| `session_id` | string | Sesión en la que ocurrió el evento | `"ses-001"` |

### 2.3 Campos condicionales

| Campo | Tipo | Cuándo es obligatorio | Descripción |
|-------|------|-----------------------|-------------|
| `task_id` | string | Eventos de tipo Task* | Tarea afectada |
| `gate` | string | Eventos de tipo Gate* | Código de gate (G01-G03) |
| `state` | object | Eventos STATE_CHANGED | `{ "from": "...", "to": "..." }` |
| `blocker` | object | Eventos de bloqueo | `{ "code": "B-03", "reason": "..." }` |
| `relationships` | array | Cuando el evento tiene relación con otro | `[{ "parent_event": "...", "relationship": "concludes" }]` |
| `metadata` | map | Cuando se requiere contexto adicional | `{ "docs_affected": ["01_prd.md"] }` |

### 2.4 Ejemplo completo

```json
{
  "id": "evt-001a2b3c",
  "type": "TASK_STARTED",
  "timestamp": "2026-07-08T14:30:00Z",
  "actor": {
    "id": "actor-claude-3.5",
    "type": "ai",
    "name": "Claude 3.5 Sonnet",
    "provider": "anthropic",
    "model": "claude-3.5-sonnet-20241022",
    "adapter": "anthropic-api"
  },
  "session_id": "ses-001",
  "task_id": "T-013",
  "relationships": [
    {
      "parent_event": "evt-0000001",
      "relationship": "implements"
    }
  ],
  "metadata": {
    "docs_affected": ["02_architecture.md"]
  }
}
```

## 3. Actor (sujeto del evento)

Según ADR-005, los actores se representan con el siguiente schema:

```json
{
  "actor": {
    "id": "string",
    "type": "ai | human | automation | ci_cd | script | system",
    "name": "string",
    "provider": "string",
    "model": "string",
    "adapter": "string",
    "metadata": {}
  }
}
```

**Reglas:**
- `id` es único dentro del proyecto
- `type` define la naturaleza del actor
- `provider`, `model` y `adapter` aplican solo si `type = ai`
- `metadata` es extensible para capturar particularidades de actores futuros
- Todos los campos son strings, excepto `metadata` que es un map

## 4. Catálogo oficial de eventos

### Dominio: Session

| Evento | Disparador | Campos obligatorios adicionales |
|--------|-----------|--------------------------------|
| `SESSION_STARTED` | Inicio de sesión | — |
| `SESSION_RESUMED` | Reanudación de sesión | `previous_session_id` en metadata |
| `SESSION_FROZEN` | Congelación por recovery | `reason` en metadata |
| `SESSION_CLOSED` | Cierre de sesión | `duration_ms` en metadata |

### Dominio: Task

| Evento | Disparador | Campos adicionales |
|--------|-----------|-------------------|
| `TASK_CREATED` | Nueva tarea en 03_tasks.md | `task_id`, `rf_ref` |
| `TASK_STARTED` | Inicio de ejecución | `task_id` |
| `TASK_COMPLETED` | Tarea completada | `task_id`, `output_summary` en metadata |
| `TASK_CANCELLED` | Tarea cancelada | `task_id`, `reason` |
| `TASK_BLOCKED` | Tarea bloqueada | `task_id`, `blocker.code` |

### Dominio: Gate

| Evento | Disparador | Campos adicionales |
|--------|-----------|-------------------|
| `GATE_APPROVED` | Gate superado | `gate` (G01-G03) |
| `GATE_FAILED` | Gate no superado | `gate`, `blocker` |

### Dominio: Recovery

| Evento | Disparador | Campos adicionales |
|--------|-----------|-------------------|
| `RECOVERY_STARTED` | Activación de recovery | `trigger` en metadata |
| `RECOVERY_FINISHED` | Recovery completado | `new_state`, `docs_rebuilt` en metadata |

### Dominio: Profile

| Evento | Disparador | Campos adicionales |
|--------|-----------|-------------------|
| `PROFILE_CHANGED` | Cambio de perfil | `from`, `to` en state |

### Dominio: Skill

| Evento | Disparador | Campos adicionales |
|--------|-----------|-------------------|
| `SKILL_LOADED` | Skill cargada | `skill_name`, `version` en metadata |
| `SKILL_UNLOADED` | Skill descargada | `skill_name` en metadata |

### Dominio: System

| Evento | Disparador | Campos adicionales |
|--------|-----------|-------------------|
| `STATE_CHANGED` | Cambio de estado del proyecto | `state.from`, `state.to` |
| `RELEASE_CREATED` | Release generada | `version`, `semver` en metadata |
| `MANIFEST_UPDATED` | Runtime Manifest modificado | `previous_version`, `new_version` |
| `ACTOR_REGISTERED` | Nuevo actor registrado | `actor` completo |

### Dominio: Agent (MVGN 4.0)

| Evento | Disparador | Campos adicionales |
|--------|-----------|-------------------|
| `AGENT_ASSIGNED` | Agente asignado a tarea | `agent_id`, `task_id`, `role` |
| `AGENT_COMPLETED` | Agente completó tarea | `agent_id`, `task_id`, `output` en metadata |
| `AGENT_REVIEW_STARTED` | Revisión iniciada | `agent_id`, `task_id` |
| `AGENT_REVIEW_COMPLETED` | Revisión completada | `agent_id`, `task_id`, `report` en metadata |
| `REVIEW_FAILED` | Revisión falló | `agent_id`, `task_id`, `findings` en metadata |
| `REVIEW_APPROVED` | Revisión aprobada | `agent_id`, `task_id` |
| `PIPELINE_COMPLETED` | Pipeline completado | `task_id`, `agents[]` en metadata |
| `CONFLICT_DETECTED` | Discrepancia entre agentes | `agent_a`, `agent_b`, `topic` |
| `CONFLICT_RESOLVED` | Resolución por operador | `resolution`, `decided_by` |

## 5. Garantías del Runtime

### 5.1 Lo que el Runtime garantiza

| Garantía | Descripción |
|----------|-------------|
| **Inmutabilidad del Event History** | Una vez escrito, un evento no se modifica ni elimina |
| **Orden cronológico** | Los eventos dentro de una sesión se almacenan en orden de ocurrencia |
| **Consistencia del schema** | Todos los eventos cumplen la estructura definida en esta especificación |
| **Append Only** | El Event History solo crece. No hay borrado ni modificación |
| **Trazabilidad de actores** | Todo evento tiene un actor identificable |
| **Aislamiento de datos** | Telemetry no almacena conversaciones, prompts ni código generado |

### 5.2 Lo que el Runtime NO garantiza

| No garantiza | Razón |
|-------------|-------|
| **Entrega exactly-once** | Los eventos pueden perderse en condiciones de fallo del sistema operativo |
| **Orden global entre sesiones** | Eventos de distintas sesiones pueden tener timestamps no secuenciales |
| **Disponibilidad en tiempo real** | Los eventos se escriben de forma asíncrona |
| **Backup automático** | La rotación y archivado del Event History es responsabilidad del operador |
| **Consistencia transaccional** | No hay transacciones entre subsistemas; cada uno escribe su propio evento |

## 6. Canales de eventos

Los eventos fluyen a través del **Event Bus** (ADR-003):

```
Actor → Kernel/Subsistema → Event Bus → [Runtime State, Event History, Traceability, Analytics]
```

El Event Bus **no almacena**, **no transforma** y **no encola** eventos. Es un punto de enrutamiento lógico.

Los consumidores del Event Bus son:

| Consumidor | Qué hace con el evento |
|------------|------------------------|
| **Runtime State** | Actualiza el estado presente (`.mvgn-context.json`) |
| **Event History** | Persiste el evento en el archivo Append Only |
| **Traceability** | Registra la relación entre actor y acción |
| **Analytics** | Deriva métricas (bajo demanda, no en tiempo real) |

## 7. Versionamiento de esquemas

Cada artefacto de datos del Runtime tiene su propio `schema_version`, independiente de `runtime_version`:

| Artefacto | schema_version | Ubicación |
|-----------|----------------|-----------|
| Runtime Event | `1.0.0` | `docs/07_runtime_spec.md` |
| Runtime Manifest | `2.0.0` | `mvgn-runtime.json` |
| Runtime State | `2.0.0` | `.mvgn-context.json` |
| Event History | `1.0.0` | `events/` (archivos JSONL) |

### Reglas de versionamiento

- **Major**: Cambio incompatible (campos obligatorios eliminados, tipos cambiados)
- **Minor**: Cambio compatible hacia atrás (nuevos campos opcionales añadidos)
- **Patch**: Corrección de documentación o formato sin cambio estructural

## 8. Límites del Runtime

| Límite | Valor | Justificación |
|--------|-------|---------------|
| Tamaño máximo del Runtime Manifest | 3 KB | Context Budget Protection (ADR-008) |
| Tamaño máximo de Runtime State | 5 KB | Debe ser pequeño, solo refleja el presente |
| Líneas máximas de especificación del Event Bus | 100 líneas | ADR-003: concepto ligero, no infraestructura |
| Subsistemas cargados en contexto activo | Solo los necesarios | Context Budget Protection |
| Eventos por archivo de Event History | Configurable (por sesión, día o tamaño) | Evita archivos monstruosos |

---

**Historial:**
- 2026-07-15: Actualización — Runtime Specification v2.0.0 — Agent Events domain (9 eventos), schema versions actualizados
- 2026-07-08: Creación inicial — Runtime Specification v1.0.0
