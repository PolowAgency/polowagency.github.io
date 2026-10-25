/* Mots qui s'allument un par un pendant le scroll (manifeste, titre de vision).
   <p id="m">Un texte *avec des mots en accent* qui s'allument.</p>   (les * entourent les mots colorés)
   splitWords($('#m')); wordReveal(section, $$('#m span'), {span:.85})
   Le texte reste lisible tant que la section est loin : le grisé n'est activé que par .armed. */
import {onFrame,progress,near,clamp,reducedMotion} from '../core/scroll.js';
export function splitWords(el){
  let accent=false;
  el.innerHTML=el.textContent.split(' ').map(w=>{
    let cls='';
    if(w.startsWith('*')){accent=true;w=w.slice(1)}
    if(accent) cls='k-accent';
    if(w.endsWith('*')){w=w.slice(0,-1);accent=false}
    return `<span class="${cls}">${w}</span>`;
  }).join(' ');
  return [...el.querySelectorAll('span')];
}
export function wordReveal(section,words,{span=.85}={}){
  if(reducedMotion()){ words.forEach(w=>w.classList.add('on')); return ()=>{}; }
  return onFrame(()=>{
    if(!near(section)) return;
    section.classList.add('armed');
    const n=Math.floor(clamp(progress(section)/span)*words.length+.001);
    words.forEach((w,i)=>w.classList.toggle('on',i<n));
  });
}
