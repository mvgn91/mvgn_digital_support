# MVGN Execution Engine — Runtime Layer v2.3

> Comportamiento operativo del sistema durante ejecución diaria.
> Define cómo se ejecutan tareas, cómo avanza el sistema y cómo se comporta en cada modo.
> Depende de `system-rules.md` para políticas. No las redefine.

---

## 1. Modos de operación

A partir de **v2.3** el sistema opera con un único modo: **FAST**. Para diagnóstico profundo, validación completa de gates o pausar antes de avanzar, se activa el flag opcional `audit: true` en la cabecera de `06_state_report.md`.

| Aspecto | FAST (default) | FAST + `audit: true` |
|---------|----------------|----------------------|
| **Validación pre-ejecución** | B-03, B-04 | Todos los gates (G01–G05) + explicar cada uno |
| **Post-task verification** | Criterios + lint | Criterios + lint + tests + logs + revisar regresiones |
| **State report update** | Automático IA | Automático + explicación del cambio |
| **Propagación documental** | State + tasks | State + tasks + changelog por tarea |
| **Avance automático** | Sí | No (pausa explicativa antes de continuar) |
| **Verbosidad IA** | Solo resultado | Causa + efecto + posible solución |
| **Uso** | Desarrollo diario | Resolución de bugs, blockers, releases |

**Activación:** El flag `audit: true` se declara en `06_state_report.md` (cabecera) al inicio de la sesión o cuando se necesite durante la misma.

**Default:** `audit: false` (modo FAST).

**Nota (v2.3):** Los antiguos modos `DEBUG` y `FULL` fueron deprecados. Su comportamiento se cubre ahora por la combinación de `FAST + audit: true`. Ver `system-rules.md` §X Feature Cost Policy para el rationale.

---

## 2. Task execution loop

Ciclo obligatorio para cada tarea. El nivel de detalle depende del flag `audit`.

```
┌──────────────────────────────────────────────────┐
│ 1. SELECCIÓN  → elegir T-XXX de 03_tasks.md      │
│ 2. VALIDACIÓN  → verificar pre-condiciones        │
│ 3. EJECUCIÓN   → implementar                      │
│ 4. VERIFICACIÓN→ validar criterios de aceptación  │
│ 5. REGISTRO    → actualizar docs                  │
│ 6. DECISIÓN    → ¿continuar o detener?            │
└──────────────────────────────────────────────────┘
```

### 2.1 Selección

La IA toma la primera tarea en estado `Pendiente` de `03_tasks.md` cuyas dependencias estén cumplidas.

- Si no hay tareas pendientes → informar al humano y sugerir próximos pasos.
- Si la tarea seleccionada está bloqueada → informar y detener.

### 2.2 Validación pre-ejecución

**FAST (default):**
- [ ] Tarea tiene criterios de aceptación (B-03)
- [ ] Tarea tiene referencia a PRD o arquitectura (B-04)
- [ ] Tarea no depende de otra incompleta

Si falla → Bloquear (B-03 o B-04).

**FAST + `audit: true`:**
- [ ] Lo mismo que FAST
- [ ] Explicar qué se validó y por qué es suficiente
- [ ] Listar dependencias y su estado
- [ ] Estado del proyecto es `READY_TO_BUILD` o `IN_PROGRESS`
- [ ] Gate G01 (PRD aprobado)
- [ ] Gate G02 (Arquitectura aprobada)
- [ ] Gate G03 (Tarea con criterios + refs)
- [ ] Gate G04 (State report actualizado)
- [ ] Gate G05 (Scope definido)

Si falla → Bloquear + explicar causa raíz.

### 2.3 Ejecución

- Una sola tarea a la vez. No se abre otro frente.
- No se añade funcionalidad fuera del alcance de la tarea.
- Si surge algo fuera de alcance → crear `T-NEXT` en `03_tasks.md` y notificar al humano.

### 2.4 Verificación post-ejecución

**FAST (default):**
- [ ] Verificar criterios de aceptación de la tarea
- [ ] Ejecutar lint / typecheck
- [ ] Confirmar que el cambio es atómico

**FAST + `audit: true`:**
- [ ] Lo mismo que FAST
- [ ] Revisar logs de ejecución
- [ ] Explicar qué se verificó y el resultado
- [ ] Ejecutar pruebas relevantes (unitarias, integración)
- [ ] Verificar cobertura si aplica
- [ ] Revisar que no hay regresiones

Si la verificación falla:
1. Registrar en `05_lessons_learned.md`
2. Devolver tarea a `Pendiente` en `03_tasks.md`
3. Informar al humano con el error y posible solución
4. Si el flag `audit: true` está activo: pausar y esperar confirmación antes de continuar con la siguiente tarea.

### 2.5 Registro

Actualizar docs según flag `audit` (ver sección 4).

### 2.6 Decisión

Ver sección 5 (auto-advance) y sección 6 (interrupts).

---

## 3. State report update logic

La cabecera de `06_state_report.md` se actualiza después de cada tarea.

**Formato de actualización:**

```
Estado:         [nuevo estado]
Tarea activa:   [T-XXX o —]
Progreso:       [N] / [M] completadas
Última acción:  [descripción corta]
Siguiente acción:[descripción corta]
Audit:          true | false
Bloqueos activos:[B-XX o —]
```

**Por flag `audit`:**

| `audit` | Cuándo se actualiza | Cómo |
|---------|--------------------|------|
| `false` (FAST) | Inmediato, automático | IA sobrescribe cabecera, notifica al humano solo el resultado |
| `true` | Inmediato, automático + pausa | IA sobrescribe cabecera + añade explicación del cambio, pausa antes de avanzar |

La actualización reemplaza la cabecera completa. No se acumulan versiones. El historial del proyecto se mantiene en `04_changelog.md`.

---

## 4. Propagación documental por flag `audit`

Después de completar una tarea:

| Documento | `audit: false` (FAST) | `audit: true` |
|-----------|------------------------|---------------|
| `03_tasks.md` | Actualizar estado de tarea | Actualizar + nota |
| `06_state_report.md` | Actualizar cabecera | Actualizar + explicar |
| `04_changelog.md` | Al final del batch | Por tarea |
| `05_lessons_learned.md` | Solo incidentes | Solo incidentes |

Con `audit: false`: la IA difiere `04_changelog.md` hasta el final del batch para reducir fricción.
Con `audit: true`: cada tarea produce una entrada en `04_changelog.md`.

---

## 5. Auto-advance y ejecución continua

### 5.1 Auto-advance

Después de registrar una tarea completada, la IA evalúa:

```
¿T-N+1 existe en estado Pendiente?
├── No → Detener. Informar resumen del batch.
└── Sí
    └── ¿Dependencias de T-N+1 están cumplidas?
        ├── No → Detener. Informar qué falta.
        └── Sí
            └── Consultar flag audit:
                ├── audit: false → Avanzar automáticamente. Notificar: "Continuando con T-00N".
                └── audit: true  → Explicar + pausar. Esperar "¿Continuar?" del humano.
```

### 5.2 Batch execution

El humano define un rango de tareas a ejecutar en secuencia:

> "Ejecuta T-003 a T-005"
> IA: "Batch T-003 → T-005. Modo FAST."

Comportamiento durante el batch:
- Ejecución secuencial e ininterrumpida
- State report se actualiza después de cada tarea
- `04_changelog.md` se actualiza al finalizar el batch (con `audit: true`, por tarea)
- Si ocurre un bloqueo → el batch se interrumpe
- Si una tarea falla verificación → se detiene el batch, se marca la tarea como Pendiente y se registra en `05_lessons_learned.md`

### 5.3 Finalización de batch final

Cuando el batch completo agota todas las tareas de `03_tasks.md` (ninguna queda en estado `Pendiente`):

1. La IA informa al humano que **no hay más tareas pendientes**
2. Sugiere ejecutar el **Finalization Protocol** (`.mvgn/finalization-protocol.md`)
3. Si el humano autoriza, el Kernel cambia la capa activa a `finalization`
4. El Engine se congela hasta que finalice el protocolo
5. Si el humano no autoriza, el sistema queda en `IN_PROGRESS` sin tareas pendientes

### 5.4 Resumen de batch

Al finalizar un batch (completado o interrumpido), la IA presenta:

```
Batch T-003 → T-005:
  ✓ T-003 completada
  ✓ T-004 completada
  ✗ T-005: bloqueada (dependencia T-002 incompleta)
  Progreso: 4/5
  Siguiente: resolver bloqueo de T-005
```

---

## 6. Interrupt rules (condiciones de parada)

La IA **debe detenerse inmediatamente** y notificar al humano cuando:

| Condición | Acción |
|-----------|--------|
| Batch completado | Informar resumen, sugerir próximos pasos |
| Bloqueo detectado (B-01 a B-08) | Entrar en BLOCKED, explicar causa raíz |
| Tarea falla verificación | Registrar en lessons, devolver a Pendiente |
| No hay más tareas pendientes válidas | Informar, sugerir nuevas tareas o cierre |
| Scope creep detectado | Revertir cambios extra, crear nueva tarea, notificar |
| Humano solicita interrupción | Detener inmediatamente, esperar instrucciones |
| `audit: true` activo | Pausar antes de cada avance, esperar confirmación |

---

## 7. Árbol de decisión rápido

```
¿Cuál es el flag audit?
├── audit: false (FAST — default)
│   ├── Leer cabecera de state_report
│   ├── Tomar siguiente tarea Pendiente de 03_tasks.md
│   ├── Validar: ¿tiene criterios? ¿dependencias ok?
│   │   ├── No → Bloquear (B-03/B-04). Informar.
│   │   └── Sí → Ejecutar
│   ├── Verificar criterios + lint
│   │   ├── Fallo → lessons + Pendiente
│   │   └── OK → Actualizar tasks + state_report
│   └── ¿Siguiente tarea lista?
│       ├── Sí → Auto-advance
│       └── No → Informar resumen
│
└── audit: true
    ├── Validar todos los gates (G01–G05) + explicar cada uno
    ├── Ejecutar con registro detallado
    ├── Verificar + tests + logs + explicar resultado
    ├── Actualizar docs con detalle (changelog por tarea)
    └── Preguntar antes de avanzar
```

---

## 8. Performance rules

| Flag `audit` | Objetivo | Acciones permitidas | Acciones omitidas |
|--------------|----------|--------------------|--------------------|
| `false` (FAST) | Velocidad | Validación mínima, updates automáticos, auto-advance | Validación completa, changelog por tarea, pausas explicativas |
| `true` | Diagnóstico + control | Validación completa, logs detallados, explicaciones, pausar antes de avanzar | Auto-advance sin revisión, ejecución en batch silenciosa |

---

## 9. Consistencia con system-rules.md

Este engine NO puede:
- Cambiar estados del sistema directamente (solo a través de transiciones definidas)
- Modificar PRD o arquitectura sin pasar por los gates G01, G02
- Saltar fases del state machine
- Decidir aprobaciones (eso es rol del humano)

Solo ejecuta dentro de las restricciones definidas en `system-rules.md`.
