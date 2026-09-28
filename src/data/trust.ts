import type { ImageMetadata } from 'astro';

// Logos affichés dans le bandeau de confiance.
// Pour ajouter un logo : déposer le fichier dans src/assets/clients/, l'importer ici et le passer dans `logo`.
// Sans logo, un placeholder [À COMPLÉTER] est affiché.
export const clientLogos: { name: string; logo?: ImageMetadata }[] = [
  { name: 'KMM Trade Hub' },
  { name: "Carré d'Hair" },
  { name: 'Bisou Volé' },
  { name: 'client 4' },
  { name: 'client 5' },
];

// Note Google : renseigner rating (ex. "4,9"), count (ex. "12") et url (lien vers la fiche Google).
export const googleReviews: { rating?: string; count?: string; url?: string } = {
  rating: undefined,
  count: undefined,
  url: undefined,
};
