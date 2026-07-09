# kernel/

> Orquestación + Dispatch. **El Kernel no ejecuta tareas, no define reglas, solo orquesta.**

## Propósito

El Kernel es el punto central de arbitraje del Runtime. Recibe solicitudes, evalúa integridad, determina qué capa o subsistema debe actuar, despacha y verifica el resultado.

## Responsabilidades

- Evaluar integridad del sistema (K-01 a K-06)
- Determinar capa activa (rules, engine, recovery, finalization)
- Despachar a subsistemas (Session Manager, Execution, Telemetry, etc.)
- Arbitrar conflictos entre capas
- Mantener el estado interno de orquestación

## Contratos

| Entrada | Salida |
|---------|--------|
| Solicitud de operación | Capa/subsistema despachado |
| Evento de subsistema | Confirmación + dispatch |

## Dependencias

- `policies/` — restricciones estructurales
- `session/` — ciclo de vida de sesiones

## Límite

El Kernel nunca ejecuta tareas de código ni modifica documentos directamente.

---

**Relación con v2.3:** Reemplaza conceptualmente a `.mvgn/kernel-spec.md` y `core/kernel-spec.md`.
