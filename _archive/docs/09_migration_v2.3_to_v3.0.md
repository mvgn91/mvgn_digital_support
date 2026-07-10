# 09 — Migration Guide: v2.3 → v3.0

> **Propósito:** Evaluar cada archivo del framework y del proyecto para determinar compatibilidad con v3.0.

---

## Resumen

| Componente | v2.3 | v3.0 | Migración |
|-----------|------|------|-----------|
| Runtime archivos | ~91 KB (Full) / ~13 KB (Lite) | ~12 KB (Runtime base) | ✅ Reducción |
| Archivos framework | 14+ | 10 módulos + legado | ✅ Convivencia |
| Eventos | No existían | Sistema completo (Event Bus + History) | 🆕 Nuevo |
| Actor Identity | Agent Identity (informal) | Actor Identity (formal, multi-tipo) | 🔄 Migrar |

---

## Archivos del framework

### Capas compartidas (core/)

| Archivo v2.3 | Estado en v3.0 | Acción |
|-------------|----------------|--------|
| `core/session-contract.md` | ✅ Compatible | Se mantiene como está. El contrato sigue aplicando. |
| `core/kernel-spec.md` | ✅ Compatible | Se mantiene. El Kernel v3.0 extiende pero no reemplaza. |
| `core/authority-map.md` | ✅ Compatible | Se mantiene. La jerarquía de prioridad no cambia. |
| `core/README.md` | ✅ Compatible | Se mantiene. |

### Capas Full (.mvgn/)

| Archivo v2.3 | Estado en v3.0 | Acción |
|-------------|----------------|--------|
| `.mvgn/system-rules.md` | ✅ Compatible | Se mantiene. Las policies de v3.0 (`policies/`) son adicionales. |
| `.mvgn/execution-engine.md` | ⚠️ Reemplazado parcialmente | Execution Engine → `kernel/` + `policies/`. El engine v2.3 se conserva como referencia. |
| `.mvgn/recovery-protocol.md` | ✅ Compatible | Se mantiene. Recovery v3.0 extiende pero no rompe. |
| `.mvgn/finalization-protocol.md` | ✅ Compatible | Se mantiene. Finalization sigue siendo el protocolo de cierre. |
| `.mvgn/session-contract.md` | ✅ Compatible | Se mantiene. |
| `.mvgn/kernel-spec.md` | ✅ Compatible | Se mantiene. |
| `.mvgn/authority-map.md` | ✅ Compatible | Se mantiene. |

### Perfiles

| Archivo v2.3 | Estado en v3.0 | Acción |
|-------------|----------------|--------|
| `profiles/lite/.mvgn/lite-rules.md` | ✅ Compatible | Se mantiene. Las reglas Lite no cambian. |
| `profiles/lite/.mvgn/lite-engine.md` | ✅ Compatible | Se mantiene. |
| `profiles/lite/.mvgn/lite-recovery.md` | ✅ Compatible | Se mantiene. |
| `profiles/lite/NYX.md` | ✅ Compatible | Se mantiene. El entry point sigue siendo válido. |
| `profiles/lite/prompts/lite-prompt.md` | ⚠️ Deprecado | Reemplazado por `skills/`. El archivo se conserva para compatibilidad. |
| `profiles/lite/tools/mvgn-lite-context.json` | ✅ Compatible | Se mantiene como template. El estado vivo ahora es `.mvgn-context.json`. |

### CLI y herramientas

| Archivo v2.3 | Estado en v3.0 | Acción |
|-------------|----------------|--------|
| `tools/mvgn.ps1` | ✅ Compatible | Se mantiene. El CLI sigue funcionando. |
| `tools/mvgn-loader.ps1` | ✅ Compatible | Se mantiene. |
| `tools/mvgn-context.json` | ⚠️ Template legacy | Reemplazado por `.mvgn-context.json` como estado vivo real. |
| `install-mvgn.ps1` | ✅ Compatible | Se mantiene. |
| `prompts/master-prompt.md` | ⚠️ Deprecado | Reemplazado por `skills/`. Se conserva para compatibilidad. |
| `prompts/*.md` | ⚠️ Deprecado | Reemplazado por skills modulares. Conservados como referencia. |

### Documentación del proyecto (docs/)

| Doc v2.3 | Estado en v3.0 | Acción |
|---------|----------------|--------|
| `00_idea.md` | ✅ Compatible | Se actualizó con visión v3.0. |
| `01_prd.md` | ✅ Compatible | Se actualizó con 12 RFs. |
| `02_architecture.md` | 🆕 Nuevo en v3.0 | No existía en v2.3 (era opcional en Lite). |
| `03_tasks.md` | ✅ Compatible | Se actualizó con 21 tareas. |
| `04_changelog.md` | ✅ Compatible | Se actualizó con historial completo. |
| `05_lessons_learned.md` | ✅ Compatible | No hay incidentes registrados. |
| `06_state_report.md` | ✅ Compatible | Refleja READING_TO_BUILD. |
| `07_runtime_spec.md` | 🆕 Nuevo | No existía en v2.3. |
| `AUDIT_REPORT.md` | ✅ Compatible | Preservado como histórico. |

---

## Cambios de nomenclatura

| v2.3 | v3.0 | Impacto |
|------|------|---------|
| Engine | Execution | Solo nomenclatura. No afecta archivos existentes. |
| Agent Identity | Actor Identity | Eventos existentes se migran con `type: ai`. |
| `.mvgn/kernel-spec.md` | `kernel/` | El archivo v2.3 se conserva; el módulo v3.0 es nuevo. |
| `prompts/` | `skills/` | Los prompts v2.3 se conservan; skills v3.0 son nuevo formato. |

---

## Procedimiento de migración

Para un proyecto existente v2.3 que quiera adoptar v3.0:

### Paso 1: Backup
```
cp -r .mvgn/ .mvgn-v2.3-backup/
```

### Paso 2: Copiar nuevos módulos v3.0
```
cp -r /path/to/v3.0/kernel/ ./
cp -r /path/to/v3.0/policies/ ./
cp -r /path/to/v3.0/session/ ./
cp -r /path/to/v3.0/telemetry/ ./
cp -r /path/to/v3.0/event-history/ ./
cp -r /path/to/v3.0/runtime-state/ ./
```

### Paso 3: Migrar actores
Los agentes existentes se registran en `mvgn-runtime.json` con `type: ai`.

### Paso 4: Migrar eventos
Si hay eventos en formato v2.3, se migran añadiendo `type: ai` a cada actor.

### Paso 5: Conservar docs
Los documentos 00-06 del proyecto son compatibles sin cambios.
