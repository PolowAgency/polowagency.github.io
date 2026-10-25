/* Vidéo : lecture automatique quand elle est visible (pause sinon), et contrôles personnalisés.
   Si le fichier manque, la classe k-novideo est posée sur le conteneur (affiche une carte de secours). */
import {clamp,reducedMotion} from '../core/scroll.js';
export function playWhenVisible(video,{threshold=.3}={}){
  if(reducedMotion()) return;
  new IntersectionObserver(es=>es.forEach(e=>{ e.isIntersecting?video.play().catch(()=>{}):video.pause(); }),{threshold}).observe(video);
}
export function videoControls({video,box,play,bar,progressEl,time,mute}){
  const fmt=s=>isFinite(s)?Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'):'0:00';
  const fail=()=>box.classList.add('k-novideo');
  video.addEventListener('error',fail); video.querySelector('source')?.addEventListener('error',fail);
  video.addEventListener('timeupdate',()=>{
    const pc=Math.round(video.currentTime/video.duration*100)||0;
    progressEl.style.width=pc+'%'; bar.setAttribute('aria-valuenow',pc); time.textContent=fmt(video.currentTime)+' / '+fmt(video.duration);
  });
  play?.addEventListener('click',()=>video.paused?video.play().catch(()=>{}):video.pause());
  mute?.addEventListener('click',()=>{ video.muted=!video.muted; mute.classList.toggle('muted',video.muted); });
  bar.addEventListener('click',e=>{ const r=bar.getBoundingClientRect(); if(video.duration) video.currentTime=clamp((e.clientX-r.left)/r.width)*video.duration; });
  bar.addEventListener('keydown',e=>{ if(!video.duration) return;
    if(e.key==='ArrowRight') video.currentTime=Math.min(video.duration,video.currentTime+5);
    if(e.key==='ArrowLeft') video.currentTime=Math.max(0,video.currentTime-5); });
}
