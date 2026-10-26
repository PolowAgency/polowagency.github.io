/* Au survol, chaque lettre du bouton défile vers le haut et laisse place à sa copie, avec un léger décalage de lettre en lettre.
   letterRoll(document.querySelectorAll('.btn'))   Ne touche que les éléments dont le contenu est un simple texte. */
import {reducedMotion} from '../core/scroll.js';
export function letterRoll(els,{stagger=18}={}){
  if(reducedMotion()||!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  for(const el of els){
    if(el.dataset.kRoll||el.children.length||!el.textContent.trim()) continue;
    const txt=el.textContent.trim();
    el.dataset.kRoll='1';
    if(!el.getAttribute('aria-label')) el.setAttribute('aria-label',txt);
    const wrap=document.createElement('span');
    wrap.className='k-roll-txt'; wrap.setAttribute('aria-hidden','true');
    [...txt].forEach((ch,i)=>{
      const l=document.createElement('i');
      l.dataset.c=ch===' '?'\u00a0':ch; l.textContent=l.dataset.c; l.style.setProperty('--k',i*stagger+'ms');
      wrap.appendChild(l);
    });
    el.textContent=''; el.appendChild(wrap);
  }
}
