/* Section épinglée découpée en N étapes pilotées par le scroll : le visuel, le texte et l'index de l'étape en cours
   passent en « actif », les précédents en « passé ». --p (0 à 1) avance dans l'étape en cours sur chaque élément d'index.
   scrollStages(section, {stages:[…éléments], index:[…éléments], onStage:(i)=>{}})   Classes : k-active, k-past. */
import {onFrame,progress,near,clamp,reducedMotion} from '../core/scroll.js';
export function scrollStages(section,{stages,index=[],onStage=()=>{}}){
  const n=stages.length; let cur=-1;
  if(reducedMotion()){ stages.forEach(s=>s.classList.add('k-active')); return ()=>{}; }
  return onFrame(()=>{
    if(!near(section)) return;
    const p=clamp(progress(section)), i=Math.min(n-1,Math.floor(p*n*1.0001)), f=p*n-i;
    index.forEach((el,k)=>el.style.setProperty('--p',k<i?1:k===i?f.toFixed(3):0));
    if(i===cur) return; cur=i;
    stages.forEach((s,k)=>{ s.classList.toggle('k-active',k===i); s.classList.toggle('k-past',k<i); });
    index.forEach((el,k)=>el.classList.toggle('k-here',k===i));
    onStage(i);
  });
}
