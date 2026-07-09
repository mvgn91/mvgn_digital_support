# telemetry/

> Registro de eventos estructurados del Runtime. Fire-and-forget.

## Propósito

Telemetry captura eventos del Runtime y los envía al Event Bus para su distribución a Event History, Traceability y Analytics. No almacena nada localmente — el almacenamiento es responsabilidad del Event History.

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Este archivo |
| `telemetry-spec.md` | Especificación de captura: puntos de captura, formato, canal, garantías |

## Puntos de captura

Telemetry intercepta eventos en 16 puntos del Runtime, cubriendo todos los dominios de ADR-004:

| Dominio | Eventos |
|---------|---------|
| Session | `SESSION_STARTED`, `SESSION_RESUMED`, `SESSION_FROZEN`, `SESSION_CLOSED` |
| Task | `TASK_CREATED`, `TASK_STARTED`, `TASK_COMPLETED`, `TASK_CANCELLED`, `TASK_BLOCKED` |
| Gate | `GATE_APPROVED`, `GATE_FAILED` |
| Recovery | `RECOVERY_STARTED`, `RECOVERY_FINISHED` |
| Profile | `PROFILE_CHANGED` |
| System | `STATE_CHANGED`, `RELEASE_CREATED` |

## Canal

```
Subsistema → Telemetry.capture(event) → Event Bus → [Event History, Traceability, Analytics]
```

## Garantías

- **Fire-and-forget:** No espera confirmación del Event Bus
- **No bloqueante:** No afecta la operación del Runtime
- **Sin almacenamiento local:** No guarda nada en disco

## Schema version

| Campo | Valor |
|-------|-------|
| `telemetry_schema_version` | `1.0.0` |
| Formato de eventos | Según `events/event.schema.json` |

---

**Relación con v2.3:** Nuevo en v3.0. No existía en v2.3.
