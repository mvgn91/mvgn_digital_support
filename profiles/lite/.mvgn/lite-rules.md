# MVGN Lite — Rules Layer

> Reglas reducidas para proyectos pequeños, MVPs y landing pages.
> 3 gates esenciales en vez de 7. Docs mínimos. Cero ceremony innecesaria.

---

## 1. Roles

| Rol | Actor | Qué hace |
|-----|-------|----------|
| **Decisor** | Humano | Aprueba PRD, define scope, autoriza cambios |
| **Ejecutor** | IA | Propone, redacta, escribe código, actualiza docs |
| **Consistente** | IA | Mantiene docs sincronizados, refleja cambios en state_report |

---

## 2. State Machine (Lite)

```
INIT → PRD_REQUIRED → READING_TO_BUILD → IN_PROGRESS → COMPLETED
                                         ↑            ↓
                                         └── BLOCKED ◄┘
```

| Estado | Significado | Doc mínimo |
|--------|-------------|-----------|
| `INIT` | Idea capturada | `00_idea.md` |
| `PRD_REQUIRED` | PRD en borrador | `01_prd.md` |
| `READING_TO_BUILD` | PRD aprobado + tasks listas | `01_prd.md` + `03_tasks.md` |
| `IN_PROGRESS` | Ejecutando tareas | `06_state_report.md` actualizado |
| `COMPLETED` | Todas las tareas cumplidas | Todos los docs vigentes |
| `BLOCKED` | Avance impedido | `06_state_report.md` con bloqueo |

---

## 3. Gating System (Lite)

| Gate | Descripción | Verificación |
|------|-------------|--------------|
| **G01 — PRD** | No código sin PRD | `01_prd.md` existe con RFs |
| **G02 — Tasks** | No ejecución sin tarea definida | Tarea tiene criterios de aceptación |
| **G03 — State** | No acción sin state_report | `06_state_report.md` refleja estado actual |

---

## 4. Docs obligatorios (Lite)

| Doc | Propósito | Obligatorio |
|-----|-----------|-------------|
| `00_idea.md` | Idea y filosofía del proyecto | ✅ |
| `01_prd.md` | Requerimientos funcionales | ✅ |
| `03_tasks.md` | Desglose de tareas | ✅ (en READING_TO_BUILD) |
| `06_state_report.md` | Estado del proyecto | ✅ |
| `04_changelog.md` | Historial de cambios | ✅ (al completar cada batch) |
| `05_lessons_learned.md` | Lecciones aprendidas | Solo si hay incidentes |
| `02_architecture.md` | Arquitectura y ADRs | Opcional |

En Lite, **02_architecture.md es opcional**. Para landing pages y MVPs simples, las decisiones técnicas se documentan directamente en los ADRs del `README.md` o en notas dentro de `01_prd.md`.

---

## 5. Formato de state_report (Lite)

```markdown
# 06 — State Report

## Cabecera

| Campo | Valor |
|-------|-------|
| **Estado** | [INIT / PRD_REQUIRED / READING_TO_BUILD / IN_PROGRESS / COMPLETED / BLOCKED] |
| **Tarea activa** | T-XXX o — |
| **Progreso** | N / M completadas |
| **Última acción** | Qué se hizo |
| **Siguiente acción** | Qué toca hacer |
| **Bloqueos activos** | B-XX o — |
```

---

## 6. Infracciones y consecuencias

| Código | Infracción | Acción |
|--------|-----------|--------|
| I-G01 | Código sin PRD | Detener + crear PRD |
| I-G02 | Tarea sin criterios | Bloquear (B-03) + corregir |
| I-G03 | Scope creep | Revertir + nueva tarea |

---

**Historial:**
- 2026-06-24: Creación inicial — MVGN Lite Rules v1.0
