# Animations de letmy.fr : fiche technique

Relevé du 25/10/2026 (site : « Ton entreprise mérite d'être trouvée », créateur de sites pour artisans). Aucune ligne de code ni visuel n'est copié : ce sont des **techniques**, réécrites dans le kit quand c'était réalisable sans WebGL.
Pile du site : JavaScript natif en modules, Lenis (défilement lissé), three.js pour les scènes 3D, Web Audio, vidéos MP4 courtes. Palette claire (gris clair #E9EAED, noir, accents argent) : seule la mécanique est reprise, pas la DA.

| Animation du site | Technique | Dans le kit ? |
|---|---|---|
| Ouverture « allumage » | deux volets plein écran + marque + trait lumineux, puis les volets s'ouvrent ; ensuite le cookie s'affiche | oui : `intro-shutters.js` |
| Titres lettre par lettre | texte découpé mot par mot (boîte insécable) puis lettre par lettre, `--l` = rang, déclenché par IntersectionObserver ; `aria-label` garde le texte | oui : `letter-reveal.js` |
| Texte d'intro mot à mot | même découpe mais un seul fondu par mot (`--m`) | voir `word-reveal.js` |
| Boutons : lettres qui roulent | chaque lettre dupliquée (`::after`), translate -100 % au survol avec décalage `--k` | oui : `letter-roll.js` |
| Boutons : ressort magnétique | position et échelle suivent le pointeur par un ressort amorti (raideur ≈ 420, amortissement ≈ 14), écrasement au clic puis rebond, lumière conique qui tourne selon l'angle du pointeur | oui : `spring-button.js` (sans la lumière conique) |
| Compteurs | chiffre qui monte avec décélération `1-(1-t)^4` à l'entrée dans l'écran | oui : `count-up.js` |
| En-tête 3 états | « libre » (suit le haut), « capsule » (réapparaît au scroll vers le haut), « rangée » (cachée vers le bas) ; transitions sans animation lors du changement de mode | partiel : `smart-header.js` (2 états) |
| Carte photo qui change de métier | 5 photos qui se fondent toutes les 4,8 s, mot du badge qui change en même temps (décodage d'image anticipé) | oui pour le mot : `word-swap.js` |
| Piliers (3 fenêtres) | section épinglée, 3 étapes, texte tapé dans de fausses fenêtres (recherche, carte, appel), barre de progression, sons | oui : `scroll-stages.js` (étapes, index), `typewriter.js` |
| Bandeau « Être trouvé / Être choisi / Être appelé » | animation Web Animations en boucle dont la vitesse suit le scroll | oui : `velocity-marquee.js` |
| Mots qui s'allument (« mots ») | grille de mots allumés par la progression, nuage de mots flottants autour (graine pseudo-aléatoire, zones à éviter) | oui : `word-cloud.js` |
| Chapitres | section épinglée : vidéos qui se relaient, texte tapé, index à barres, bords arrondis qui s'ouvrent | oui : `scroll-stages.js` + `video.js` |
| Mains (humaine / robot) | deux visuels qui coulissent l'un vers l'autre avec un ressort piloté par le scroll, halo dessiné en canvas | non (visuels spécifiques) ; le ressort : `core/spring.js` |
| Final « TON SITE » | mot géant en masque sur une vidéo, zoom jusqu'au plein écran dans la lettre I, fond qui s'assombrit, texte final | oui : `mask-zoom.js` |
| Fondus entre sections | dégradés générés en canvas (bruit léger anti-bandes) | non : un `linear-gradient` + `mask-image` suffit |
| Pied de page | foule de points, nom en points, bannière cookies animée | non |
| Tête 3D cathodique qui suit le regard | scène three.js, tête qui tourne vers le pointeur | non (WebGL) |
| Tourbillon de sites | cartes en cylindre 3D (three.js) qui se rangent en grille au scroll | non (WebGL) |
| Gomme | shader qui efface un mot au pointeur | non (WebGL) |
| ADN en canvas | hélice dessinée en 2D, vitesse liée au scroll | non |
| Son d'interface | Web Audio (glisse, goutte, appui, teinte) | `core/sound.js` couvre tick, blip, pop, whoosh, chime |
| Défilement lissé | Lenis, `lerp` ≈ 0,09 | non : le défilement natif est conservé (accessibilité, ancres) |

## Pour aller plus loin
Pour les animations WebGL (tête, tourbillon, gomme), il faut three.js : à ajouter au kit dans un sous-dossier `webgl/` quand un projet le justifie, avec chargement différé (`import()`) pour ne pas peser sur le premier affichage.
