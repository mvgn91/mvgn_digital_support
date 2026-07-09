# {NOMBRE_PROYECTO}

{Descripción en una línea del proyecto. Qué hace y para quién es.}

{Experiencia/filosofía de diseño en 1-2 oraciones. Cómo debe sentirse el producto.}

**Producción:** {URL}

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | {framework} |
| {capa} | {tecnología} |
| {capa} | {tecnología} |
| {capa} | {tecnología} |

## Estado del proyecto

| Fase | Progreso |
|------|----------|
| Fase 0: Fundación (documentación) | ✅ / ⬜ |
| Fase 1: {nombre} | ✅ / ⬜ |
| Fase 2: {nombre} | ✅ / ⬜ |
| Fase 3: {nombre} | ✅ / ⬜ |
| Fase 4: {nombre} | ✅ / ⬜ |
| Fase N: {nombre} | ⬜ Pendiente |

`{comando de validación}`: {resultado} ✅

## MVGN

Este proyecto sigue el sistema MVGN (Model-View-Guardian-Nexus).
Documentación completa del ciclo de vida en `docs/`:

| Doc | Contenido |
|-----|-----------|
| `00_idea.md` | Idea original y filosofía del producto |
| `01_prd.md` | Product Requirements Document (RF + RNF) |
| `02_architecture.md` | Arquitectura, ADRs, stack, routing |
| `03_tasks.md` | Desglose de tareas |
| `04_changelog.md` | Historial de cambios |
| `05_lessons_learned.md` | Lecciones aprendidas |
| `06_state_report.md` | Estado actual del proyecto |

Capas del sistema MVGN en `.mvgn/`: contract, kernel, rules, engine, recovery, authority.

## Estructura

```
{nombre-proyecto}/
├── src/                           # Código fuente
│   ├── components/                # Componentes reutilizables
│   ├── layouts/                   # Layouts
│   ├── pages/                     # Páginas/rutas
│   └── styles/                    # Estilos globales
├── docs/                          # Documentación MVGN
├── .mvgn/                         # Capas del sistema MVGN
├── {config-files}                 # Configuración
└── package.json
```

## Comandos

| Comando | Acción |
|---------|--------|
| `{comando}` | {acción} |
| `{comando}` | {acción} |
| `{comando}` | {acción} |

## Screens (MVP)

| Screen | Ruta | Prioridad |
|--------|------|-----------|
| {Screen name} | `{/ruta}` | P0/P1/P2 |
| {Screen name} | `{/ruta}` | P0/P1/P2 |

## Licencia

MIT — MVGN Labs

Desarrollado con el sistema MVGN
