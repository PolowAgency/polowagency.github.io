/* Une carte (vidéo, capture…) qui grandit pendant qu'on défile, dans une section épinglée.
   <section class="k-sticky-sec" style="height:230vh"><div class="k-sticky"><div class="k-scale-card" id="c">…</div></div></section>
   scaleCard(section, card, {from:.78, to:1}) */
import {onFrame,progress,near,ease,clamp,lerp,reducedMotion} from '../core/scroll.js';
export function scaleCard(section,card,{from=.78,to=1,rise=80,radiusFrom=48,radiusTo=24,speed=2.2}={}){
  if(reducedMotion()) return ()=>{};
  return onFrame(()=>{
    if(!near(section)) return;
    const e=ease(clamp(progress(section)*speed));
    card.style.transform=`scale(${lerp(from,to,e)}) translateY(${lerp(rise,0,e)}px)`;
    card.style.borderRadius=lerp(radiusFrom,radiusTo,e)+'px';
  });
}
