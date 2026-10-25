# Catalogue des animations POLOW

Chaque animation = **un module JS** (`assets/kit/anims/`) + **une section de `kit.css`** (classes préfixées `k-`).
Toutes se coupent seules en mouvement réduit. Voir `assets/kit/demo/index.html` pour un exemple de chaque.

| # | Animation | Fichier | Effet | Options principales |
|---|---|---|---|---|
| 1 | Hero lumineux | CSS `.k-beams` `.k-dots` `.k-fade-up` | faisceaux orange flous qui bougent, grille de points, apparition en montée | variables `--k-accent`, `--k-accent-rgb` |
| 2 | Texte tapé | `typewriter.js` | lettre par lettre, effacé, mot suivant, curseur clignotant | `start hold typeMin typeJitter erase gap onChar` |
| 3 | Carte qui grandit | `scale-card.js` | une vidéo ou capture passe de 78 % à 100 % au scroll, coins qui s'adoucissent | `from to rise radiusFrom radiusTo speed` |
| 4 | Lignes vers pixel | `lines-to-pixel.js` | lignes qui se resserrent, point orange qui tourne, titre net (flou qui disparaît) sur grille | `lines dot title grid onStage` |
| 5 | Vision (cercle) | `ring-vision.js` | un cercle traverse l'écran puis grossit ; les mots du titre s'allument | `ring words accent wordSpan` |
| 6 | Mots qui s'allument | `word-reveal.js` | un texte long se révèle mot par mot ; `*mots*` colorés | `splitWords(el)` puis `wordReveal(section, words, {span})` |
| 7 | Liste qui défile | `roll-list.js` | « On construit avec [KMM → REZOO → vous ?] » | `every step onStep` |
| 8 | Cartes volantes | `flying-cards.js` | cartes qui arrivent en tournant, se posent autour d'un titre, parallaxe souris | `data-x data-y data-r data-d` sur chaque carte |
| 9 | Défilement horizontal | `horizontal-scroll.js` | le scroll vertical fait glisser une rangée de cartes | `section`, `track` |
| 10 | Halo souris | `spotlight.js` + `.k-spot` | un halo orange suit le pointeur dans la carte | liste de cartes |
| 11 | Curseur | `cursor.js` + `.k-cursor` | point avec inertie qui grossit au survol, masqué sur tactile | `hover onEnter onClick` |
| 12 | Menu plein écran | `menu-reveal.js` + `.k-menu` | s'ouvre en cercle depuis le burger, liens qui montent, Échap | `labels onToggle` |
| 13 | En-tête intelligent | `smart-header.js` | fond flou après 40 px, se masque en descendant | `solidAfter hideAfter` |
| 14 | Révélation | `reveal.js` + `.k-rv` | montée + fondu à l'entrée dans l'écran | `selector threshold` |
| 15 | FAQ accordéon | `faq.js` + `.k-q` | un volet à la fois, `aria-expanded` géré | racine |
| 16 | Icônes tracées | CSS `.k-draw` | `stroke-dashoffset` : le dessin se trace, ondes qui pulsent | `--l` = longueur du tracé |
| 17 | Vidéo | `video.js` | lecture quand visible, contrôles perso, carte de secours si fichier absent | `playWhenVisible videoControls` |
| 18 | Sons + pastille | `sound-pill.js`, `core/sound.js` | tick, blip, pop, whoosh, chime (Web Audio, aucun fichier) ; premier clic active le son | `text`, état mémorisé |
| 19 | Mouvement réduit | CSS `html.k-rm` | tout le contenu lisible, sans animation de scroll | classe `k-rm` |

## Noyau (`core/scroll.js`)
`clamp lerp ease easeIO progress(section) near(section) onFrame(fn) mouse trackMouse reducedMotion`.
**Une seule boucle `requestAnimationFrame`** pour tout le site ; `near()` évite de calculer ce qui est hors écran.

## Recette : section épinglée
```html
<section class="k-sticky-sec" style="height:260vh">   <!-- hauteur = durée de l'animation -->
  <div class="k-sticky"> …contenu animé… </div>        <!-- reste collé à l'écran -->
</section>
```

## Pièges connus (appris sur le site POLOW)
- Le grisé des mots ne s'active qu'avec `.armed` sur la section (posé par le JS), sinon le texte reste lisible sans JS et les audits de contraste passent.
- Mouvement réduit **et** sans JavaScript : mettre `<html class="k-rm">` par défaut et le retirer par un script inline si `prefers-reduced-motion` n'est pas actif.
- Le curseur « typé » : `⁠` colle le curseur au dernier mot.
- Variables CSS `--img: url()` : le chemin se résout depuis la feuille de style. Utiliser des chemins absolus (`/img/x.jpg`).
- Ne pas nommer une classe `cur` pour autre chose que le curseur (collision déjà vécue avec un symbole €).
- Les ancres de menu : `scroll-margin-top` sur la section visée, sinon le titre arrive collé en haut.
- Les sections épinglées ont une hauteur en `vh` : les mesurer en `svh` sur mobile si la barre d'adresse bouge.
- Une vidéo `.mp4` doit être en H.264 pour lire partout ; le navigateur de test sans écran ne lit pas le H.264.

## Ajouter une animation au kit
1. `assets/kit/anims/<nom>.js` : une fonction exportée, `onFrame` pour l'animation, `reducedMotion()` pour couper, renvoie la fonction d'arrêt.
2. Une section dans `kit.css`, classes `k-<nom>`, et sa version `html.k-rm`.
3. Un exemple dans `demo/index.html`.
4. Une ligne dans le tableau ci-dessus.
5. Tester : console sans erreur, 375 px et 1280 px, mouvement réduit.
