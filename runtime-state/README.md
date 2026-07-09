# runtime-state/

> Estado vivo del proyecto. `.mvgn-context.json` + `mvgn-runtime.json` + Actor Identity.

## Propósito

El Runtime State mantiene los archivos que describen el estado presente y la identidad técnica del Runtime.

## Archivos

| Archivo | Propósito | Tamaño |
|---------|-----------|--------|
| `mvgn-runtime.json` | Manifiesto del Runtime (versión, capacidades, actores, adapters) | ≤ 3 KB |
| `actor-identity-spec.md` | Especificación de Actor Identity: schema, registro, migración | — |
| `README.md` | Este archivo | — |

## `mvgn-runtime.json`

Manifiesto oficial del Runtime (ADR-007). Contiene:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `runtime_version` | Versión del Runtime | `3.0.0` |
| `schema_version` | Versión del schema (independiente) | `1.0.0` |
| `profile` | Perfil activo | `lite` |
| `capabilities` | Subsistemas habilitados | telemetry, traceability, analytics, event_history |
| `actors` | Actores registrados | Codebuff (ai), Ncape (human) |
| `adapter` | Adapters configurados | built-in (deepseek) |

## Actores registrados

| ID | Tipo | Nombre | Proveedor | Rol |
|----|------|--------|-----------|-----|
| `actor-codebuff` | ai | Codebuff | deepseek | executor |
| `actor-ncape` | human | Ncape | — | decisor |

## Schema version

| Campo | Valor |
|-------|-------|
| `manifest_schema_version` | `1.0.0` |
| `actor_identity_schema_version` | `1.0.0` |

---

**Relación con v2.3:** `.mvgn-context.json` existía en v2.3. `mvgn-runtime.json` y Actor Identity son nuevos en v3.0.
