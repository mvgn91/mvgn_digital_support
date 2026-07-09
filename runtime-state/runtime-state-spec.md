# Runtime State Specification

> Estado vivo del proyecto. Solo presente. Sin historial.

---

## 1. Propósito

`.mvgn-context.json` es la fuente de verdad del **presente** del proyecto. Contiene únicamente el estado actual, la tarea activa y el progreso. **No contiene historial** — eso es responsabilidad del Event History.

## 2. Estructura

```json
{
  "timestamp": "ISO 8601",
  "state": "READING_TO_BUILD",
  "active_task": "T-008",
  "progress": "8/21",
  "blockers": null
}
```

### Campos

| Campo | Obligatorio | Descripción | Regla |
|-------|-------------|-------------|-------|
| `timestamp` | Sí | Última actualización | ISO 8601 con zona horaria |
| `state` | Sí | Estado del proyecto del state machine | Debe ser un estado válido |
| `active_task` | Condicional | Tarea actual en ejecución | `null` si no hay tarea activa |
| `progress` | Sí | Progreso visible | `"N/M"` |
| `blockers` | Condicional | Bloqueos activos | `null` si no hay bloqueos |

### Campos opcionales

| Campo | Cuándo usarlo | Ejemplo |
|-------|---------------|---------|
| `session_id` | Cuando hay sesión activa | `"ses-001"` |
| `profile` | Para identificar el perfil | `"lite"` |
| `mode` | Para identificar el modo | `"FLOW"` |

## 3. Lo que NO es Runtime State

| No es | Descripción |
|-------|-------------|
| **No es Event History** | El historial de eventos está en `events/` |
| **No es Runtime Manifest** | El manifiesto está en `mvgn-runtime.json` |
| **No es un log** | No guarda versiones anteriores |
| **No es un backup** | No persiste snapshots |

## 4. Ciclo de actualización

El Runtime State se actualiza:

1. **Al iniciar sesión**: Establece estado inicial
2. **Al iniciar tarea**: Actualiza `active_task`
3. **Al completar tarea**: Actualiza `progress` y `active_task`
4. **Al cambiar estado**: Actualiza `state`
5. **Al detectar bloqueo**: Establece `blockers`

## 5. Tamaño

**Límite:** ≤ 5 KB (actual: ~0.3 KB)

## 6. Relación con otros artefactos

```
Runtime State (.mvgn-context.json)    ← presente
Runtime Manifest (mvgn-runtime.json)  ← identidad técnica
Event History (events/*.jsonl)        ← pasado
```

Los tres son independientes y no deben mezclarse.

---

**Schema version:** `context_schema_version: 1.0.0`
**Relación con v2.3:** Existía como concepto en v2.3. Formalizado y simplificado en v3.0.
