# 17 — Migration Guide: v3.5 → v4.0

> **MVGN v4.0 — Multi-Agent Governance Runtime**
> **Versión del documento:** 1.0.0
> **Propósito:** Guía de migración desde MVGN v3.5 hacia MVGN v4.0.

---

## 1. Resumen de cambios

MVGN 4.0 es una evolución que añade soporte para múltiples agentes especializados, manteniendo compatibilidad total con v3.x.

### Nuevos conceptos

| Concepto | Descripción |
|----------|-------------|
| **Agent Roles** | Roles explícitos para cada agente (Executor, Reviewer, Architect, etc.) |
| **Review Pipeline** | Pipeline opcional de revisión (Task → Executor → Reviewer → Operator) |
| **Execution Modes** | Modos oficiales: NORMAL, SUPERVISED, COLLABORATIVE |
| **Review Reports** | Formato estándar de reportes de revisión |
| **Agent Registry** | Registro de agentes con ID, nombre, modelo, rol, estado |
| **Agent Events** | Eventos específicos para colaboración multi-agente |
| **Review Metrics** | Métricas de revisiones y calidad |
| **Conflict Resolution** | Protocolo de resolución de conflictos entre agentes |

### Nuevos ADRs

| ADR | Título |
|-----|--------|
| ADR-009 | Multi-Agent Governance |

### Nuevos documentos

| Documento | Propósito |
|-----------|-----------|
| `docs/10_agent_roles.md` | Especificación de roles de agentes |
| `docs/11_review_pipeline.md` | Especificación del pipeline de revisión |
| `docs/12_execution_modes.md` | Especificación de modos de ejecución |
| `docs/13_review_reports.md` | Especificación de reportes de revisión |
| `docs/14_agent_registry.md` | Especificación del registro de agentes |
| `docs/15_review_metrics.md` | Especificación de métricas de revisión |
| `docs/16_conflict_resolution.md` | Protocolo de resolución de conflictos |
| `docs/17_migration_v3.5_to_v4.0.md` | Esta guía de migración |

---

## 2. Tabla de compatibilidad

### Archivos del Runtime

| Archivo v3.5 | Estado v4.0 | Acción |
|--------------|-------------|--------|
| `core/session-contract.md` | ✅ Compatible | Sin cambios |
| `core/kernel-spec.md` | ✅ Compatible | Sin cambios |
| `core/authority-map.md` | ✅ Compatible | Sin cambios |
| `profiles/lite/.mvgn/lite-rules.md` | ✅ Compatible | Sin cambios |
| `profiles/lite/.mvgn/lite-engine.md` | ✅ Compatible | Sin cambios |
| `profiles/lite/.mvgn/lite-recovery.md` | ✅ Compatible | Sin cambios |

### Archivos del Proyecto

| Archivo v3.5 | Estado v4.0 | Acción |
|--------------|-------------|--------|
| `docs/00_idea.md` | ✅ Compatible | Sin cambios |
| `docs/01_prd.md` | ⚠️ Actualizado | Añadir RF-13 a RF-22 |
| `docs/02_architecture.md` | ⚠️ Actualizado | Añadir ADR-009 |
| `docs/03_tasks.md` | ⚠️ Actualizado | Añadir T-045 a T-058 |
| `docs/04_changelog.md` | ⚠️ Actualizado | Añadir entrada [4.0.0] |
| `docs/06_state_report.md` | ⚠️ Actualizado | Actualizar a v4.0 |
| `docs/07_runtime_spec.md` | ⚠️ Actualizado | Añadir Agent Events |
| `.mvgn-context.json` | ⚠️ Actualizado | Actualizar schema_version |
| `mvgn-runtime.json` | ⚠️ Actualizado | Añadir agent_registry, execution_mode |

### Archivos Nuevos

| Archivo v4.0 | Propósito |
|--------------|-----------|
| `docs/10_agent_roles.md` | Especificación de roles |
| `docs/11_review_pipeline.md` | Especificación del pipeline |
| `docs/12_execution_modes.md` | Especificación de modos |
| `docs/13_review_reports.md` | Especificación de reportes |
| `docs/14_agent_registry.md` | Especificación del registro |
| `docs/15_review_metrics.md` | Especificación de métricas |
| `docs/16_conflict_resolution.md` | Protocolo de conflictos |
| `docs/17_migration_v3.5_to_v4.0.md` | Esta guía |

---

## 3. Procedimiento de migración

### Paso 1: Backup

```powershell
# Crear backup de la versión actual
Copy-Item -Path "." -Destination "../MVGN-v3.5-backup" -Recurse
```

### Paso 2: Actualizar documentación existente

1. Actualizar `docs/01_prd.md` con nuevos requerimientos (RF-13 a RF-22)
2. Actualizar `docs/02_architecture.md` con ADR-009
3. Actualizar `docs/03_tasks.md` con nuevas tareas (T-045 a T-058)
4. Actualizar `docs/07_runtime_spec.md` con Agent Events

### Paso 3: Crear nuevos documentos

1. Crear `docs/10_agent_roles.md`
2. Crear `docs/11_review_pipeline.md`
3. Crear `docs/12_execution_modes.md`
4. Crear `docs/13_review_reports.md`
5. Crear `docs/14_agent_registry.md`
6. Crear `docs/15_review_metrics.md`
7. Crear `docs/16_conflict_resolution.md`

### Paso 4: Actualizar Runtime Manifest

Actualizar `mvgn-runtime.json`:

```json
{
  "runtime_version": "4.0.0",
  "schema_version": "2.0.0",
  "execution_mode": "NORMAL",
  "review_pipeline_enabled": false,
  "agent_registry": [],
  "capabilities": {
    "multi_agent": true,
    "review_pipeline": true,
    "agent_roles": true
  }
}
```

### Paso 5: Actualizar Runtime State

Actualizar `.mvgn-context.json`:

```json
{
  "schema_version": "2.0.0",
  "execution_mode": "NORMAL",
  "review_pipeline_enabled": false
}
```

### Paso 6: Verificar compatibilidad

1. Verificar que una sesión con un solo agente funciona igual que en v3.x
2. Verificar que el modo NORMAL es el comportamiento por defecto
3. Verificar que el Review Pipeline está deshabilitado por defecto

---

## 4. Compatibilidad hacia atrás

MVGN 4.0 mantiene compatibilidad total con v3.x:

| Aspecto | Compatibilidad |
|---------|----------------|
| **Un solo agente** | Funciona igual que en v3.x |
| **Modo NORMAL** | Comportamiento por defecto |
| **Review Pipeline** | Deshabilitado por defecto |
| **Agent Registry** | Puede estar vacío |
| **Actor Identity** | Se extiende con `role` (opcional) |
| **Event History** | Sigue siendo consultable |
| **ADRs existentes** | Permanecen válidos |

---

## 5. Rollback

Si es necesario volver a v3.5:

1. Restaurar backup del Paso 1
2. No hay cambios en la estructura de archivos base
3. Los archivos nuevos de v4.0 se pueden eliminar sin afectar v3.5

---

**Historial:**
- 2026-07-15: Creación inicial — Migration Guide v3.5 → v4.0
