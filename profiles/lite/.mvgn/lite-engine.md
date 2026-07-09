# MVGN Lite — Execution Engine

> Motor de ejecución simplificado. Modo "Flow" (auto-detect + auto-advance).
> Sin capas de recovery complejas. Sin finalization pesada.

---

## 1. Modo de operación: FLOW

Lite tiene un solo modo: **FLOW**. Es el equivalente a FAST pero con aún menos fricción.

| Aspecto | FLOW |
|---------|------|
| **Validación pre-ejecución** | ¿Existe PRD? ¿Tarea tiene criterios? |
| **Post-task** | Criterios verificados + lint si aplica |
| **State update** | Automático, inmediato |
| **Propagación** | State + tasks |
| **Avance** | Auto-advance sin preguntar |
| **Changelog** | Al final del batch |

---

## 2. Task Execution Loop (Lite)

```
1. SELECCIONAR → T-XXX de 03_tasks.md (Pendiente, dependencias ok)
2. VALIDAR → ¿Tiene criterios? ¿PRD existe? ¿Estado permite?
3. EJECUTAR → Implementar cambio atómico
4. VERIFICAR → ¿Criterios cumplidos? ¿Sin errores?
5. REGISTRAR → Actualizar state_report + tasks
6. AVANZAR → Auto-advance a siguiente tarea
```

Si una tarea falla verificación:
1. Registrar en `05_lessons_learned.md`
2. Devolver a Pendiente
3. Notificar al humano

---

## 3. Propagación documental

Después de cada tarea completada:

| Documento | Cuándo se actualiza |
|-----------|--------------------|
| `03_tasks.md` | Inmediato (marcar tarea) |
| `06_state_report.md` | Inmediato (cabecera) |
| `04_changelog.md` | Al final del batch |

---

## 4. Interrupts (cuándo detenerse)

| Condición | Acción |
|-----------|--------|
| Batch completado | Mostrar resumen |
| Tarea falla | Devolver a Pendiente + notificar |
| Scope creep detectado | Crear nueva tarea |
| Humano interrumpe | Detener inmediatamente |

---

**Historial:**
- 2026-06-24: Creación inicial — MVGN Lite Engine v1.0
