# 15 — Review Metrics Specification

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 1.0.0
> **Propósito:** Define las métricas de revisión en el ecosistema MVGN.

---

## 1. Definición

**Review Metrics** son métricas derivadas de los Review Reports que permiten monitorear la calidad y efectividad del proceso de revisión.

**Principio:** Las métricas son derivadas del Event History, no escriben información directamente.

---

## 2. Métricas

### 2.1 Métricas de volumen

| Métrica | Descripción | Cálculo |
|---------|-------------|---------|
| `total_reviews` | Total de revisiones realizadas | COUNT(reviews) |
| `pass_count` | Revisiones con status PASS | COUNT(reviews WHERE status=PASS) |
| `pass_with_warnings_count` | Revisiones con status PASS_WITH_WARNINGS | COUNT(reviews WHERE status=PASS_WITH_WARNINGS) |
| `review_required_count` | Revisiones con status REVIEW_REQUIRED | COUNT(reviews WHERE status=REVIEW_REQUIRED) |
| `fail_count` | Revisiones con status FAIL | COUNT(reviews WHERE status=FAIL) |

### 2.2 Métricas de hallazgos

| Métrica | Descripción | Cálculo |
|---------|-------------|---------|
| `critical_findings` | Hallazgos críticos encontrados | SUM(findings WHERE severity=critical) |
| `major_findings` | Hallazgos mayores encontrados | SUM(findings WHERE severity=major) |
| `minor_findings` | Hallazgos menores encontrados | SUM(findings WHERE severity=minor) |
| `info_findings` | Observaciones informativas | SUM(findings WHERE severity=info) |

### 2.3 Métricas de calidad

| Métrica | Descripción | Cálculo |
|---------|-------------|---------|
| `average_confidence` | Confianza promedio de los revisores | AVG(confidence) |
| `pass_rate` | Tasa de aprobación | pass_count / total_reviews |
| `critical_rate` | Tasa de hallazgos críticos | critical_findings / total_findings |

### 2.4 Métricas de tiempo

| Métrica | Descripción | Cálculo |
|---------|-------------|---------|
| `average_review_time_ms` | Tiempo promedio de revisión | AVG(review_end - review_start) |
| `total_review_time_ms` | Tiempo total de revisiones | SUM(review_end - review_start) |

### 2.5 Métricas de conflictos

| Métrica | Descripción | Cálculo |
|---------|-------------|---------|
| `conflicts_detected` | Conflictos detectados | COUNT(CONFLICT_DETECTED events) |
| `conflicts_resolved` | Conflictos resueltos | COUNT(CONFLICT_RESOLVED events) |
| `conflict_resolution_rate` | Tasa de resolución | conflicts_resolved / conflicts_detected |

### 2.6 Métricas de eficiencia de supervisión

| Métrica | Descripción | Cálculo |
|---------|-------------|---------|
| `time_saved_by_supervision_ms` | Tiempo ahorrado por supervisión | estimated_time_without_review - actual_time_with_review |
| `time_saved_by_supervision_pct` | Porcentaje de tiempo ahorrado | (time_saved / estimated_time_without_review) × 100 |
| `supervision_efficiency_ratio` | Ratio de eficiencia de la revisión | actual_time_with_review / estimated_time_without_review |
| `estimated_time_without_review_ms` | Tiempo estimado sin revisión (definido por Operator) | Operator input en metadata del Review Report |
| `actual_time_with_review_ms` | Tiempo real con revisión | AGENT_REVIEW_COMPLETED.timestamp - AGENT_ASSIGNED.timestamp |
| `review_accuracy_pct` | Precisión del revisor | (findings_that_prevented_issues / total_findings) × 100 |
| `findings_that_prevented_issues` | Hallazgos que evitaron problemas | COUNT(findings WHERE severity IN [critical, major] AND accepted_by_operator=true) |
| `avg_time_saved_per_review_ms` | Tiempo promedio ahorrado por revisión | AVG(time_saved_by_supervision) over all reviews |

---

## 3. Cálculo

Las métricas se calculan a partir del Event History:

```
Event History → Filter(reviews) → Calculate(metrics) → Report
```

**Regla:** Las métricas son derivadas — nunca escriben información directamente.

---

## 4. Reporte

El reporte de métricas se genera bajo demanda:

```yaml
review_metrics_report:
  period:
    start: ISO8601
    end: ISO8601
  volume:
    total_reviews: number
    pass_count: number
    pass_with_warnings_count: number
    review_required_count: number
    fail_count: number
  findings:
    critical: number
    major: number
    minor: number
    info: number
  quality:
    average_confidence: number
    pass_rate: number
    critical_rate: number
  time:
    average_review_time_ms: number
    total_review_time_ms: number
  conflicts:
    detected: number
    resolved: number
    resolution_rate: number
```

---

## 5. Uso

Las métricas se usan para:
- Monitorear la calidad del proceso de revisión
- Identificar tendencias y problemas
- Tomar decisiones informadas sobre mejora continua

---

## 6. Compatibilidad

- Las métricas son **opcionales** — se generan solo bajo demanda
- En modo NORMAL (sin Review Pipeline), no se generan métricas de revisión
- Las métricas se calculan localmente desde el Event History

---

**Historial:**
- 2026-07-15: Creación inicial — Review Metrics Specification v1.0
