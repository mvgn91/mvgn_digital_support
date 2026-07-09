# skills/

> Comportamientos reutilizables. Evolución de los prompts.

## Propósito

Skills son unidades de comportamiento reutilizable que el Runtime puede cargar dinámicamente. Reemplazan el concepto de "prompts" de v2.3 con una estructura más formal: cada skill tiene un propósito, una interfaz y un contrato.

## Responsabilidades

- Proveer behaviours reutilizables (prompts, instrucciones, templates)
- Carga dinámica: solo se cargan cuando se invocan
- Interfaz estandarizada para que el Kernel las ejecute

## Contratos

| Skill | Propósito |
|-------|-----------|
| Por definir en implementación | — |

## Límite

Las Skills se cargan bajo demanda (ADR-008). No se precargan al iniciar el Runtime.

---

**Relación con v2.3:** Reemplaza conceptualmente a `profiles/*/prompts/` y `prompts/`.
