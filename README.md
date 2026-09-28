# POLOW Agency · polowagency.fr

Site construit avec [Astro](https://astro.build) (sortie 100 % statique).

## Commandes

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert dist/ en local
```

## Ajouter une réalisation

1. Créer `src/content/realisations/mon-projet.mdx` (le nom du fichier devient l'URL `/realisations/mon-projet`).
2. Copier le frontmatter d'une réalisation existante et l'adapter.
3. Déposer les captures dans `src/assets/realisations/` et les référencer en chemin relatif.

Tout texte commençant par `[À COMPLÉTER` est affiché comme un placeholder visible sur le site.

## Structure

- `src/pages/` : les pages (une URL par fichier)
- `src/layouts/Base.astro` : squelette commun (SEO, nav, footer)
- `src/components/` : composants réutilisables
- `src/content/realisations/` : les réalisations en MDX
- `src/data/` : infos de l'agence et liste des services
- `public/` : fichiers servis tels quels (favicons, robots.txt, CNAME)
