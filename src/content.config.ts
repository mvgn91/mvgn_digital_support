import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const laboratorio = defineCollection({
  loader: glob({ base: './src/content/laboratorio', pattern: '**/[^_]*.mdx' }),
  schema: z.object({
    // ── Existing fields ──
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    icon: z.string().optional(),
    featured: z.boolean().optional().default(false),

    // ── MVGN Evaluation Standard (PEM-01) ──
    expediente: z.string().optional(),          // EXP-AAAA-NNNNN
    versionEstandar: z.string().optional(),     // v1.0-rc
    autor: z.string().optional(),               // Autor de la evaluación
    revision: z.string().optional(),            // Responsable de revisión

    // ── Alcance (PEM-03) ──
    alcanceCubre: z.string().optional(),        // Qué cubre esta evaluación
    alcanceNoCubre: z.string().optional(),      // Qué no cubre

    // ── Contexto de uso (REQ-006) ──
    contextoUso: z.enum([
      'laboratorio',
      'uso cotidiano',
      'homelab',
      'empresa',
      'equipo',
    ]).optional(),

    // ── Veredicto Técnico (PEM-10) ──
    veredictoParaQuienSi: z.string().optional(),
    veredictoParaQuienNo: z.string().optional(),
    veredictoProblema: z.string().optional(),
    veredictoCoste: z.string().optional(),
    veredictoLimites: z.string().optional(),
    veredictoConclusion: z.string().optional(),

    // ── Cierre Editorial (PEM-11) ──
    revisionFutura: z.string().optional(),      // Fecha sugerida de revisión

    // ── Contenido interno de ficha técnica (se renderiza dentro del details PEM-02) ──
    observacionesTexto: z.string().optional(),  // Markdown de observaciones OBS-001...
    evidenciasTexto: z.string().optional(),     // Markdown de tabla de evidencias EV-001...
    riesgosTexto: z.string().optional(),        // Markdown de riesgos conocidos

    // ── Enlaces relacionados ──
    enlaces: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

const apps = defineCollection({
  loader: glob({ base: './src/content/apps', pattern: '**/[^_]*.mdx' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { laboratorio, apps };
