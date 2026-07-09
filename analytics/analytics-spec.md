# Analytics Specification

> Métricas derivadas del Event History. Solo lectura. Bajo demanda.

---

## 1. Fuente de datos

Analytics consulta exclusivamente el **Event History** (`events/*.jsonl`). Nunca escribe eventos, archivos ni metadatos.

## 2. Métricas disponibles

### 2.1 Duración de sesiones

| Métrica | Fórmula | Ejemplo |
|---------|---------|---------|
| Duración total | `SESSION_CLOSED.timestamp - SESSION_STARTED.timestamp` | 2h 05m |
| Duración activa | Suma de `TASK_STARTED→TASK_COMPLETED` por sesión | 45m |
| Tiempo por actor | Duración activa filtrada por `actor.id` | Codebuff: 40m |

### 2.2 Productividad

| Métrica | Fórmula | Ejemplo |
|---------|---------|---------|
| Tareas completadas | Conteo de `TASK_COMPLETED` | 5 |
| Velocidad promedio | `tareas_completadas / duración_activa` | ~4.5 min/tarea |
| Tareas por actor | Conteo agrupado por `actor.id` | Codebuff: 5, Ncape: 0 |
| Throughput | `tareas_completadas / hora` | ~3.5 tareas/hora |

### 2.3 Calidad

| Métrica | Fórmula | Ejemplo |
|---------|---------|---------|
| Recoveries | Conteo de `RECOVERY_STARTED` | 0 |
| Gate failures | Conteo de `GATE_FAILED` | 0 |
| Tareas bloqueadas | Conteo de `TASK_BLOCKED` | 0 |
| Tasa de éxito | `completadas / (completadas + fallidas + bloqueadas)` | 100% |

### 2.4 Distribución temporal

| Métrica | Fórmula | Ejemplo |
|---------|---------|---------|
| Horario pico | Eventos agrupados por hora del día | 10:00-12:00 |
| Distribución por tipo | Conteo por `type` | TASK_CREATED: 8, TASK_STARTED: 5 |
| Distribución por actor | Conteo por `actor.id` | Codebuff: 19, Ncape: 4 |

### 2.5 Métricas por proveedor/modelo

| Métrica | Fórmula |
|---------|---------|
| Eventos por proveedor | Conteo agrupado por `actor.provider` |
| Eventos por modelo | Conteo agrupado por `actor.model` |
| Tareas por modelo | Conteo de `TASK_COMPLETED` agrupado por `actor.model` |

## 3. Formato de reportes

Los reportes se escriben en `analytics/reports/{metric-type}-{date}.md` en formato markdown:

```markdown
# Analytics Report: {type}

> **Generado:** {timestamp}
> **Fuente:** events/*.jsonl
> **Schema:** analytics_schema_version: 1.0.0

## Resumen

{tabla de métricas principales}

## Desglose

{tablas detalladas por categoría}
```

## 4. Reportes predefinidos

| Reporte | Contenido |
|---------|-----------|
| `session-metrics` | Duración de sesiones, tiempo activo, actores |
| `productivity` | Tareas por actor, velocidad, throughput |
| `quality` | Recoveries, gate failures, tasa de éxito |
| `distribution` | Distribución temporal, por tipo, por actor |
| `provider-metrics` | Métricas por proveedor y modelo |
| `full-report` | Todos los anteriores combinados |

## 5. Garantías

| Garantía | Descripción |
|----------|-------------|
| Nunca escribe | Analytics no modifica ningún archivo |
| Bajo demanda | No hay procesos en segundo plano |
| Sin contexto activo | No carga contexto hasta que se solicita (ADR-008) |
| Determinista | Mismos datos producen mismas métricas |

---

**Schema version:** `analytics_schema_version: 1.0.0`
**Relación con v2.3:** Nuevo en v3.0.
