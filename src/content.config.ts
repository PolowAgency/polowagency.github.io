import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { serviceSlugs } from './data/services';

// Une réalisation = un fichier .mdx dans src/content/realisations/.
// Le nom du fichier devient le slug : kmm-trade-hub.mdx -> /realisations/kmm-trade-hub
// Tout texte commençant par "[À COMPLÉTER" est affiché comme un placeholder visible.
const realisations = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/realisations' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(), // ordre d'affichage (1 = en premier)
      featured: z.boolean().default(false), // mise en avant sur la home
      typeLabel: z.string(), // ex. "Plateforme web / SaaS + landing page"
      services: z.array(z.enum(serviceSlugs)).min(1), // sert au filtre et aux liens vers /services
      client: z.string(),
      location: z.string().optional(),
      url: z.string().url().optional(),
      summary: z.string(), // 1 à 2 phrases, reprises sur les cartes et en meta description
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z
        .array(z.object({ src: image().optional(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      stack: z.array(z.string()).default([]),
      results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      testimonial: z
        .object({ quote: z.string(), author: z.string(), role: z.string().optional() })
        .optional(),
    }),
});

export const collections = { realisations };
