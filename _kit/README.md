# _kit : bibliothèque d'animations POLOW

Le dossier commence par `_` : GitHub Pages (Jekyll) ne le publie pas. Ne pas ajouter de fichier `.nojekyll` à la racine, sinon il deviendrait public.

- `polow-animations/` : le kit, au format **skill** (`SKILL.md` + `references/` + `assets/kit/`).
- Aperçu : `python3 -m http.server` à la racine du repo, puis ouvrir `/_kit/polow-animations/assets/kit/demo/index.html`.
- Pour l'utiliser dans une conversation Claude : zipper le dossier `polow-animations/` et l'ajouter comme skill, ou le copier dans le projet.

Contenu : 29 animations (voir `polow-animations/references/catalogue.md`), dont 10 ajoutées à partir de l'étude de letmy.fr (`references/letmy.md`). Les sections « mixte » du site (ouverture à volets, boutons, titres, zoom final) utilisent des copies de ces modules dans `assets/js/mix/`.
