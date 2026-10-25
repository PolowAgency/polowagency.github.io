/* Animations « mixte » : lettres qui défilent et ressort sur les boutons, titres composés lettre par lettre, prix qui montent.
   Tout est désactivé en mouvement réduit (chaque module le vérifie). */
import {letterRoll} from './letter-roll.js';
import {springButtons} from './spring-button.js';
import {letterReveal} from './letter-reveal.js';
import {countUp} from './count-up.js';

export function initMix(){
  const btns=[...document.querySelectorAll('.btn')].filter(b=>b.id!=='send'&&!b.matches('[type=submit]'));
  letterRoll(btns);
  btns.forEach(b=>b.setAttribute('data-spring',''));
  springButtons(btns);
  const heads=[...document.querySelectorAll('.h2.rv, .h2l.rv')];
  heads.forEach(h=>h.classList.remove('rv'));
  letterReveal(heads);
  countUp(document.querySelectorAll('.o-price b'));
}
