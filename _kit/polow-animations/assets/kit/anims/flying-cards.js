/* Des cartes arrivent de loin en tournant, se posent autour d'un titre, puis s'effacent. Parallaxe à la souris.
   Chaque .k-fcard porte data-x, data-y (en vw/vh), data-r (rotation en deg) et data-d (profondeur de parallaxe). */
import {onFrame,progress,near,ease,clamp,lerp,mouse,trackMouse,reducedMotion} from '../core/scroll.js';
export function flyingCards(section,{cards,title}){
  if(reducedMotion()) return ()=>{};
  trackMouse();
  const list=cards.map(el=>({el,x:+el.dataset.x,y:+el.dataset.y,r:+el.dataset.r,d:+el.dataset.d}));
  return onFrame(()=>{
    if(!near(section)) return;
    const p=progress(section), e=ease(clamp(p/.6)), out=clamp((p-.8)/.2), mob=innerWidth<820?.75:1;
    list.forEach(c=>{
      const x=lerp(c.x*2.4,c.x*mob,e)+mouse.nx*c.d*-30, y=lerp(c.y*2.6,c.y,e)+mouse.ny*c.d*-30, r=lerp(c.r*3,c.r,e)+mouse.nx*c.d*6;
      c.el.style.transform=`translate(-50%,-50%) translate(${x}vw,${y}vh) rotate(${r}deg) scale(${lerp(1.3,1,e)*(1-out*.2)})`;
      c.el.style.opacity=clamp(e*1.5)*(1-out);
    });
    if(title){ title.style.transform=`scale(${lerp(.7,1,e)})`; title.style.opacity=clamp(e*1.4)*(1-out); }
  });
}
