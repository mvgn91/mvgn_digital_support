# analytics/

> Métricas derivadas del Event History. **Solo lectura. Bajo demanda.**

## Propósito

Analytics deriva métricas de productividad, salud del proyecto y comportamiento de actores a partir del historial de eventos. Nunca escribe información directamente.

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Este archivo |
| `analytics-spec.md` | Especificación: 15 métricas en 5 categorías, fórmulas, reportes |
| `reports/full-report-2026-07-08.md` | Reporte completo con datos reales del proyecto |

## Métricas disponibles

| Categoría | Métricas |
|-----------|----------|
| Duración de sesiones | Duración total, tiempo activo, tiempo por actor |
| Productividad | Tareas completadas, velocidad, throughput, tareas por actor |
| Calidad | Recoveries, gate failures, tareas bloqueadas, tasa de éxito |
| Distribución temporal | Horario pico, distribución por tipo, por actor |
| Proveedor/Modelo | Eventos por proveedor, tareas por modelo |

## Contratos

| Consulta | Métrica |
|----------|---------|
| Sesiones | Duración promedio, total, por actor |
| Tareas | Completadas, canceladas, bloqueadas, velocidad |
| Calidad | Recoveries, gate failures, infracciones |
| Actores | Tiempo activo, tareas por actor, distribución |

## Reportes generados

| Reporte | Fecha | Métricas |
|---------|-------|----------|
| `full-report-2026-07-08.md` | 2026-07-08 | 23 eventos analizados, 15 métricas derivadas |

## Schema version

| Campo | Valor |
|-------|-------|
| `analytics_schema_version` | `1.0.0` |

---

**Relación con v2.3:** Nuevo en v3.0. No existía en v2.3.
