# 10 — Agent Roles Specification

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 1.0.0
> **Propósito:** Define los roles oficiales de agentes en el ecosistema MVGN.

---

## 1. Definición

Un **Agent Role** es un conjunto explícito de responsabilidades y permisos que un agente posee dentro de una sesión MVGN.

**Principio:** MVGN nunca asume que un agente cumple todos los roles. Cada rol es explícito.

---

## 2. Roles oficiales (7 roles)

### 2.1 Executor

```yaml
role:
  id: executor
  name: Executor
  description: Implementa tareas, escribe código, genera artefactos
  permissions:
    - execute
    - create
    - update
  restrictions:
    - No puede aprobar su propio trabajo
    - No puede modificar Review Reports
```

### 2.2 Reviewer

```yaml
role:
  id: reviewer
  name: Reviewer
  description: Valida trabajo, genera evidencia, no modifica
  permissions:
    - review
    - report
  restrictions:
    - Nunca implementa
    - Nunca escribe código
    - Nunca modifica Tasks
    - Solo genera evidencia
```

### 2.3 Architect

```yaml
role:
  id: architect
  name: Architect
  description: Diseña arquitectura, define ADRs, decide diseño
  permissions:
    - design
    - approve_architecture
  restrictions:
    - No implementa código
    - Solo define estructura y decisiones
```

### 2.4 Validator

```yaml
role:
  id: validator
  name: Validator
  description: Verifica criterios de aceptación, ejecuta tests
  permissions:
    - validate
    - test
  restrictions:
    - No modifica código
    - Solo verifica y reporta
```

### 2.5 Security Reviewer

```yaml
role:
  id: security
  name: Security Reviewer
  description: Revisa seguridad, detecta vulnerabilidades
  permissions:
    - security_review
    - audit
  restrictions:
    - No implementa
    - Solo reporta hallazgos
```

### 2.6 Documentation

```yaml
role:
  id: documentation
  name: Documentation
  description: Genera y mantiene documentación
  permissions:
    - document
    - update_docs
  restrictions:
    - No modifica código
    - Solo actualiza documentación
```

### 2.7 Research

```yaml
role:
  id: research
  name: Research
  description: Investiga, analiza alternativas, genera reportes
  permissions:
    - research
    - analyze
  restrictions:
    - No implementa
    - Solo investiga y reporta
```

---

## 3. Reglas fundamentales

| Regla | Descripción |
|-------|-------------|
| **Separación de responsabilidades** | La IA ejecutora nunca aprueba su propio trabajo |
| **Reviewer es validador** | La IA revisora nunca implementa — solo genera evidencia |
| **Autoridad humana** | Ningún agente puede aprobar, fusionar o cerrar automáticamente |
| **Roles explícitos** | MVGN nunca asume que un agente cumple todos los roles |

---

## 4. Asignación de roles

Los roles se asignan en el **Agent Registry** al registrar un agente:

```yaml
agent:
  id: "agent-001"
  name: "Claude 3.5"
  role: "executor"  # Rol asignado
```

Un agente puede tener un solo rol por sesión. Para cambiar de rol, debe re-registrarse.

---

## 5. Compatibilidad

- Los roles son **opcionales** — en modo NORMAL (un solo agente), el agente asume todos los roles por defecto
- Los roles existentes (Actor Identity ADR-005) se extienden con `role` (opcional)
- Un agente sin `role` asignado se comporta como en v3.x

---

**Historial:**
- 2026-07-15: Creación inicial — Agent Roles Specification v1.0
