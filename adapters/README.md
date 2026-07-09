# adapters/

> Conexión con proveedores de IA y sistemas externos.

## Propósito

Los Adapters son la capa de integración entre el Runtime y los proveedores de IA (OpenAI, Anthropic, Google, Mistral, modelos locales, etc.). Cada adapter normaliza la comunicación con un proveedor específico.

## Responsabilidades

- Normalizar la identidad del actor (proveedor + modelo)
- Proveer una interfaz uniforme para que el Kernel interactúe con cualquier proveedor
- Mantener el desacoplamiento: el Runtime no depende de APIs específicas

## Contratos

| Adapter | Proveedor |
|---------|-----------|
| Por definir en implementación | — |

## Límite

Los Adapters se cargan solo cuando se usan (ADR-008). Permanecen como especificación desacoplada hasta su invocación.

---

**Relación con v2.3:** Nuevo en v3.0. No existía en v2.3.
