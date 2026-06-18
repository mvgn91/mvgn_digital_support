// ══════════════════════════════════════════════════════════════
// MVGN Labs — Content Collections (Astro v6)
// ══════════════════════════════════════════════════════════════

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const apps = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/apps' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    version: z.string().optional(),
    icon: z.string().optional(),
    tags: z.array(z.string()).optional(),
    steps: z.array(z.object({
      label: z.string(),
    })).optional(),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const collections = { apps };
