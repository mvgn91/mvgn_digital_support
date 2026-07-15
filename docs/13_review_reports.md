# 13 — Review Reports Specification

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 1.0.0
> **Propósito:** Define el formato estándar de reportes de revisión.

---

## 1. Definición

Un **Review Report** es la evidencia estructurada que un Reviewer genera al validar el trabajo de un Executor.

**Principio:** El Review Report es evidencia, no decisión. La decisión final siempre es del Operator.

---

## 2. Schema

```yaml
review_report:
  id: string              # UUID único del reporte
  task_id: string         # Tarea revisada
  reviewer_id: string     # ID del agente revisor
  executor_id: string     # ID del agente ejecutor
  timestamp: ISO8601      # Fecha y hora de la revisión
  status: enum            # Estado de la revisión
  findings: array         # Hallazgos encontrados
  risks: array            # Riesgos identificados
  confidence: number      # Nivel de confianza (0-100)
  recommendations: array  # Recomendaciones al Operator
```

---

## 3. Status

| Estado | Descripción | Significado |
|--------|-------------|-------------|
| `PASS` | Aprobado | Cumple todos los criterios de aceptación |
| `PASS_WITH_WARNINGS` | Aprobado con advertencias | Cumple criterios pero tiene observaciones menores |
| `REVIEW_REQUIRED` | Requiere revisión adicional | No se puede determinar sin más información |
| `FAIL` | Rechazado | No cumple criterios de aceptación |

---

## 4. Findings

```yaml
finding:
  id: string              # UUID del hallazgo
  severity: enum          # Severidad del hallazgo
  category: string        # Categoría (seguridad, rendimiento, legibilidad, etc.)
  description: string     # Descripción del hallazgo
  location: string        # Ubicación del hallazgo (archivo, línea, función)
  recommendation: string  # Recomendación para resolver
```

### Severity levels

| Severidad | Descripción | Acción requerida |
|-----------|-------------|------------------|
| `critical` | Problema grave que bloquea | Corrección obligatoria |
| `major` | Problema importante | Corrección recomendada |
| `minor` | Problema menor | Corrección opcional |
| `info` | Observación informativa | Sin acción requerida |

---

## 5. Risks

```yaml
risk:
  id: string              # UUID del riesgo
  level: enum             # Nivel de riesgo
  description: string     # Descripción del riesgo
  mitigation: string      # Mitigación sugerida
```

### Risk levels

| Nivel | Descripción |
|-------|-------------|
| `high` | Riesgo alto que puede afectar el proyecto |
| `medium` | Riesgo medio que debe monitorearse |
| `low` | Riesgo bajo que es aceptable |

---

## 6. Ejemplo completo

```json
{
  "id": "rev-001a2b3c",
  "task_id": "T-045",
  "reviewer_id": "agent-claude",
  "executor_id": "agent-mimo",
  "timestamp": "2026-07-15T14:30:00Z",
  "status": "PASS_WITH_WARNINGS",
  "findings": [
    {
      "id": "fnd-001",
      "severity": "minor",
      "category": "documentación",
      "description": "Falta documentación en la función calculateMetrics",
      "location": "internal/analytics/metrics.go:45",
      "recommendation": "Añadir comentario docstring"
    }
  ],
  "risks": [
    {
      "id": "risk-001",
      "level": "low",
      "description": "Posible regresión en edge cases no cubiertos por tests",
      "mitigation": "Añadir tests para edge cases"
    }
  ],
  "confidence": 85,
  "recommendations": [
    "Añadir documentación faltante",
    "Considerar tests adicionales para edge cases"
  ]
}
```

---

## 7. Generación

El Review Report se genera cuando:
- Un Reviewer completa la revisión de una tarea
- Se emite el evento `AGENT_REVIEW_COMPLETED`

El Review Report se almacena en:
- Event History (evento `AGENT_REVIEW_COMPLETED` con `report` en metadata)
- Opcionalmente en `reports/` como archivo markdown

---

## 8. Uso

El Operator usa el Review Report para:
- Decidir si aprueba, rechaza o solicita cambios
- Entender los hallazgos y riesgos
- Tomar una decisión informada

**Regla:** El Review Report es evidencia, no decisión. La decisión final siempre es del Operator.

---

**Historial:**
- 2026-07-15: Creación inicial — Review Reports Specification v1.0
