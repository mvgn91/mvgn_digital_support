# MVGN Lite — Recovery Protocol

> Protocolo de recuperación simplificado para MVGN Lite.
> Solo 3 fases: FREEZE → DIAGNOSE → RESUME.

---

## 1. Activación

Se activa cuando:
- `06_state_report.md` no existe o es ilegible
- Inconsistencia detectada entre estado y docs
- Humano lo solicita

---

## 2. Fase 1 — FREEZE

1. Congelar toda modificación de docs (read-only)
2. Notificar al humano: "Inconsistencia detectada"
3. Esperar instrucciones

---

## 3. Fase 2 — DIAGNOSE

1. Leer todos los docs existentes
2. Determinar el estado más avanzado verificable
3. Reportar al humano:
   ```
   Docs válidos:
     ✅ 00_idea.md
     ✅ 01_prd.md
     ❌ 06_state_report.md — no coincide con evidencia
   
   Último estado consistente: PRD_REQUIRED
   ```

---

## 4. Fase 3 — RESUME

1. Humano autoriza la corrección
2. Regenerar `06_state_report.md` con el estado correcto
3. Actualizar `05_lessons_learned.md`
4. Reanudar operación normal

---

**Historial:**
- 2026-06-24: Creación inicial — MVGN Lite Recovery v1.0
