# 11 — Review Pipeline Specification

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 1.0.0
> **Propósito:** Define el pipeline opcional de revisión para sesiones multi-agente.

---

## 1. Definición

El **Review Pipeline** es un flujo opcional que asegura que el trabajo de un agente ejecutor sea validado por un agente revisor antes de ser aprobado por el operador humano.

**Principio:** El pipeline es opcional y deshabilitable. No forma parte del flujo obligatorio.

---

## 2. Flujo

```
Task
  ↓
Executor (implementa)
  ↓
Reviewer (valida) ← Opcional, deshabilitable
  ↓
Operator (aprueba) ← Siempre requerido
```

---

## 3. Modos de ejecución

| Modo | Pipeline | Descripción |
|------|----------|-------------|
| **NORMAL** | Deshabilitado | Un solo agente ejecuta todo |
| **SUPERVISED** | Habilitado | Un agente ejecuta, otro revisa |
| **COLLABORATIVE** | Habilitado | Múltiples agentes cooperan |

---

## 4. Reglas del pipeline

### 4.1 Executor

- Implementa la tarea según criterios de aceptación
- Genera evidencia de implementación
- **Nunca aprueba su propio trabajo**

### 4.2 Reviewer

- Valida el trabajo del Executor
- Genera Review Report (ver `docs/13_review_reports.md`)
- **Nunca implementa**
- **Nunca escribe código**
- **Nunca modifica Tasks**
- **Solo genera evidencia**

### 4.3 Operator (Humano)

- Siempre tiene la decisión final
- Puede aprobar, rechazar o solicitar cambios
- MVGN **recomienda**, nunca aprueba automáticamente

---

## 5. Deshabilitación

El pipeline se deshabilita configurando:

```json
{
  "execution_mode": "NORMAL",
  "review_pipeline_enabled": false
}
```

En modo NORMAL:
- No se requiere Reviewer
- El Executor trabaja directamente con el Operator
- No se generan Review Reports

---

## 6. Eventos del pipeline

| Evento | Disparador |
|--------|-----------|
| `AGENT_ASSIGNED` | Agente asignado a tarea |
| `AGENT_COMPLETED` | Agente completó tarea |
| `AGENT_REVIEW_STARTED` | Revisión iniciada |
| `AGENT_REVIEW_COMPLETED` | Revisión completada |
| `REVIEW_FAILED` | Revisión falló |
| `REVIEW_APPROVED` | Revisión aprobada |
| `PIPELINE_COMPLETED` | Pipeline completado |

---

## 7. Métricas

El pipeline genera métricas de revisión (ver `docs/15_review_metrics.md`):
- Cantidad de revisiones
- Hallazgos críticos/menores
- Tiempo de revisión
- Nivel de confianza

---

## 8. Compatibilidad

- En modo NORMAL, el pipeline se comporta como en v3.x
- El pipeline es **opcional** — se activa solo en modos SUPERVISED y COLLABORATIVE
- Los eventos del pipeline se escriben en el Event History

---

**Historial:**
- 2026-07-15: Creación inicial — Review Pipeline Specification v1.0
