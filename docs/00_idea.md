# 00 — Idea: MVGN v3.0

> **M.V.G.N. is an AI Governance Runtime.**
>
> De framework de gobernanza a runtime de gobernanza para agentes de IA.

## Filosofía

MVGN nació como un framework de gobernanza mínima viable para proyectos de desarrollo con IA. La evolución a v3.0 consolida un cambio de posicionamiento fundamental:

**MVGN ya no es solo un conjunto de reglas y documentos. Es un Runtime que orquesta, registra, rastrea y analiza la interacción entre agentes de IA y proyectos de software.**

Este cambio reconoce que la gobernanza efectiva en la era de los agentes de IA requiere:
- **Orquestación en tiempo real** (Runtime), no solo documentación estática
- **Telemetría estructurada** para entender qué ocurre durante las sesiones
- **Trazabilidad de agentes** para saber quién hizo qué, con qué modelo y proveedor
- **Analítica derivada** para medir productividad, detectar patrones y optimizar el proceso

## Posicionamiento

```
M.V.G.N. v2.3 → Framework de Gobernanza (reglas, gates, documentos)
M.V.G.N. v3.0 → AI Governance Runtime (reglas + telemetría + trazabilidad + analítica)
```

## Núcleo de v3.0

1. **Runtime** — El Kernel evoluciona para orquestar no solo capas del framework, sino también subsistemas de telemetría, trazabilidad y analítica.
2. **Telemetry** — Registro de eventos estructurados del Runtime. Sin conversaciones, sin prompts, sin código.
3. **Traceability** — Trazabilidad de agentes: qué IA, qué proveedor, qué modelo, qué adaptador, qué documentos afectó.
4. **Analytics** — Métricas derivadas del historial. Solo lectura. Nunca escribe directamente.
5. **Event History** — Sistema Append Only para reconstruir la evolución completa del proyecto.
6. **Agent Identity** — Esquema multi-proveedor estable para identificar agentes (OpenAI, Anthropic, Google, Mistral, locales, etc.).
7. **Arquitectura modular** — Kernel / Policies / Profiles / Telemetry / Skills / Adapters.

## Principios rectores

- **Context Budget First** — Cada nuevo subsistema debe justificar su costo en contexto.
- **Minimum Effective Governance** — Gobernanza mínima viable incluso con más capacidades.
- **Append Only History** — El historial de eventos es inmutable. Solo crece.
- **Analytics never writes** — Analytics deriva métricas, no genera eventos.
- **Compatibilidad** — v3.0 debe soportar migración desde v2.3.

## Restricciones

- No aumentar innecesariamente el presupuesto de contexto del Runtime base.
- Telemetry no almacena conversaciones, prompts ni código generado.
- `.mvgn-context.json` sigue siendo el estado vivo del proyecto (solo presente, no historial).
- El sistema de Event History es independiente del Runtime State.

## Roadmap (propuesto)

| Release | Enfoque |
|---------|---------|
| v3.0-alpha | Arquitectura + ADR + subsistemas base (Telemetry, Traceability, Analytics esqueletos) |
| v3.0-beta | Event History + Agent Identity + Skills base |
| v3.0 | Runtime completo + adaptadores + documentación + migración desde v2.3 |
