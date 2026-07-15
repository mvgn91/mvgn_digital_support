# 14 — Agent Registry Specification

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 1.0.0
> **Propósito:** Define el registro de agentes en el ecosistema MVGN.

---

## 1. Definición

El **Agent Registry** es el registro oficial de todos los agentes que participan en un proyecto MVGN.

**Principio:** Cada agente debe poseer un registro explícito con ID, nombre, modelo, versión, capacidades, rol y estado.

---

## 2. Schema

```yaml
agent:
  id: string              # Único en el proyecto
  name: string            # Nombre legible
  model: string           # Modelo del proveedor
  version: string         # Versión del modelo
  capabilities: array     # Capacidades del agente
  role: string            # Rol asignado (ver Agent Roles)
  status: enum            # Estado del agente
  registered_at: ISO8601  # Fecha de registro
  metadata: map           # Datos adicionales extensibles
```

---

## 3. Campos

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | string | Sí | Identificador único del agente |
| `name` | string | Sí | Nombre legible del agente |
| `model` | string | Sí | Modelo del proveedor (ej: "claude-3.5-sonnet") |
| `version` | string | No | Versión del modelo |
| `capabilities` | array | No | Capacidades del agente |
| `role` | string | No | Rol asignado (ver Agent Roles) |
| `status` | enum | Sí | Estado del agente |
| `registered_at` | ISO8601 | Sí | Fecha de registro |
| `metadata` | map | No | Datos adicionales extensibles |

---

## 4. Status

| Estado | Descripción |
|--------|-------------|
| `active` | Agente activo y disponible |
| `inactive` | Agente registrado pero no activo |
| `paused` | Agente pausado temporalmente |

---

## 5. Ejemplo

```yaml
agent:
  id: "agent-claude"
  name: "Claude 3.5 Sonnet"
  model: "claude-3.5-sonnet-20241022"
  version: "20241022"
  capabilities: ["code_generation", "review", "documentation"]
  role: "executor"
  status: active
  registered_at: "2026-07-15T10:00:00Z"
  metadata:
    provider: "anthropic"
    adapter: "anthropic-api"
```

---

## 6. Operaciones

### 6.1 Register

Registra un nuevo agente en el proyecto:

```yaml
operation: register
agent:
  id: "agent-mimo"
  name: "MiMo Auto"
  model: "mimo-auto"
  role: "executor"
  status: active
```

**Evento generado:** `ACTOR_REGISTERED`

### 6.2 Unregister

Elimina un agente del registro:

```yaml
operation: unregister
agent_id: "agent-mimo"
```

### 6.3 Update

Actualiza la información de un agente:

```yaml
operation: update
agent_id: "agent-claude"
updates:
  role: "reviewer"
  status: "active"
```

### 6.4 List

Lista todos los agentes registrados:

```yaml
operation: list
filters:
  status: active
  role: executor
```

---

## 7. Almacenamiento

El Agent Registry se almacena en:

1. **`mvgn-runtime.json`** — Campo `agent_registry` (principal)
2. **Event History** — Eventos `ACTOR_REGISTERED`, `AGENT_ASSIGNED`, etc.

---

## 8. Extensibilidad

El schema es extensible sin modificar la estructura base:
- Nuevos campos se añaden a `metadata`
- Nuevos roles se definen en Agent Roles
- Nuevos status se añaden al enum

---

## 9. Compatibilidad

- El Agent Registry es **opcional** — en modo NORMAL puede estar vacío
- Un agente sin `role` asignado se comporta como en v3.x
- Los actores existentes (Actor Identity ADR-005) se extienden con `role` (opcional)

---

**Historial:**
- 2026-07-15: Creación inicial — Agent Registry Specification v1.0
