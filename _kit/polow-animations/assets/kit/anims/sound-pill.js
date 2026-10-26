/* Pastille « Son activé / coupé » (barres d'égaliseur animées) + moteur Web Audio sans fichier audio.
   Le premier clic du visiteur active le son (les navigateurs bloquent l'audio avant), sauf s'il l'a coupé lui-même.
   Sons disponibles : snd.tick(), blip(), pop(), whoosh(durée), chime(). Choix mémorisé (localStorage). */
import {snd,toggleSound,onSoundChange,armFirstGesture} from '../core/sound.js';
export {snd};
export function soundPill(btn,{label=btn.querySelector('[data-label]'),text={on:'Son activé',off:'Son coupé'}}={}){
  onSoundChange(v=>{ btn.classList.toggle('on',v); if(label) label.textContent=v?text.on:text.off; });
  btn.addEventListener('click',toggleSound);
  armFirstGesture('#'+btn.id);
}
