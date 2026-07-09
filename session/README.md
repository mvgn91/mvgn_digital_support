# session/

> Session Manager. Ciclo de vida completo de las sesiones del Runtime.

## Propósito

Gestiona el ciclo de vida de las sesiones: iniciar, cerrar, reanudar, congelar. El Kernel decide cuándo; Session Manager ejecuta cómo.

## Responsabilidades

- **start**: Iniciar nueva sesión, cargar perfil, validar estado
- **close**: Finalizar sesión, escribir `SESSION_CLOSED`, actualizar state
- **resume**: Reanudar sesión anterior, verificar validez
- **freeze**: Congelar por recovery o bloqueo
- **recovery trigger**: Detectar condiciones y señalizar al Kernel
- **context export**: Generar snapshot del contexto actual

## Contratos

```
Kernel → SessionManager.start(profile, actor)
Kernel → SessionManager.resume(session_id)
Kernel → SessionManager.freeze(reason)
Kernel → SessionManager.close()
SessionManager → Kernel: session_started_event | session_error_event
```

## Límite

No gestiona tareas, reglas, gates ni analítica. Solo ciclo de vida de sesión.

---

**Relación con v2.3:** Nuevo en v3.0. No existía como subsistema independiente.
