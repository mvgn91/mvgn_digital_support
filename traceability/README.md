# traceability/

> Trazabilidad de actores. ¿Quién hizo qué, cuándo y con qué?

## Propósito

Traceability consume eventos del Event History para reconstruir la historia técnica del proyecto: qué actor (IA, humano, automation) realizó cada acción, con qué proveedor y modelo, y qué documentos o tareas afectó.

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Este archivo |
| `traceability-spec.md` | Especificación: consultas, índices, reportes, límites |
| `reports/project-trace-2026-07-08.md` | Reporte de trazabilidad del proyecto con datos reales |

## Consultas disponibles

| Consulta | Comando |
|----------|---------|
| ¿Qué hizo un actor? | `grep '"id":"actor-X"' events/*.jsonl` |
| Timeline de una tarea | `grep '"task_id":"T-00X"' events/*.jsonl \| sort` |
| Eventos por tipo | `grep -o '"type":"[^"]*"' events/*.jsonl \| sort \| uniq -c \| sort -rn` |
| Sesiones | `grep -E 'SESSION_STARTED\|SESSION_CLOSED' events/*.jsonl` |

## Contratos

| Consulta | Respuesta |
|----------|-----------|
| ¿Qué hizo actor X? | Lista de eventos + timestamps |
| ¿Quién trabajó en T-00X? | Actor(es) + duración |
| ¿Qué actores participaron? | Lista de actores |
| Timeline del proyecto | Reporte markdown en `reports/` |

## Reportes generados

| Reporte | Fecha | Eventos analizados |
|---------|-------|-------------------|
| `project-trace-2026-07-08.md` | 2026-07-08 | 22 eventos, 2 actores, 4 tareas completadas |

## Dependencias

- `event-history/` — única fuente de datos
- Actor Identity (ADR-005) — schema de actores

## Schema version

| Campo | Valor |
|-------|-------|
| `traceability_schema_version` | `1.0.0` |

---

**Relación con v2.3:** Nuevo en v3.0. Reemplaza el concepto informal de "quién hizo qué".
