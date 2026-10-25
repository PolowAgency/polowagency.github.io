/* Bouton magnétique à ressort : il suit légèrement le pointeur, s'étire vers lui, s'écrase au clic et rebondit au relâchement.
   Utilise les propriétés CSS translate et scale (elles se combinent avec transform, sans conflit).
   springButtons(document.querySelectorAll('.btn'), {pull:6}) */
import {reducedMotion} from '../core/scroll.js';
import {spring} from '../core/spring.js';
export function springButtons(els,{pull=6,k=420,c=14}={}){
  if(reducedMotion()||!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  els.forEach(el=>{
    const S={x:{v:0,vel:0},y:{v:0,vel:0},sx:{v:1,vel:0},sy:{v:1,vel:0}}, T={x:0,y:0,sx:1,sy:1};
    let run=false,last=0,inside=false;
    const frame=t=>{
      const dt=(t-last)/1000||.016; last=t;
      for(const n of ['x','y','sx','sy']) spring(S[n],T[n],dt,k,c);
      el.style.translate=`${S.x.v.toFixed(2)}px ${S.y.v.toFixed(2)}px`;
      el.style.scale=`${S.sx.v.toFixed(4)} ${S.sy.v.toFixed(4)}`;
      const still=['x','y','sx','sy'].every(n=>Math.abs(S[n].v-T[n])+Math.abs(S[n].vel)<.004);
      if(still&&!inside){ run=false; el.style.translate=''; el.style.scale=''; } else requestAnimationFrame(frame);
    };
    const go=()=>{ if(!run){ run=true; last=performance.now(); requestAnimationFrame(frame); } };
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect(), nx=(e.clientX-r.left-r.width/2)/(r.width/2), ny=(e.clientY-r.top-r.height/2)/(r.height/2);
      inside=true; T.x=nx*pull; T.y=ny*pull*.6; T.sx=1.03+Math.abs(nx)*.025; T.sy=1.03-Math.abs(nx)*.015+Math.abs(ny)*.02; go();
    });
    el.addEventListener('pointerleave',()=>{ inside=false; T.x=T.y=0; T.sx=T.sy=1; go(); });
    el.addEventListener('pointerdown',()=>{ T.sx=1.08; T.sy=.9; S.sy.vel-=1.4; go(); });
    addEventListener('pointerup',()=>{ if(!inside&&!run) return; T.sx=T.sy=inside?1.03:1; S.sx.vel-=1.1; S.sy.vel+=2; go(); });
  });
}
