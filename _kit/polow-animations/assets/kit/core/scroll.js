/* Noyau : maths d'animation, progression de scroll et boucle requestAnimationFrame partagée. */
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const ease=t=>1-Math.pow(1-t,3);
export const easeIO=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
export const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Progression 0 à 1 d'une section « sticky » (hauteur de la section moins un écran). */
export function progress(el){
  const r=el.getBoundingClientRect();
  return clamp(-r.top/Math.max(r.height-innerHeight,1));
}
/* Vrai si la section est proche de l'écran : on ne calcule que ce qui se voit. */
export const near=(el,margin=200)=>{ const r=el.getBoundingClientRect(); return r.bottom>-margin&&r.top<innerHeight+margin; };

const subs=new Set(); let raf=0;
function tick(t){ subs.forEach(fn=>fn(t)); raf=subs.size?requestAnimationFrame(tick):0; }
/* Abonne fn à l'unique boucle rAF. Renvoie la fonction de désabonnement. */
export function onFrame(fn){ subs.add(fn); if(!raf) raf=requestAnimationFrame(tick); return ()=>subs.delete(fn); }

/* Position lissée de la souris, partagée par les animations à parallaxe. */
export const mouse={x:innerWidth/2,y:innerHeight/2,nx:0,ny:0};
addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});
let mouseOn=false;
export function trackMouse(smooth=.06){
  if(mouseOn) return; mouseOn=true;
  onFrame(()=>{ mouse.nx=lerp(mouse.nx,mouse.x/innerWidth-.5,smooth); mouse.ny=lerp(mouse.ny,mouse.y/innerHeight-.5,smooth); });
}
