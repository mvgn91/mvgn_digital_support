# README Generation — MVGN Project README

Genera el README.md del proyecto usando el template en `templates/project-readme.md`.

## Reglas

1. Usa **exclusivamente** la estructura del template `templates/project-readme.md`
2. No añadas ni quites secciones
3. Los placeholders `{...}` se reemplazan con datos reales del proyecto
4. La tabla "Estado del proyecto" refleja las fases reales del proyecto en `03_tasks.md`
5. La tabla "Stack" refleja el stack real de `02_architecture.md`
6. La tabla "Screens" refleja las rutas reales del proyecto
7. La tabla "Comandos" refleja los scripts reales en `package.json` o archivo de configuración equivalente
8. La sección MVGN siempre incluye la tabla de docs y la referencia a capas

## Flujo

1. Leer `docs/01_prd.md` → Stack, descripción
2. Leer `docs/02_architecture.md` → arquitectura, screens
3. Leer `docs/03_tasks.md` → progreso por fase
4. Leer `package.json` → comandos
5. Generar README.md en la raíz del proyecto
