/* Nuage de mots qui flottent autour d'un titre central et apparaissent un à un pendant le scroll.
   <section class="k-wc" style="height:260vh"><div class="k-sticky"><h2>Titre</h2><div class="k-wc-cloud"></div></div></section>
   wordCloud(section, ['design','clarté',…], {count:46})   Positions pseudo-aléatoires reproductibles (graine), en évitant le centre. */
import {onFrame,progress,near,clamp,reducedMotion} from '../core/scroll.js';
export function wordCloud(section,words,{count=46,seed=7,avoid=[[18,82,36,60],[24,76,76,100]]}={}){
  const box=section.querySelector('.k-wc-cloud'); let g=seed;
  const rnd=()=>(g=g*16807%2147483647,(g-1)/2147483646), spans=[];
  for(let i=0;i<count;i++){
    const s=document.createElement('span'); let x,y,tries=0;
    do{ const a=rnd()*Math.PI*2, r=.2+Math.pow(rnd(),.8)*.3; x=50+Math.cos(a)*r*100; y=50+Math.sin(a)*r*90; tries++; }
    while(tries<40&&(avoid.some(([x0,x1,y0,y1])=>x>x0&&x<x1&&y>y0&&y<y1)||x<3||x>92||y<8||y>94));
    s.textContent=words[i%words.length];
    s.style.cssText=`left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;font-size:${(11+rnd()*16).toFixed(1)}px;--o:${(.18+rnd()*.5).toFixed(2)};--d:${(-rnd()*9).toFixed(2)}s;--dx:${((rnd()-.5)*18).toFixed(1)}px;--dy:${((rnd()-.5)*18).toFixed(1)}px`;
    if(rnd()<.3) s.style.filter='blur(1.4px)';
    box.appendChild(s); spans.push(s);
  }
  if(reducedMotion()){ spans.forEach(s=>s.classList.add('k-on')); return ()=>{}; }
  return onFrame(()=>{
    if(!near(section,100)) return;
    const n=Math.round(clamp((progress(section)+.05)/.8)*spans.length);
    spans.forEach((s,i)=>s.classList.toggle('k-on',i<n));
  });
}
