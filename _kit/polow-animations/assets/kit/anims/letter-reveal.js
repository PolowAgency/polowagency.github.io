/* Titre qui se compose lettre par lettre : chaque mot reste entier (jamais coupé en fin de ligne), chaque lettre monte et se précise.
   Les balises internes (<span class="accent">) sont conservées. Le texte d'origine reste lisible par les lecteurs d'écran (aria-label).
   letterReveal(document.querySelectorAll('h2'), {stagger:16})   Déclenché à l'entrée dans l'écran (classe k-in). */
import {reducedMotion} from '../core/scroll.js';
export function letterReveal(els,{stagger=16,maxDelay=700}={}){
  if(reducedMotion()) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('k-in'); io.unobserve(e.target); } }),{rootMargin:'0px 0px -12% 0px',threshold:.1});
  for(const el of els){
    if(el.dataset.kLr) continue;
    el.dataset.kLr='1';
    if(!el.getAttribute('aria-label')) el.setAttribute('aria-label',el.textContent.replace(/\s+/g,' ').trim());
    let n=0;
    const walk=node=>{
      for(const c of [...node.childNodes]){
        if(c.nodeType===3){
          const frag=document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(part=>{
            if(!part) return;
            if(/^\s+$/.test(part)){ frag.appendChild(document.createTextNode(' ')); return; }
            const w=document.createElement('span'); w.className='k-lr-w'; w.setAttribute('aria-hidden','true');
            [...part].forEach(ch=>{ const l=document.createElement('span'); l.className='k-lr-l'; l.textContent=ch;
              l.style.setProperty('--d',Math.min(n++*stagger,maxDelay)+'ms'); w.appendChild(l); });
            frag.appendChild(w);
          });
          c.replaceWith(frag);
        } else if(c.nodeType===1&&c.tagName!=='BR'){ c.setAttribute('aria-hidden','true'); walk(c); }
      }
    };
    walk(el); el.classList.add('k-lr'); io.observe(el);
  }
}
