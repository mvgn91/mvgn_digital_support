# 08 — Estándar de Evaluación MVGN v1.0 (Release Candidate)

> **Documento normativo para MVGN DIGITAL HUB**
> **Fuente:** Directiva ATHENEA / ATHN1 — Activo Cognitivo Editorial
> **Perfil:** Lite (modo FLOW)
> **Integración:** MVGN v3.5
> **Versión del estándar:** v1.0-rc

---

## Propósito

El **Estándar de Evaluación MVGN** define la metodología utilizada por MVGN DIGITAL HUB para evaluar herramientas, plataformas y servicios tecnológicos.

No establece una plantilla de redacción.

Establece un **protocolo de evaluación**.

Todo artículo publicado bajo este estándar debe poder demostrar:

- cómo fue evaluado;
- bajo qué condiciones;
- con qué evidencia;
- cuáles fueron las observaciones;
- cuáles son los límites de las conclusiones.

El objetivo no es recomendar software.

El objetivo es **documentar experiencia técnica verificable**.

---

## Principios Editoriales

Toda evaluación publicada bajo MVGN debe respetar los siguientes principios.

### P-01 — Diagnosticar antes de explicar

Toda evaluación comienza identificando el problema.

Nunca por las características.

### P-02 — Describir antes de opinar

Primero se documentan los hechos.

Después se interpretan.

### P-03 — Citar antes de concluir

Toda afirmación técnica debe estar sustentada por:

- evidencia obtenida durante la evaluación;
- documentación oficial;
- o ambas.

### P-04 — Separar hechos de interpretación

El artículo distingue claramente entre:

- hechos;
- observaciones;
- conclusiones.

### P-05 — Neutralidad editorial

No utilizar:

- lenguaje comercial;
- entusiasmo artificial;
- llamadas a la compra;
- puntuaciones numéricas.

MVGN documenta.

El lector decide.

### P-06 — Evidencia sobre opinión

Ninguna afirmación importante debe existir sin evidencia.

Toda captura, log o referencia debe demostrar algo concreto.

---

## Requisitos Normativos

Los siguientes requisitos son obligatorios.

| Código | Descripción | Validación |
|--------|-------------|------------|
| **REQ-001** | Toda evaluación debe generar un Expediente único. Formato: `EXP-AAAA-NNNNN` | Presente en frontmatter del artículo |
| **REQ-002** | Toda evaluación debe indicar: versión del estándar, autor, responsable de revisión | Frontmatter: `versionEstandar`, `autor`, `revision` |
| **REQ-003** | Toda conclusión debe derivarse de observaciones registradas. Nunca de impresiones personales. | Veredicto cita OBS-XXX |
| **REQ-004** | Toda afirmación técnica relevante debe poder rastrearse hasta una evidencia o fuente documental. | Evidencias enlazan a observaciones |
| **REQ-005** | Toda evaluación debe declarar explícitamente su alcance. Qué cubre y qué no. | Sección PEM-03 presente |
| **REQ-006** | Toda evaluación debe indicar el contexto real de uso. | Frontmatter: `contextoUso` |
| **REQ-007** | Toda imagen publicada debe demostrar una afirmación realizada dentro del artículo. | Evidencias asociadas a OBS |
| **REQ-008** | Todo artículo debe finalizar con un veredicto operativo. No comercial. | PEM-10 presente |

---

## Protocolos de Evaluación MVGN (PEM)

Los siguientes protocolos conforman la estructura oficial del estándar.

### PEM-01 — Expediente

Identificador permanente del documento.

Campos obligatorios:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `expediente` | Identificador único | `EXP-2026-00001` |
| `herramienta` | Nombre de la herramienta evaluada | Bitwarden |
| `estado` | Estado de la evaluación | `publicado` / `borrador` / `revisión` |
| `autor` | Nombre del autor | A. Ibañez |
| `revision` | Responsable de revisión | Ncape |
| `versionEstandar` | Versión del estándar usado | `v1.0-rc` |
| `fechaPublicacion` | Fecha de publicación | 2026-07-08 |

### PEM-02 — Ficha MVGN

Resumen técnico de la evaluación. Debe responder rápidamente:

- qué se evaluó;
- durante cuánto tiempo;
- dónde;
- con qué alcance;
- con qué nivel de confianza.

Se presenta como un bloque compacto al inicio del artículo (colapsable en mobile, visible siempre en desktop).

### PEM-03 — Alcance

Debe responder dos preguntas:

1. **Qué cubre** esta evaluación.
2. **Qué no cubre** esta evaluación.

Su objetivo es limitar correctamente las conclusiones.

### PEM-04 — Metodología

Describe cómo se realizó la evaluación.

Incluye:

- principios aplicados;
- tipo de prueba;
- entorno;
- método de validación;
- documentación consultada.

### PEM-05 — Marco de Evaluación

Este protocolo referencia el conjunto permanente de criterios utilizados por MVGN.

No es necesario repetir la explicación completa en cada artículo.

Los criterios oficiales son:

| # | Criterio | Descripción breve |
|---|----------|-------------------|
| 1 | **Seguridad** | Protección de datos, cifrado, modelo de amenazas |
| 2 | **Transparencia** | Código abierto, políticas de privacidad, auditorías |
| 3 | **Documentación** | Calidad y completitud de la documentación oficial |
| 4 | **Implementación** | Facilidad de instalación, configuración y uso |
| 5 | **Mantenibilidad** | Frecuencia de actualizaciones, gestión de issues |
| 6 | **Interoperabilidad** | Integración con otros sistemas y estándares |
| 7 | **Portabilidad** | Disponibilidad en múltiples plataformas |
| 8 | **Escalabilidad** | Comportamiento bajo carga creciente |
| 9 | **Coste operativo** | Coste total de operación (tiempo, dinero, recursos) |
| 10 | **Control de datos** | Propiedad de los datos, portabilidad, exportación |
| 11 | **Madurez** | Estabilidad del proyecto, adopción, comunidad |
| 12 | **Continuidad** | Sostenibilidad del proyecto a largo plazo |

Cada artículo únicamente indicará que fue evaluado bajo este marco.

### PEM-06 — Observaciones

Registro cronológico de hechos observados.

Formato:

```
OBS-001 — <título breve>
<descripción del hecho observado>
```

Las observaciones **describen**.

No interpretan.

### PEM-07 — Evaluación (Cuerpo editorial)

Es el cuerpo editorial del artículo.

Debe mantener una narrativa continua.

No debe sentirse como una lista.

Su estructura sugerida:

1. **Problema** — ¿Qué necesidad o problema aborda la herramienta?
2. **Funcionamiento** — ¿Cómo funciona? (sin tecnicismos innecesarios)
3. **Implementación** — ¿Cómo se pone en marcha?
4. **Experiencia de uso** — ¿Cómo se siente usarla en el día a día?
5. **Fortalezas** — ¿Qué hace bien?
6. **Limitaciones** — ¿Qué no hace o hace mal?
7. **Contexto técnico** — ¿Dónde encaja en el ecosistema?

### PEM-08 — Evidencias

Inventario de evidencia utilizada.

Puede incluir:

- capturas de pantalla;
- logs;
- configuraciones;
- benchmarks;
- documentación oficial;
- exportaciones;
- migraciones.

Cada evidencia debe estar asociada con una observación o una afirmación concreta.

Formato sugerido:

```
| # | Tipo | Descripción | Asociada a |
|---|------|-------------|------------|
| EV-001 | Captura | Pantalla de configuración inicial | OBS-003 |
```

### PEM-09 — Riesgos Conocidos

Describe riesgos objetivos. No defectos menores.

Ejemplos:

- dependencia de terceros;
- limitaciones arquitectónicas;
- escenarios donde la herramienta deja de ser adecuada;
- riesgos operativos.

### PEM-10 — Veredicto Técnico

Debe responder:

| Pregunta | Descripción |
|----------|-------------|
| Para quién **sí** | Perfil de usuario que se beneficia |
| Para quién **no** | Perfil de usuario que debería buscar otra opción |
| Qué problema resuelve mejor | Su caso de uso óptimo |
| Coste operativo | Tiempo, dinero, recursos requeridos |
| Límites críticos | Escenarios donde no es adecuada |
| Conclusión técnica | Resumen técnico, sin recomendación comercial |

No debe contener recomendaciones comerciales.

### PEM-11 — Cierre Editorial

Bloque final.

Debe indicar:

- contexto de evaluación;
- método de validación;
- naturaleza editorial del documento;
- fecha de publicación;
- fecha sugerida de revisión futura.

---

## Presentación Editorial

Los PEM son un estándar interno.

No son el protagonista del artículo.

La implementación visual debe respetar los siguientes principios:

- El artículo debe leerse de forma natural.
- Las fichas técnicas deben funcionar como apoyo, no como interrupción.
- La información repetitiva debe poder presentarse de forma compacta o colapsable.
- El lector siempre debe percibir primero la narrativa y después la estructura técnica.
- El estándar regula la información, no impone una maquetación única.

---

## Modelo de Datos Recomendado

Toda evaluación debería almacenarse como una entidad estructurada independiente de su representación visual.

```
Evaluation
├── expediente         # EXP-AAAA-NNNNN
├── metadata           # autor, revision, version, fecha
├── alcance            # cubre / no cubre
├── metodologia        # principios, tipo de prueba, entorno
├── observaciones[]    # OBS-XXX → descripción cronológica
├── evaluacion         # cuerpo editorial narrativo (MDX body)
├── evidencias[]       # EV-XXX → tipo, descripción, asociación OBS
├── riesgos[]          # riesgos objetivos documentados
├── veredicto          # para quién sí/no, problema, coste, límites, conclusión
├── cierre             # contexto, validación, naturaleza editorial
└── revision           # fecha de revisión futura sugerida
```

Este modelo permite reutilizar el contenido para web, PDF, exportaciones, APIs o futuras interfaces sin modificar la información original.

---

## Proceso de Evolución del Estándar

El estándar se considera un **documento vivo**.

### Fase RC (actual)

- Aplicar en un conjunto reducido de evaluaciones reales (5–10 artículos).
- Validar que todos los PEM funcionan en la práctica.
- Detectar redundancias, carencias y oportunidades de mejora.

### Fase v1.0 Estable

- Completar el ciclo de 5–10 artículos.
- Realizar revisión metodológica.
- Identificar redundancias, carencias y oportunidades de mejora.
- Publicar como v1.0 Estable.

---

## Integración con MVGN DIGITAL HUB

| Artefacto | Propósito |
|-----------|-----------|
| `docs/08_editorial_standard.md` | Este documento — estándar normativo |
| `src/content.config.ts` | Schema Zod con campos del modelo Evaluation |
| `src/pages/laboratorio/[slug].astro` | Layout con secciones PEM renderizadas |
| `docs/01_prd.md` / Fase 5 | Requerimientos funcionales del estándar |
| `docs/03_tasks.md` / R-101+ | Tareas de implementación |

---

## Historial

| Fecha | Cambio |
|-------|--------|
| 2026-07-13 | Creación inicial — Estándar v1.0-rc desde directiva ATHENEA/ATHN1 |
