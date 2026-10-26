/* Des lignes qui se resserrent en un point, le point devient un pixel orange, puis le titre apparaît net
   (flou qui disparaît) sur une grille. Trois étapes, onStage(n) pour déclencher un son.
   Éléments : .k-lines > i (plusieurs), .k-pdot, .k-pgrid, .k-ptitle dans une section épinglée. */
import {onFrame,progress,near,ease,easeIO,clamp,lerp,reducedMotion} from '../core/scroll.js';
export function linesToPixel(section,{lines,dot,title,grid,onStage=()=>{}}){
  if(reducedMotion()) return ()=>{};
  let last=0;
  return onFrame(()=>{
    if(!near(section)) return;
    const p=progress(section), a=clamp(p/.45), b=clamp((p-.4)/.3), c=clamp((p-.55)/.4);
    const base=Math.min(innerWidth*.8,900);
    lines.forEach((l,i)=>{
      l.style.width=Math.max(base*(1-i*.15)*(1-easeIO(a)),0)+'px';
      l.style.opacity=1-a*.6;
      l.style.transform=`translateY(${a*(innerHeight*.33-i*36)}px)`;
    });
    dot.style.opacity=(a>.95&&b<1)?1:0;
    dot.style.transform=`scale(${1+b*3}) rotate(${b*90}deg)`;
    title.style.opacity=c; title.style.transform=`scale(${lerp(.6,1,ease(c))})`; title.style.filter=`blur(${(1-c)*14}px)`;
    grid.style.opacity=c*.9;
    const stage=c>.5?2:a>.95?1:0; if(stage!==last){ if(stage>last) onStage(stage); last=stage; }
  });
}
