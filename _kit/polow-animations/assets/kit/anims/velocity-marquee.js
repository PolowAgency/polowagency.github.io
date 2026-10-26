/* Bandeau qui défile en boucle (Web Animations) et accélère avec la vitesse du scroll. Se met en pause hors écran.
   <div class="k-vm"><div class="k-vm-track"><span>Être trouvé</span>…(contenu dupliqué une fois)…</div></div>
   velocityMarquee(track, {base:38})   base = vitesse de croisière en px/s */
import {onFrame,reducedMotion} from '../core/scroll.js';
export function velocityMarquee(track,{base=38,boost=.45,max=8}={}){
  if(reducedMotion()||!track.animate) return ()=>{};
  const a=track.animate([{transform:'translate3d(0,0,0)'},{transform:'translate3d(-50%,0,0)'}],{duration:6e4,iterations:Infinity});
  a.pause();
  const fit=()=>a.effect.updateTiming({duration:Math.max(4e3,track.scrollWidth/2/base*1e3)});
  fit(); addEventListener('resize',fit); document.fonts?.ready.then(fit);
  let vis=false, vel=0, last=scrollY, rate=1;
  new IntersectionObserver(e=>{ vis=e[0].isIntersecting; vis?a.play():a.pause(); },{rootMargin:'120px'}).observe(track);
  return onFrame(()=>{
    if(!vis) return;
    const d=scrollY-last; last=scrollY; vel+=(d*60-vel)*.1;
    const r=Math.round(Math.min(max,1+Math.abs(vel)*boost/base)*4)/4;
    if(r!==rate){ rate=r; a.updatePlaybackRate(r); }
  });
}
