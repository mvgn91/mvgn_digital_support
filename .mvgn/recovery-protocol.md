# MVGN Recovery Protocol — Resilience Layer v2.1

> Procedimiento formal para detectar, diagnosticar y recuperar el sistema cuando entra en inconsistencia.
> Se activa cuando `system-rules.md` detecta B-06 (inconsistencia documental) o el humano lo solicita.

---

## 0. Cuándo se activa este protocolo

El recovery protocol se activa **obligatoriamente** cuando:

| Disparador | Origen | Descripción |
|------------|--------|-------------|
| B-06 activado | `system-rules.md` §5.1 | Inconsistencia documental detectada |
| Violación de gate irrecuperable | `system-rules.md` §3.1 | Gate violado y no se puede revertir |
| State report inviable | `execution-engine.md` §3 | Cabecera de state_report no refleja la realidad y no se puede corregir |
| Humano lo solicita | Humano | "Ejecuta recovery protocol" |
| Error en cascada | IA detecta | Múltiples bloqueos simultáneos que impiden operación normal |

---

## 1. Fase 1 — Detección y congelación (FREEZE)

### 1.1 Entrada
Se recibe el disparador de activación.

### 1.2 Acciones de la IA

1. Declarar estado `BLOCKED` en `06_state_report.md`
2. Actualizar cabecera:
   ```
   Estado: BLOCKED
   Tarea activa: —
   Bloqueos activos: B-06 (recovery en curso)
   ```
3. Congelar toda modificación de documentos (read-only)
4. Generar snapshot del sistema actual

### 1.3 Snapshot del sistema

La IA escribe el siguiente bloque al inicio de `06_state_report.md`, debajo de la cabecera:

```markdown
## Snapshot pre-reset — <fecha> <hora>

| Componente | Estado |
|------------|--------|
| `00_idea.md` | ✅ / ⚠️ / ❌ |
| `01_prd.md` | ✅ / ⚠️ / ❌ |
| `02_architecture.md` | ✅ / ⚠️ / ❌ |
| `03_tasks.md` | ✅ / ⚠️ / ❌ |
| `04_changelog.md` | ✅ / ⚠️ / ❌ |
| `05_lessons_learned.md` | ✅ / ⚠️ / ❌ |
| `06_state_report.md` | ✅ / ⚠️ / ❌ |

**Estado actual declarado:** <estado>
**Estado real estimado:** <estimación>
**Evidencia de inconsistencia:** <lista de contradicciones>
```

Leyenda: ✅ = válido, ⚠️ = parcial/inconsistente, ❌ = corrupto/irrecuperable.

---

## 2. Fase 2 — Diagnóstico (DIAGNOSE)

### 2.1 Lectura y evaluación

La IA lee **todos** los documentos de `docs/` y determina para cada uno:

| Criterio | Evaluación |
|----------|------------|
| ¿El archivo existe? | Sí / No |
| ¿Tiene contenido sustancial? | Sí / No |
| ¿Tiene placeholders (`<!-- -->`, `TODO`, `TBD`, `?`)? | Sí (cuántos) / No |
| ¿Está aprobado (firma humana)? | Sí / No |
| ¿Es consistente con los demás docs? | Sí / No (lista de contradicciones) |
| ¿Su versión es la más reciente conocida? | Sí / No |

### 2.2 Determinación del último estado consistente

La IA busca el estado más avanzado que puede probar con evidencia documental:

1. Si `01_prd.md` está aprobado → estado mínimo `PRD_APPROVED`
2. Si además `02_architecture.md` está aprobado → estado mínimo `ARCHITECTURE_APPROVED`
3. Si además `03_tasks.md` tiene tareas completadas → estado `IN_PROGRESS`
4. Si todas las tareas están completadas → estado `COMPLETED`
5. Si no hay PRD → estado `INIT`

### 2.3 Reporte de diagnóstico

La IA presenta al humano:

```
MVGN RECOVERY DIAGNOSIS

Docs válidos:

| Doc | Estado | Nota |
|-----|--------|------|
| `00_idea.md` | ✅ | — |
| `01_prd.md` | ❌ | secciones 3, 7 vacías |
| `02_architecture.md` | ✅ | — |
| `03_tasks.md` | ⚠️ | T-002 sin criterios |
| `04_changelog.md` | ✅ | — |
| `05_lessons_learned.md` | ✅ | — |
| `06_state_report.md` | ❌ | estado no coincide |

Último estado consistente: ARCHITECTURE_APPROVED
Basado en: 02_architecture.md firmado

Propuesta: reset a ARCHITECTURE_APPROVED
Conservando: 00_idea, 02_architecture, 05_lessons_learned
Reconstruir: 01_prd, 03_tasks, 06_state_report
```

---

## 3. Fase 3 — Reconstrucción (REBUILD)

### 3.1 Autorización

La IA espera instrucciones del humano:

- Humano autoriza la propuesta de reset
- Humano modifica la propuesta (e.g., "conserva también 03_tasks.md")
- Humano da instrucciones alternativas

Sin autorización humana, no se ejecuta ningún cambio.

### 3.2 Reglas de conservación

| Documento | ¿Se conserva? | Condición |
|-----------|--------------|-----------|
| `00_idea.md` | Siempre ✅ | Se conserva siempre. Es la semilla del proyecto. |
| `01_prd.md` | Si está aprobado ✅ | Si no, se marca como borrador y requiere nueva aprobación. |
| `02_architecture.md` | Si está aprobado ✅ | Si no, se marca como borrador y requiere nueva aprobación. |
| `03_tasks.md` | Depende | Se conservan tareas completadas. Las pendientes se revisan. |
| `04_changelog.md` | Siempre ✅ | Se conserva como historial. |
| `05_lessons_learned.md` | Siempre ✅ | Se conserva siempre. Crítico para evitar recurrencia. |
| `06_state_report.md` | No ❌ | Se regenera desde cero con el nuevo estado. |

### 3.3 Procedimiento de reconstrucción

Para cada documento a reconstruir:

**01_prd.md** (si está corrupto):
1. Si existe versión aprobada previa → restaurar desde backup implícito (historial de cambios del propio doc)
2. Si no → regenerar desde `00_idea.md` + la memoria de la IA + lo que el humano recuerde
3. Marcar como borrador: "## RECUPERADO — <fecha> — requiere revisión y nueva aprobación"

**02_architecture.md** (si está corrupto):
1. Si existe versión aprobada previa → restaurar desde historial de cambios
2. Si no → regenerar desde `01_prd.md` (si existe) + ADRs conocidos
3. Marcar como borrador con nota de recuperación

**03_tasks.md** (si está corrupto):
1. Conservar todas las tareas marcadas como `Completada`
2. Las tareas `Pendiente` se revisan contra PRD + arquitectura
3. Las que no se pueden verificar se marcan como `En revisión`
4. Añadir nota: "## RECUPERADO — <fecha> — tareas pendientes verificadas contra docs vigentes"

**06_state_report.md**:
1. Se regenera completamente con el formato de `system-rules.md` §7
2. Estado = último estado consistente determinado en Fase 2
3. Progreso = tareas completadas / tareas totales (de `03_tasks.md`)
4. Bloqueos activos = ninguno (el recovery los resuelve)

### 3.4 Marcado de documentos recuperados

Todo documento regenerado incluye al final:

```
---

## RECUPERADO — <fecha>

Este documento fue reconstruido durante el recovery protocol del <fecha>.
Estado anterior: <resumen de inconsistencia>
Requiere revisión humana y nueva aprobación si aplica.
```

---

## 4. Fase 4 — Revalidación (VALIDATE)

### 4.1 Verificación de PRD

Si `01_prd.md` fue reconstruido, verificar checklist de `system-rules.md` §4.1:

- [ ] Secciones sin placeholders
- [ ] RFs y RNFs numerados y priorizados
- [ ] Sin `TODO`, `?`, `TBD`

Si pasa → solicitar nueva firma humana.
Si no pasa → marcar como borrador, notificar al humano qué secciones están incompletas.

### 4.2 Verificación de arquitectura

Si `02_architecture.md` fue reconstruido, verificar checklist de `system-rules.md` §4.2:

- [ ] Componentes con responsabilidad y dependencias
- [ ] ADRs documentados
- [ ] Stack tecnológico definido
- [ ] Sin `TODO`, `?`, `TBD`

Si pasa → solicitar nueva firma humana.
Si no pasa → marcar como borrador, notificar al humano qué falta.

### 4.3 Verificación de tareas

Si `03_tasks.md` fue reconstruido:
- Cada tarea marcada como `Completada` debe tener criterios de aceptación verificables
- Cada tarea `Pendiente` debe tener ref a RF/RNF
- Si una tarea no tiene ref → marcarla como `En revisión` y notificar

---

## 5. Fase 5 — Reanudación (RESUME)

### 5.1 Actualización final

1. `06_state_report.md` refleja el estado post-recovery
2. El snapshot pre-reset se conserva en `06_state_report.md` como `## Snapshot pre-reset`
3. Se elimina el bloqueo de la cabecera

### 5.2 Registro en lecciones aprendidas

Se escribe en `05_lessons_learned.md`:

```
## Recovery: <fecha>

**Disparador:** B-06 / solicitud humana / error en cascada
**Causa raíz:** <qué causó la inconsistencia>
**Docs afectados:** <lista>
**Docs reconstruidos:** <lista>
**Estado post-recovery:** <estado>
**Prevención:** <cómo evitar que ocurra de nuevo>
```

### 5.3 Reanudación del sistema

1. Estado del sistema = último estado consistente determinado
2. Modo = DEBUG (post-recovery siempre arranca en debug para verificación)
3. La IA informa al humano:
   ```
   Recovery completado.
   Estado: <estado>
   Modo: DEBUG (verificación post-recovery)
   Docs reconstruidos: <lista>
   Acción recomendada: revisar docs marcados como RECUPERADO y aprobarlos
   ```
4. Humano decide si cambiar a FAST o continuar en DEBUG

---

## 6. Casos borde

### 6.1 Recovery parcial

Si solo algunos documentos están corruptos:
- No es necesario recovery completo
- Solo reconstruir los docs afectados siguiendo la matriz de impacto de `system-rules.md` §6.2
- No cambiar estado del sistema (a menos que el doc corrupto sea `01_prd.md` o `02_architecture.md` aprobados)

### 6.2 Corrupción irrecuperable

Si `00_idea.md`, `01_prd.md` y `02_architecture.md` están todos corruptos sin posibilidad de reconstrucción:
1. El sistema no puede determinar el estado ni la dirección del proyecto
2. Se declara estado `INIT`
3. Se conservan solo `05_lessons_learned.md` y `04_changelog.md` como historial
4. El humano debe redefinir la idea desde cero
5. Se registra como lección: pérdida total de documentación

### 6.3 Recovery durante ejecución de tarea

Si se activa recovery mientras una tarea está `En Progreso`:
1. La tarea se devuelve a `Pendiente`
2. Si hay cambios de código no commiteados → la IA los lista para que el humano decida qué conservar
3. Post-recovery, la tarea requiere re-verificación de criterios

### 6.4 Falso positivo

Si la IA activa recovery pero el humano determina que no hay inconsistencia real:
1. Cancelar recovery
2. Restaurar estado anterior desde el snapshot
3. Eliminar el snapshot de `06_state_report.md`
4. Registrar en `05_lessons_learned.md` como falso positivo con la causa

---

## 7. Formato del registro de recovery

Cada recovery ejecutado se registra en `05_lessons_learned.md` con este formato exacto:

```
## Recovery: <fecha> — <id correlativo>

**Disparador:** B-06 / humano / cascada
**Causa raíz:**
  - <factor 1>
  - <factor 2>

**Docs antes del recovery:**
  - 00_idea.md: ✅ / ⚠️ / ❌
  - 01_prd.md: ✅ / ⚠️ / ❌
  - ...

**Acción tomada:** reset a <estado> / reconstrucción parcial / cancelado
**Docs reconstruidos:** <lista>
**Duración:** <tiempo estimado>
**Estado final:** <estado>

**Prevención:**
  - <acción 1>
  - <acción 2>
```

---

## 8. Relación con system-rules.md y execution-engine.md

| Este archivo | system-rules.md | execution-engine.md |
|-------------|-----------------|-------------------|
| Define recuperación | Define políticas | Define ejecución diaria |
| Se activa en B-06 | Define B-06 como bloqueo | Se detiene cuando hay bloqueo |
| Reconstruye docs | Define formato de docs | Actualiza docs en operación normal |
| Opera en BLOCKED | Define estado BLOCKED | Respeta estado BLOCKED |
