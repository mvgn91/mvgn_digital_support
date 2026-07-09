# Telemetry Specification

> Captura de eventos estructurados del Runtime.
> **Principio:** Telemetry no almacena — solo captura y envía al Event Bus.

---

## 1. Puntos de captura

Telemetry intercepta eventos en los siguientes puntos del Runtime:

| Punto de captura | Evento(s) generado(s) | Subsistema origen |
|-----------------|----------------------|-------------------|
| Inicio de sesión | `SESSION_STARTED` | Session Manager |
| Reanudación de sesión | `SESSION_RESUMED` | Session Manager |
| Congelación | `SESSION_FROZEN` | Session Manager |
| Cierre de sesión | `SESSION_CLOSED` | Session Manager |
| Tarea creada | `TASK_CREATED` | Execution |
| Tarea iniciada | `TASK_STARTED` | Execution |
| Tarea completada | `TASK_COMPLETED` | Execution |
| Tarea cancelada | `TASK_CANCELLED` | Execution |
| Tarea bloqueada | `TASK_BLOCKED` | Execution |
| Gate aprobado | `GATE_APPROVED` | Policies |
| Gate fallado | `GATE_FAILED` | Policies |
| Recovery iniciado | `RECOVERY_STARTED` | Kernel |
| Recovery finalizado | `RECOVERY_FINISHED` | Kernel |
| Cambio de perfil | `PROFILE_CHANGED` | Kernel |
| Cambio de estado | `STATE_CHANGED` | Kernel |
| Release creada | `RELEASE_CREATED` | Finalization |

## 2. Canal de eventos

```
Subsistema origen → Telemetry.capture(event) → Event Bus → [Event History, Runtime State, Traceability, Analytics]
```

Telemetry actúa como middleware entre los subsistemas del Runtime y el Event Bus. No intercepta — los subsistemas llaman a `Telemetry.capture()` directamente.

## 3. Formato de captura

Cada captura recibe un objeto evento según `events/event.schema.json`:

```json
{
  "id": "evt-{uuid}",
  "type": "SESSION_STARTED",
  "timestamp": "{ISO 8601}",
  "actor": { "id": "...", "type": "..." },
  "session_id": "ses-{id}",
  "metadata": {}
}
```

Telemetry no valida el schema (eso es responsabilidad del Event History). Telemetry solo reenvía.

## 4. Lo que Telemetry NO captura

| No captura | Razón |
|------------|-------|
| Conversaciones completas | Privacidad y Context Budget |
| Prompts enviados a modelos | No son eventos del Runtime |
| Código generado | No es un cambio del Runtime |
| Logs de depuración | No son eventos estructurados |
| Estado interno de la IA | No es relevante para la gobernanza |

## 5. Garantías

| Garantía | Descripción |
|----------|-------------|
| Fire-and-forget | Telemetry no espera confirmación del Event Bus |
| No bloqueante | Una captura lenta no afecta la operación del Runtime |
| Sin almacenamiento local | Telemetry no guarda nada en disco |

## 6. Ejemplo de uso

```python
# Pseudocódigo: punto de captura en Execution
def execute_task(task_id):
    Telemetry.capture({
        "id": generate_event_id(),
        "type": "TASK_STARTED",
        "timestamp": now(),
        "actor": current_actor(),
        "session_id": current_session(),
        "task_id": task_id
    })
    # ... ejecutar tarea ...
    Telemetry.capture({
        "id": generate_event_id(),
        "type": "TASK_COMPLETED",
        "timestamp": now(),
        "actor": current_actor(),
        "session_id": current_session(),
        "task_id": task_id,
        "relationships": [{"parent_event": previous_event_id, "relationship": "concludes"}],
        "metadata": {"output_summary": "tarea completada"}
    })
```

---

**Schema version:** `telemetry_schema_version: 1.0.0`
**Relación con v2.3:** Nuevo en v3.0.
