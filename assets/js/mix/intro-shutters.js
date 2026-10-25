/* Ouverture de page : un logo apparaît, un trait lumineux s'allume, deux volets s'ouvrent vers le haut et le bas.
   Une seule fois par session (sessionStorage), jamais en mouvement réduit, ni si la page est déjà défilée ou ouverte sur une ancre.
   introShutters({html:'<img src="logo.svg" alt="">'}).then(()=>…)   Événement : 'k:intro-done' sur window. */
import {reducedMotion} from '../scroll.js';
export function introShutters({html='',key='k-intro',lineAt=650,openAt=1050,endAt=1900}={}){
  const done=()=>dispatchEvent(new Event('k:intro-done'));
  try{ if(sessionStorage.getItem(key)) { done(); return Promise.resolve(false); } }catch{}
  if(reducedMotion()||location.hash||scrollY>40){ done(); return Promise.resolve(false); }
  try{ sessionStorage.setItem(key,'1'); }catch{}
  const el=document.createElement('div');
  el.className='k-intro'; el.setAttribute('aria-hidden','true');
  el.innerHTML=`<div class="k-vol k-vol-top"></div><div class="k-vol k-vol-bot"></div><div class="k-intro-mark">${html}</div><div class="k-intro-line"></div>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('k-intro-on');
  return new Promise(res=>{
    setTimeout(()=>el.classList.add('k-line'),lineAt);
    setTimeout(()=>el.classList.add('k-open'),openAt);
    setTimeout(()=>{ el.remove(); document.documentElement.classList.remove('k-intro-on'); done(); res(true); },endAt);
  });
}
