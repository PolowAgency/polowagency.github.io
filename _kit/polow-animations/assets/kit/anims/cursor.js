/* Curseur personnalisé : un point qui suit la souris avec inertie et grossit au survol. Masqué sur tactile (CSS).
   <div class="k-cursor" id="cur" aria-hidden="true"></div> */
import {onFrame,mouse,lerp,reducedMotion} from '../core/scroll.js';
export function customCursor(el,{hover='a,button,[data-hover]',onEnter=()=>{},onClick=()=>{}}={}){
  if(reducedMotion()){ el.style.display='none'; return ()=>{}; }
  let x=mouse.x,y=mouse.y;
  document.querySelectorAll(hover).forEach(n=>{
    n.addEventListener('mouseenter',()=>{ onEnter(n); el.classList.add('k-big'); });
    n.addEventListener('mouseleave',()=>el.classList.remove('k-big'));
    n.addEventListener('click',()=>onClick(n));
  });
  return onFrame(()=>{ x=lerp(x,mouse.x,.2); y=lerp(y,mouse.y,.2); el.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`; });
}
