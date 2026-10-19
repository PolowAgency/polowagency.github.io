/* Progression de scroll et boucle requestAnimationFrame partagée. */
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const ease=t=>1-Math.pow(1-t,3);
export const easeIO=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
export const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Progression 0 à 1 d'une section sticky (hauteur de la section moins un écran). */
export function useScrollProgress(el){
  const r=el.getBoundingClientRect();
  return clamp(-r.top/Math.max(r.height-innerHeight,1));
}

const subs=new Set();
let raf=0;
function tick(t){
  subs.forEach(fn=>fn(t));
  raf=subs.size?requestAnimationFrame(tick):0;
}

/* Abonne fn à l'unique boucle rAF. Renvoie la fonction de désabonnement. */
export function onFrame(fn){
  subs.add(fn);
  if(!raf) raf=requestAnimationFrame(tick);
  return ()=>subs.delete(fn);
}
