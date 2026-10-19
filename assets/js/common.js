import {lerp,reducedMotion,onFrame} from './scroll.js';
import {snd,toggleSound,onSoundChange,armFirstGesture} from './sound.js';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
export {$,$$};
export const RM=reducedMotion();
if(RM) document.documentElement.classList.add('rm');

export function initCommon(){
  /* ---------- son ---------- */
  const sndBtn=$('#snd'), sndTxt=$('#sndTxt'), ear=$('#ear'), earTap=$('#earTap');
  onSoundChange(v=>{
    sndBtn.classList.toggle('on',v); sndTxt.textContent=v?'Son activé':'Son coupé';
    if(ear){ ear.setAttribute('aria-pressed',v); earTap.textContent=v?'Son activé ✓':'Clique pour activer le son'; }
  });
  sndBtn.addEventListener('click',toggleSound);
  if(ear){
    ear.addEventListener('click',toggleSound);
    ear.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggleSound(); } });
  }
  armFirstGesture();

  /* ---------- curseur ---------- */
  const cur=$('#cur'); let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
  $$('[data-hover], a, button, label.chip, label.pref').forEach(el=>{
    el.addEventListener('mouseenter',()=>{snd.blip(); cur.classList.add('big')});
    el.addEventListener('mouseleave',()=>cur.classList.remove('big'));
    el.addEventListener('click',()=>snd.pop());
  });

  /* ---------- menu ---------- */
  const burger=$('#burger');
  const setMenu=open=>{
    document.body.classList.toggle('menu-open',open);
    burger.setAttribute('aria-expanded',open); burger.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
    if(open) snd.whoosh(.6);
  };
  burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
  $$('.menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{ if(e.key==='Escape') setMenu(false); });

  /* ---------- header : fond au scroll, masqué en descendant ---------- */
  const hd=$('#hd'); let lastY=0;
  const head=()=>{
    const y=scrollY;
    hd.classList.toggle('solid',y>40);
    hd.classList.toggle('hide',!RM&&y>lastY&&y>200&&!document.body.classList.contains('menu-open')); lastY=y;
  };
  head(); addEventListener('scroll',head,{passive:true});
  if(!RM) onFrame(()=>{ cx=lerp(cx,mx,.2); cy=lerp(cy,my,.2); cur.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`; });

  /* ---------- révélations, halo, FAQ ---------- */
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:.15});
  $$('.rv, #exp, #steps').forEach(el=>io.observe(el));
  $$('.sv').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(); c.style.setProperty('--mx',e.clientX-r.left+'px'); c.style.setProperty('--my',e.clientY-r.top+'px');}));
  $$('.q button').forEach(b=>b.addEventListener('click',()=>{
    const q=b.parentElement, o=q.classList.contains('open');
    $$('.q').forEach(x=>{ x.classList.remove('open'); x.querySelector('button').setAttribute('aria-expanded','false'); });
    if(!o){ q.classList.add('open'); b.setAttribute('aria-expanded','true'); }
  }));
}
