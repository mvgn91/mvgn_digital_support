# Traceability Specification

> Consumo de eventos del Event History para reconstruir la historia técnica del proyecto.
> **Principio:** Traceability solo consulta. No escribe.

---

## 1. Fuente de datos

Traceability consume exclusivamente del **Event History** (`events/{YYYY-MM-DD}.jsonl`). No tiene base de datos propia ni almacenamiento separado.

## 2. Consultas disponibles

Traceability responde las siguientes preguntas consultando directamente los archivos JSONL:

| Consulta | Método | Ejemplo |
|----------|--------|---------|
| ¿Qué hizo un actor? | `grep '"actor.id":"actor-X"' events/*.jsonl` |
| ¿Quién trabajó en una tarea? | `grep '"task_id":"T-00X"' events/*.jsonl` |
| ¿Qué actores participaron? | `grep -o '"id":"actor-[^"]*"' events/*.jsonl \| sort -u` |
| ¿Cuántos eventos por tipo? | `grep -o '"type":"[^"]*"' events/*.jsonl \| sort \| uniq -c \| sort -rn` |
| Timeline de una tarea | `grep '"task_id":"T-00X"' events/*.jsonl \| sort -t'"' -k4` |
| Documentos afectados | `grep '"docs_affected"' events/*.jsonl \| grep -o '"docs/[^"]*"' \| sort -u` |
| Sesiones activas | `grep -E 'SESSION_STARTED\|SESSION_CLOSED' events/*.jsonl` |

## 3. Schema de consultas

Toda consulta de Traceability devuelve un `TraceabilityReport` estructurado:

```json
{
  "report_type": "actor_history",
  "query": {"actor_id": "actor-codebuff"},
  "generated_at": "2026-07-08T12:00:00Z",
  "source": "events/2026-07-08.jsonl",
  "events_found": 15,
  "results": [
    {
      "event_id": "evt-00000003",
      "type": "TASK_CREATED",
      "timestamp": "2026-07-08T10:05:00Z",
      "task_id": "T-013"
    }
  ]
}
```

## 4. Reportes predefinidos

Traceability puede generar los siguientes reportes bajo demanda:

| Reporte | Descripción |
|---------|-------------|
 | `actor-history` | Historial completo de un actor |
 | `task-timeline` | Timeline completo de una tarea (creada → iniciada → completada) |
 | `session-summary` | Resumen de una sesión: actores, tareas, duración |
 | `project-trace` | Trazabilidad completa del proyecto hasta la fecha |
 | `actor-productivity` | Tareas completadas por actor |

## 5. Formato de salida

Los reportes se escriben en `traceability/reports/{report-type}-{date}.md` en formato markdown legible.

## 6. Límites

| Límite | Razón |
|--------|-------|
| Solo consulta eventos existentes | No escribe, no modifica (ADR-004) |
| No participa en contexto activo | Context Budget Protection (ADR-008) |
| Bajo demanda | No hay procesos en segundo plano |
| Reportes en markdown | Legibles por humanos y por IA |

---

**Schema version:** `traceability_schema_version: 1.0.0`
**Relación con v2.3:** Nuevo en v3.0.
