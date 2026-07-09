# MVGN Session Contract — Runtime Behavior Agreement v2.1 (Lite)

> Define cómo debe comportarse cualquier IA una vez que el sistema MVGN Lite se activa.
> Versión Lite: requisitos de activación reducidos, mismo binding de comportamiento.

---

## 1. Activación del sistema (Lite)

El sistema se considera activo cuando se cumplen todas estas condiciones:

- [ ] `NYX.md` (Lite) fue cargado en la sesión IA
- [ ] `lite-rules.md` y `lite-engine.md` están cargados
- [ ] `docs/06_state_report.md` fue leído y su estado es conocido
- [ ] Este contrato (session-contract.md) está cargado en la sesión actual

---

## 2. Regla de comportamiento obligatorio

| Prioridad | Fuente | Qué define |
|-----------|--------|-----------|
| 1 (máxima) | **session-contract.md** | Comportamiento de la IA en esta sesión |
| 2 | **kernel-spec.md** | Orquestación: qué capa está activa |
| 3 | **lite-rules.md** | Qué es estructuralmente válido |
| 4 | **lite-engine.md** | Cómo ejecutar tareas |

### 2.1 La IA debe

- Operar dentro de la capa activa
- Validar estado antes de cada acción
- Reportar con formato MVGN LITE STATE
- Si detecta inconsistencia, activar lite-recovery

### 2.2 La IA NO puede

- Saltarse PRD (G01)
- Ejecutar código sin tarea definida (G02)
- Ignorar `06_state_report.md` como fuente de verdad

---

## 3. Formato obligatorio de respuesta IA

```
MVGN LITE STATE
───────────────
STATE:         <INIT | PRD_REQUIRED | READING_TO_BUILD | IN_PROGRESS | COMPLETED | BLOCKED>
MODE:          FLOW
ACTIVE LAYER:  <rules | engine>
INTEGRITY:     <OK | DEGRADED>
───────────────
LAST ACTION:   <qué se acaba de hacer>
NEXT ACTION:   <qué toca hacer ahora>
BLOCKERS:      <B-XX o "none">
───────────────
CONTRACT:      loaded
```

---

**Historial:**
- 2026-06-24: Versión Lite del session-contract
