# 12 — Execution Modes Specification

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 1.0.0
> **Propósito:** Define los modos oficiales de ejecución en el ecosistema MVGN.

---

## 1. Definición

Un **Execution Mode** define cómo los agentes colaboran en una sesión MVGN.

**Principio:** El modo por defecto es NORMAL (un solo agente), manteniendo compatibilidad con v3.x.

---

## 2. Modos oficiales

### 2.1 NORMAL

```yaml
mode:
  id: normal
  name: NORMAL
  description: Un solo agente ejecuta todo
  agents: 1
  pipeline: disabled
  requirements:
    - Actor Identity
```

**Comportamiento:**
- Un agente asume todos los roles por defecto
- No se requiere Reviewer
- El agente trabaja directamente con el Operator
- Comportamiento idéntico a v3.x

### 2.2 SUPERVISED

```yaml
mode:
  id: supervised
  name: SUPERVISED
  description: Un agente ejecuta, otro revisa
  agents: 2
  pipeline: enabled
  requirements:
    - Actor Identity
    - Agent Roles
    - Review Pipeline
```

**Comportamiento:**
- Un agente ejecuta (Executor)
- Otro agente revisa (Reviewer)
- El Operator aprueba
- Se generan Review Reports

### 2.3 COLLABORATIVE

```yaml
mode:
  id: collaborative
  name: COLLABORATIVE
  description: Múltiples agentes cooperan
  agents: "2+"
  pipeline: enabled
  requirements:
    - Actor Identity
    - Agent Roles
    - Review Pipeline
    - Agent Registry
```

**Comportamiento:**
- Múltiples agentes con roles diferentes cooperan
- Cada agente tiene un rol explícito
- Se generan Review Reports
- Conflict Resolution se activa

### 2.4 AUTONOMOUS (Futuro)

```yaml
mode:
  id: autonomous
  name: AUTONOMOUS
  description: Agentes operan sin supervisión humana
  status: not_implemented
```

**Estado:** No implementado en v4.0. Documentado para referencia futura.

---

## 3. Selección de modo

El modo se selecciona al inicio de la sesión:

```json
{
  "execution_mode": "NORMAL"
}
```

O se cambia durante la sesión:

```json
{
  "execution_mode": "SUPERVISED"
}
```

---

## 4. Requisitos por modo

| Modo | Agentes mínimos | Review Pipeline | Agent Registry |
|------|-----------------|-----------------|----------------|
| NORMAL | 1 | No requerido | No requerido |
| SUPERVISED | 2 | Requerido | No requerido |
| COLLABORATIVE | 2+ | Requerido | Requerido |

---

## 5. Compatibilidad

- **NORMAL** es el modo por defecto y mantiene compatibilidad total con v3.x
- Los modos SUPERVISED y COLLABORATIVE son opcionales
- El cambio de modo genera un evento `STATE_CHANGED`

---

**Historial:**
- 2026-07-15: Creación inicial — Execution Modes Specification v1.0
