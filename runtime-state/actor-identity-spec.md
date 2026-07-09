# Actor Identity Specification

> **ADR-005:** Identidad de actores del Runtime. Reemplaza Agent Identity de v2.x.

---

## 1. Schema

```json
{
  "actor": {
    "id": "string",
    "type": "ai | human | automation | ci_cd | script | system",
    "name": "string",
    "provider": "string",
    "model": "string",
    "adapter": "string",
    "metadata": {}
  }
}
```

### Reglas del schema

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| `id` | Sí | Identificador único dentro del proyecto |
| `type` | Sí | Naturaleza del actor (enum extensible) |
| `name` | No | Nombre legible para humanos |
| `provider` | Condicional | Solo si `type = ai` |
| `model` | Condicional | Solo si `type = ai` |
| `adapter` | No | Mecanismo de conexión |
| `metadata` | No | Extensible para particularidades del actor |

## 2. Registro de actores

Los actores se registran en `runtime-state/mvgn-runtime.json` bajo la clave `actors`:

```json
{
  "actors": [
    {
      "id": "actor-codebuff",
      "type": "ai",
      "name": "Codebuff",
      "provider": "deepseek",
      "model": "deepseek-v4-flash",
      "metadata": { "role": "executor" }
    }
  ]
}
```

### Ciclo de registro

1. **Automático:** Cuando un actor emite su primer evento, Telemetry puede sugerir su registro
2. **Manual:** El humano puede registrar actores editando `mvgn-runtime.json`
3. **Por ADR:** Nuevos tipos de actor requieren ADR si implican cambio estructural

## 3. Migración desde Agent Identity (v2.3)

En v2.3, los actores se identificaban informalmente como \"agent\" sin schema formal. La migración es:

| v2.3 | v3.0 | Regla |
|------|------|-------|
| `agent_id` | `actor.id` | Copiar directamente |
| (no existía) | `actor.type` | Establecer `type: ai` para todos los agentes existentes |
| (no existía) | `actor.name` | Inferir del contexto o dejar vacío |
| (no existía) | `actor.provider` | Inferir del contexto (`openai`, `anthropic`, etc.) |
| (no existía) | `actor.model` | Dejar vacío si no se conoce |

### Eventos migrados

Los eventos existentes en `events/2026-07-08.jsonl` ya usan Actor Identity directamente (schema v3.0). Proyectos v2.3 que migren deben:

1. Registrar sus agentes existentes en `mvgn-runtime.json` con `type: ai`
2. Establecer el campo `type` en eventos legacy
3. Emitir `ACTOR_REGISTERED` para cada actor migrado

## 4. Evento ACTOR_REGISTERED

Cuando un actor se registra formalmente, Telemetry emite:

```json
{
  "id": "evt-{uuid}",
  "type": "ACTOR_REGISTERED",
  "actor": { ... },      ← el actor que registra
  "metadata": {
    "registered_actor": { ... }  ← el actor registrado
  }
}
```

## 5. Actores registrados actualmente

| ID | Tipo | Nombre | Proveedor | Rol |
|----|------|--------|-----------|-----|
| `actor-codebuff` | ai | Codebuff | deepseek | executor |
| `actor-ncape` | human | Ncape | — | decisor |

## 6. Principios

1. **No depende de nombres comerciales temporales:** `provider` es string, no enum fijo
2. **Multi-tipo:** IA, humano, automation, CI/CD, script, system — mismo schema
3. **Extensible:** `metadata` permite capturar particularidades sin modificar el schema
4. **Offline:** No requiere conexión a internet para funcionar

---

**Schema version:** `actor_identity_schema_version: 1.0.0`
**Relación con v2.3:** Reemplaza Agent Identity.
