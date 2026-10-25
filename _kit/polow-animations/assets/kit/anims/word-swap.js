/* Mot qui change dans une phrase fixe : l'ancien mot monte en se floutant, le nouveau arrive du dessous.
   <span class="k-swap">Un site pour <b id="w">un salon</b></span>
   wordSwap($('#w'), ['un salon','un restaurant','un artisan'], {interval:2600}) */
import {reducedMotion} from '../core/scroll.js';
export function wordSwap(el,words,{interval=2600,onSwap=()=>{}}={}){
  if(reducedMotion()||words.length<2) return ()=>{};
  el.classList.add('k-swap-w'); let i=0, visible=true;
  new IntersectionObserver(e=>{ visible=e[0].isIntersecting; }).observe(el);
  const id=setInterval(()=>{
    if(!visible||document.hidden) return;
    el.classList.add('k-out');
    setTimeout(()=>{
      i=(i+1)%words.length; el.textContent=words[i]; onSwap(words[i],i);
      el.classList.remove('k-out'); el.classList.add('k-in-pre');
      requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.remove('k-in-pre')));
    },420);
  },interval);
  return ()=>clearInterval(id);
}
