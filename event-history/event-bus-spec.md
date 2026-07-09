# Event Bus Specification

> **ADR-003:** Punto único de enrutamiento de eventos del Runtime.
> **Restricción:** ≤ 100 líneas (actual: 59).

---

## 1. Propósito

El Event Bus es el mecanismo por el cual los eventos generados por el Kernel y los subsistemas se distribuyen a los consumidores registrados.

**No es Kafka, RabbitMQ ni un message broker.** Es una interfaz de dispatch.

## 2. Interfaz

```
dispatch(event: RuntimeEvent) → void
```

- Recibe un evento estructurado (según `events/event.schema.json`)
- Lo distribuye a todos los consumidores suscritos
- No almacena, no transforma, no encola

## 3. Consumidores registrados

| Consumidor | Acción | Tipo |
|------------|--------|------|
| Event History | Persiste en `events/{YYYY-MM-DD}.jsonl` | Asíncrono |
| Runtime State | Actualiza `.mvgn-context.json` si aplica | Síncrono |
| Traceability | Registra relación actor-acción | Asíncrono |
| Analytics | Actualiza caché de métricas (bajo demanda) | Bajo demanda |

## 4. Garantías

| Garantía | Descripción |
|----------|-------------|
| Dispatch best-effort | Intenta entregar a todos los consumidores |
| No bloqueante | Un consumidor lento no bloquea a los demás |
| Orden por sesión | Eventos de la misma sesión se entregan secuencialmente |

## 5. No garantías

| No garantía | Razón |
|-------------|-------|
| Exactly-once | Pueden perderse eventos en fallo del sistema |
| Orden global | Sesiones distintas pueden tener timestamps no secuenciales |
| Persistencia | El Event Bus no almacena — eso es del Event History |

## 6. Registro de consumidores

```
eventBus.subscribe("event-history", consumer)
eventBus.subscribe("runtime-state", consumer)
eventBus.subscribe("traceability", consumer)
eventBus.subscribe("analytics", consumer)
```
