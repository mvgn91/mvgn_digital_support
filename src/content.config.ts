import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const laboratorio = defineCollection({
  loader: glob({ base: './src/content/laboratorio', pattern: '**/[^_]*.mdx' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    icon: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

const apps = defineCollection({
  loader: glob({ base: './src/content/apps', pattern: '**/[^_]*.mdx' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { laboratorio, apps };
