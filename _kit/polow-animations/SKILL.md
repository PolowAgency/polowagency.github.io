---
name: polow-animations
description: Bibliothèque d'animations web réutilisables de POLOW Agency (Paul Piot) : hero à faisceaux, texte tapé, carte qui grandit au scroll, lignes vers pixel, cercle et mots qui s'allument, manifeste mot par mot, liste qui défile, cartes volantes à parallaxe, défilement horizontal, halo souris, curseur, menu plein écran en cercle, en-tête intelligent, FAQ, icônes tracées, vidéo, sons Web Audio, mouvement réduit. À utiliser dès que Paul demande d'ajouter une animation, un effet au scroll, une section animée, de reprendre l'effet d'un autre site, ou de refaire le style d'un site dans la DA POLOW, même s'il ne cite pas la liste.
---

# POLOW animations

Kit d'animations extraites du site polowagency.fr, prêtes à copier dans un autre projet (HTML, CSS et JavaScript natifs, sans build).

## Utilisation
1. Lis `references/catalogue.md` : une ligne par animation, ses options, ses pièges.
2. Copie `assets/kit/` dans le projet (au minimum `core/` + les modules voulus + `css/kit.css`).
3. Branche : `import {…} from './anims/<nom>.js'` puis appelle la fonction avec les éléments. L'exemple de chaque animation est dans `assets/kit/demo/index.html`.
4. Adapte les couleurs en redéfinissant `--k-accent`, `--k-accent-rgb`, `--k-bg`, `--k-fg` (le kit est orange sur noir par défaut).
5. Vérifie : aucune erreur console, 375 px et 1280 px, `prefers-reduced-motion`, Lighthouse accessibilité.

## Règles POLOW à respecter
- Fond `#0a0a0a`, orange `#ff6a1a` en accent unique, Poppins, formes très arrondies.
- Pas de code affiché à l'écran, pas de tiret cadratin, « réalisation » (jamais « étude de cas »).
- Tout le contenu reste lisible sans JavaScript et en mouvement réduit.
- Une seule boucle `requestAnimationFrame` (`onFrame`), jamais un `setInterval` par effet.

## Enrichir le kit
Quand Paul montre un site dont il aime les animations, ajoute-les au kit (voir « Ajouter une animation » dans le catalogue), sans copier le code ni les visuels du site source : reproduis l'effet avec ton propre code. Animations de letmy.fr : à relever dès que le site est consultable (réseau bloqué lors de la première session).
