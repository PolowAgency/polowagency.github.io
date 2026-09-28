// Les 4 offres. Le slug sert aux URL /services/[slug] et au lien depuis les réalisations.
export const services = [
  { slug: 'site-vitrine', name: 'Site vitrine' },
  { slug: 'landing-page', name: 'Landing page' },
  { slug: 'outils-metier', name: 'Outils métier & web-apps' },
  { slug: 'automatisation-ia', name: 'Automatisation IA' },
] as const;

export type ServiceSlug = (typeof services)[number]['slug'];
export const serviceSlugs = services.map((s) => s.slug) as [ServiceSlug, ...ServiceSlug[]];
export const serviceName = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!.name;
