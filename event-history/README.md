# event-history/

> Append Only log + Event Bus. La memoria del Runtime.

## Propósito

El Event History es el almacén inmutable de todos los eventos del Runtime. Una vez escrito, un evento no se modifica ni elimina. El Event Bus es el punto de enrutamiento que distribuye eventos a los consumidores.

## Responsabilidades

### Event History
- Almacenar eventos en formato JSONL (Append Only) en `events/`
- Soportar consultas por rango temporal, tipo de evento y actor
- Soportar rotación por sesión, día o tamaño configurable
- Mantener Event Relationships (parent_event, relationship_type)
- Ser legible por humanos (texto plano)

### Event Bus
- Recibir eventos del Kernel y subsistemas
- Distribuir a consumidores registrados (Runtime State, Event History, Traceability, Analytics)
- No almacenar, no transformar, no encolar

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `event-bus-spec.md` | Especificación del Event Bus (ADR-003, ≤ 100 líneas) |
| `events/event.schema.json` | Schema de validación de eventos (JSON Schema draft-07) |
| `events/{YYYY-MM-DD}.jsonl` | Archivos de eventos rotados por día |

## Convención de archivos

Los eventos se almacenan en `events/{YYYY-MM-DD}.jsonl`, un archivo por día:

```
events/
├── event.schema.json       ← Schema de validación
├── README.md               ← Este archivo
├── 2026-07-08.jsonl        ← Eventos del 2026-07-08
└── 2026-07-09.jsonl        ← (próximo día)
```

**Rotación:** Por día (configurable en el futuro a por sesión o por tamaño).

## Contratos

| Entrada | Salida |
|---------|--------|
| Evento del Runtime | Almacenado en `events/{YYYY-MM-DD}.jsonl` + distribuido por Event Bus |
| Consulta de eventos | Lista filtrada por rango/tipo/actor |
| Consulta por grep | `grep '"type":"TASK_COMPLETED"' events/2026-07-08.jsonl` |

## Consumidores del Event Bus

| Consumidor | Acción | Referencia |
|------------|--------|-----------|
| Runtime State | Actualiza estado presente | `runtime-state/` |
| Event History | Persiste el evento | `events/` |
| Traceability | Registra relación actor-acción | `traceability/` |
| Analytics | Deriva métricas (bajo demanda) | `analytics/` |

## Schema version

| Campo | Valor |
|-------|-------|
| `event_schema_version` | `1.0.0` |
| Formato de archivo | JSONL |
| Rotación | Diaria |

## Límites

- Event Bus: ≤ 100 líneas de especificación (actual: 59 líneas)
- Event History: Append Only — no hay borrado
- No garantiza evento exactly-once en condiciones de fallo

---

**Relación con v2.3:** Nuevo en v3.0. No existía en v2.3.
