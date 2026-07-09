# MVGN Kernel Specification — Orchestrator Layer

> Versión compartida del Kernel (Full + Lite). Orquesta system-rules, execution-engine y recovery-protocol.

---

## 1. Arquitectura del sistema

```
INPUT → KERNEL → validar integridad → determinar capa activa → despachar → ejecutar → state update → KERNEL
```

## 2. Jerarquía de verdad

| Prioridad | Capa | Cuándo gana |
|-----------|------|-------------|
| 1 (máxima) | **recovery-protocol** | Cuando hay corrupción o inconsistencia crítica |
| 2 | **system-rules** | Define qué es estructuralmente válido |
| 3 | **execution-engine** | Ejecuta dentro de los límites permitidos por rules |

## 3. Estado interno del Kernel

```
KERNEL_STATE = {
  mode:          FAST | DEBUG | FULL | FLOW
  integrity:     OK | DEGRADED | CORRUPTED
  active_layer:  rules | engine | recovery | finalization | idle
  locked:        true | false
}
```

## 4. Transiciones del Kernel

```
                    ┌───────────┐
                    │   IDLE    │
                    └─────┬─────┘
                          │ operación solicitada
                          ▼
                    ┌───────────┐
                    │ EVALUATE  │
                    └─────┬─────┘
                          │
              ┌───────────┼────────────┬──────────────┐
              ▼           ▼            ▼              ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
        │ RULES    │ │ ENGINE   │ │ RECOVERY │ │ FINALIZATION │
        └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘
             │            │            │              │
             └────────────┼────────────┼──────────────┘
                          ▼            ▼
                    ┌───────────┐
                    │  UPDATE   │
                    └─────┬─────┘
                          │
                          ▼
                    ┌───────────┐
                    │   IDLE    │
                    └───────────┘
```

## 5. Control de integridad

| # | Check | Qué valida |
|---|-------|-----------|
| K-01 | State report accesible | `06_state_report.md` existe |
| K-02 | Estado único | Cabecera declara un solo estado |
| K-03 | Consistencia estado vs docs | Estado coincide con evidencia documental |
| K-04 | Sin bloqueos fantasma | Bloqueos listados existen realmente |
| K-05 | Capa activa válida | Capa a despachar existe y es aplicable |
| K-06 | Post-ejecución estable | Sistema sigue coherente después de operación |

## 6. Regla final

El Kernel nunca ejecuta tareas. El Kernel nunca define reglas. El Kernel solo orquesta.

---

**Historial:**
- 2026-06-24: Versión compartida del Kernel (perfiles Full y Lite)
