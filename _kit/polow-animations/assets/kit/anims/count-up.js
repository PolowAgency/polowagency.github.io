/* Entier qui monte de 0 à sa valeur à l'entrée dans l'écran (décélération). Garde le séparateur de milliers d'origine
   (« 1 750 », « 1,750 » ou « 1.750 »). Seul le premier nœud texte contenant un chiffre est animé :
   <b>950<span> €</span></b> garde son « € ». Sans JavaScript ou en mouvement réduit, la valeur finale reste affichée.
   countUp(document.querySelectorAll('[data-count]')) */
import {reducedMotion,ease} from '../core/scroll.js';
export function countUp(els,{duration=1500}={}){
  if(reducedMotion()) return;
  const data=new Map();
  const run=el=>{
    const {node,final,raw,sep,target}=data.get(el), t0=performance.now();
    const step=t=>{
      const p=Math.min(1,(t-t0)/duration);
      if(p>=1){ node.nodeValue=final; return; }
      node.nodeValue=final.replace(raw,String(Math.round(target*ease(p))).replace(/\B(?=(\d{3})+(?!\d))/g,sep));
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ io.unobserve(e.target); run(e.target); } }),{threshold:.4});
  for(const el of els){
    const node=[...el.childNodes].find(n=>n.nodeType===3&&/\d/.test(n.nodeValue));
    if(!node) continue;
    const final=node.nodeValue, raw=final.match(/\d[\d\s  .,]*/)[0].trimEnd();
    const g=raw.match(/\d([\s  .,])\d{3}(?!\d)/);
    data.set(el,{node,final,raw,sep:g?g[1]:'',target:parseInt(raw.replace(/\D/g,''),10)});
    node.nodeValue=final.replace(raw,'0');
    io.observe(el);
  }
}
