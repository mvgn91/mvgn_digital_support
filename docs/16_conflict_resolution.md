# 16 — Conflict Resolution Protocol

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 1.0.0
> **Propósito:** Define el protocolo de resolución de conflictos entre agentes.

---

## 1. Definición

**Conflict Resolution** es el protocolo que se activa cuando dos agentes discrepan sobre una decisión o implementación.

**Principio:** MVGN nunca selecciona automáticamente quién tiene razón. Solo registra la discrepancia y espera decisión humana.

---

## 2. Flujo

```
Executor propose
  ↓
Reviewer challenges
  ↓
MVGN registra discrepancia
  ↓
Operator decide
  ↓
MVGN registra decisión
```

---

## 3. Pasos

### 3.1 Executor Propose

El Executor implementa una solución y genera evidencia:

```yaml
proposal:
  task_id: string
  agent_id: string
  solution: string
  evidence: string[]
```

### 3.2 Reviewer Challenges

El Reviewer valida la solución y puede desafiarla:

```yaml
challenge:
  task_id: string
  agent_id: string
  finding: string
  severity: critical | major | minor | info
  recommendation: string
```

### 3.3 MVGN Register Discrepancy

MVGN detecta la discrepancia y la registra:

```yaml
discrepancy:
  task_id: string
  executor_id: string
  reviewer_id: string
  topic: string
  executor_position: string
  reviewer_position: string
  timestamp: ISO8601
```

**Evento generado:** `CONFLICT_DETECTED`

### 3.4 Operator Decide

El Operator humano toma la decisión final:

```yaml
decision:
  task_id: string
  discrepancy_id: string
  decided_by: string  # operator_id
  resolution: string
  rationale: string
  timestamp: ISO8601
```

### 3.5 MVGN Register Resolution

MVGN registra la decisión:

```yaml
resolution:
  task_id: string
  discrepancy_id: string
  decided_by: string
  resolution: string
  timestamp: ISO8601
```

**Evento generado:** `CONFLICT_RESOLVED`

---

## 4. Eventos

| Evento | Disparador | Payload |
|--------|-----------|---------|
| `CONFLICT_DETECTED` | Discrepancia detectada | task_id, executor_id, reviewer_id, topic |
| `CONFLICT_RESOLVED` | Decisión del operador | task_id, discrepancy_id, decided_by, resolution |

---

## 5. Reglas

| Regla | Descripción |
|-------|-------------|
| **MVGN no decide** | MVGN nunca selecciona automáticamente quién tiene razón |
| **Operator decide** | La decisión final siempre es del operador humano |
| **Trazabilidad** | Todas las discrepancias y decisiones se registran en Event History |
| **No automático** | Ningún agente puede aprobar, fusionar o cerrar automáticamente |

---

## 6. Ejemplo

```yaml
# Paso 1: Executor propone
proposal:
  task_id: "T-045"
  agent_id: "agent-mimo"
  solution: "Implementar ADR-009 con schema YAML"
  evidence: ["docs/02_architecture.md", "docs/10_agent_roles.md"]

# Paso 2: Reviewer desafía
challenge:
  task_id: "T-045"
  agent_id: "agent-claude"
  finding: "El schema YAML puede causar problemas de parsing"
  severity: "major"
  recommendation: "Usar JSON en su lugar"

# Paso 3: MVGN registra discrepancia
discrepancy:
  task_id: "T-045"
  executor_id: "agent-mimo"
  reviewer_id: "agent-claude"
  topic: "Formato de schema (YAML vs JSON)"
  executor_position: "YAML es más legible para humanos"
  reviewer_position: "JSON es más seguro para parsing automático"
  timestamp: "2026-07-15T14:30:00Z"

# Paso 4: Operator decide
decision:
  task_id: "T-045"
  discrepancy_id: "disc-001"
  decided_by: "operator-ncape"
  resolution: "Usar YAML para especificaciones, JSON para Event History"
  rationale: "YAML es mejor para documentación legible; JSON es mejor para eventos estructurados"
  timestamp: "2026-07-15T14:35:00Z"

# Paso 5: MVGN registra resolución
resolution:
  task_id: "T-045"
  discrepancy_id: "disc-001"
  decided_by: "operator-ncape"
  resolution: "Usar YAML para especificaciones, JSON para Event History"
  timestamp: "2026-07-15T14:35:00Z"
```

---

## 7. Métricas

El Conflict Resolution genera métricas (ver `docs/15_review_metrics.md`):
- `conflicts_detected`: Total de discrepancias detectadas
- `conflicts_resolved`: Total de discrepancias resueltas
- `conflict_resolution_rate`: Tasa de resolución

---

## 8. Compatibilidad

- El Conflict Resolution es **opcional** — se activa solo en modos SUPERVISED y COLLABORATIVE
- En modo NORMAL, no se generan conflictos (un solo agente)
- Los eventos de conflicto se escriben en el Event History

---

**Historial:**
- 2026-07-15: Creación inicial — Conflict Resolution Protocol v1.0
