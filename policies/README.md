# policies/

> Reglas, gates, transiciones. Define qué es estructuralmente válido.

## Propósito

Las Policies son el sistema de reglas del Runtime. Definen los estados, transiciones, gates y condiciones de bloqueo que el Kernel utiliza para validar operaciones.

## Responsabilidades

- Definir estados válidos del proyecto
- Definir gates (PRD, Tasks, State)
- Definir transiciones entre estados
- Definir condiciones de bloqueo (B-01 a B-08)
- Definir infracciones y consecuencias (I-G01, etc.)

## Contratos

| Entrada | Salida |
|---------|--------|
| Operación propuesta + estado actual | Válido/inválido + restricciones activas |
| Consulta de gate | ¿Está aprobado? + evidencia |

## Límite

Las Policies no ejecutan operaciones. Solo validan.

---

**Relación con v2.3:** Reemplaza conceptualmente a `.mvgn/system-rules.md`.
