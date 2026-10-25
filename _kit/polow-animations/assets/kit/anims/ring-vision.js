/* Un cercle orange traverse l'écran puis grossit jusqu'à tout remplir, pendant que les mots du titre s'allument.
   Éléments : .k-ring (cercle) + titre dont chaque mot est un <span> (voir word-reveal.js). accent = "r,g,b". */
import {onFrame,progress,near,ease,easeIO,clamp,lerp,reducedMotion} from '../core/scroll.js';
export function ringVision(section,{ring,words,accent='255,106,26',wordSpan=.75}){
  if(reducedMotion()){ words.forEach(w=>w.classList.add('on')); return ()=>{}; }
  return onFrame(()=>{
    if(!near(section)) return;
    section.classList.add('armed');
    const p=progress(section), a=ease(clamp(p/.5)), b=clamp((p-.5)/.5);
    ring.style.transform=`translate(${lerp(-38,0,a)}vw,${Math.sin(p*Math.PI)*-6}vh) scale(${lerp(1,1.6,a)+easeIO(b)*5})`;
    ring.style.opacity=1-b*.85;
    ring.style.background=`rgba(${accent},${b*.12})`;
    const n=Math.floor(clamp(p/wordSpan)*words.length+.001);
    words.forEach((w,i)=>w.classList.toggle('on',i<n));
  });
}
