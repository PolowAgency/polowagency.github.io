/* Le scroll vertical fait défiler une rangée de cartes horizontalement (section épinglée).
   <section class="k-sticky-sec" style="height:320vh"><div class="k-sticky"><div class="k-htrack">…cartes…</div></div></section> */
import {onFrame,progress,near,easeIO,reducedMotion} from '../core/scroll.js';
export function horizontalScroll(section,track){
  if(reducedMotion()) return ()=>{};
  let max=0; const measure=()=>{ max=Math.max(track.scrollWidth-innerWidth,0); };
  measure(); addEventListener('resize',measure); addEventListener('load',measure);
  const off=onFrame(()=>{ if(near(section)) track.style.transform=`translateY(-50%) translateX(${-max*easeIO(progress(section))}px)`; });
  return ()=>{ off(); removeEventListener('resize',measure); removeEventListener('load',measure); };
}
