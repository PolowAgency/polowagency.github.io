/* Une liste de mots qui défile verticalement (« On construit avec [KMM | REZOO | vous ?] »).
   <span class="k-roll"><ul><li>KMM</li><li>REZOO</li></ul></span> */
import {reducedMotion} from '../core/scroll.js';
export function rollList(ul,{every=1800,step=1.15,onStep=()=>{}}={}){
  if(reducedMotion()) return ()=>{};
  const n=ul.children.length; let i=0;
  const id=setInterval(()=>{ i=(i+1)%n; ul.style.transform=`translateY(${-i*step}em)`; onStep(i,n); },every);
  return ()=>clearInterval(id);
}
