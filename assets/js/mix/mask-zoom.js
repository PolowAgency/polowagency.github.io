/* Zoom dans un mot géant : un grand mot sert de masque à un fond animé (dégradé, vidéo). Au scroll on s'enfonce dans
   une lettre pleine (un « L », un « I »…) jusqu'à ce que le fond remplisse tout l'écran, puis le contenu apparaît.
   Structure : <section class="k-mz" style="height:260vh"><div class="k-mz-sticky">
                 <div class="k-mz-layer"> …fond (dégradé, vidéo)… </div>
                 <div class="k-mz-after"> …contenu final… </div></div></section>
   maskZoom(section, {text:'POLOW', focal:2, stem:.25})   focal = rang de la lettre dans laquelle on s'enfonce,
   stem = position horizontale dans cette lettre (0.25 = le fût d'un L ou d'un I).
   Police du masque : les polices système seulement (un SVG utilisé en masque ne charge pas les polices de la page). */
import {onFrame,progress,near,clamp,reducedMotion} from '../scroll.js';
const ease3=t=>t*t*(3-2*t);
export function maskZoom(section,{text='POLOW',focal=2,stem=.25,start=.1,span=.62,endMul=60,showAt=.74,weight=800,spacing=-12}={}){
  const layer=section.querySelector('.k-mz-layer'), after=section.querySelector('.k-mz-after');
  if(reducedMotion()||!layer) return ()=>{};
  const font='Helvetica Neue, Helvetica, Arial, sans-serif', NS='http://www.w3.org/2000/svg';
  const attrs=`x="500" y="212" text-anchor="middle" font-family="${font}" font-weight="${weight}" font-size="230" letter-spacing="${spacing}"`;
  const uri=`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="${NS}" viewBox="0 0 1000 260"><text ${attrs}>${text}</text></svg>`)}")`;
  const setMask=v=>{ layer.style.webkitMaskImage=layer.style.maskImage=v; };
  setMask(uri);
  /* sous le masque, un aplat de même fond apparaît à la fin : le passage au plein écran se fait sans à-coup */
  const fill=document.createElement('div'); fill.className='k-mz-fill'; fill.setAttribute('aria-hidden','true'); layer.before(fill);
  let fx=.5,fy=.5;
  /* position de la lettre visée : mesurée sur une copie cachée du texte */
  const probe=document.createElementNS(NS,'svg'), t=document.createElementNS(NS,'text');
  probe.setAttribute('viewBox','0 0 1000 260'); probe.style.cssText='position:absolute;width:1000px;height:260px;left:-9999px;top:0;visibility:hidden';
  attrs.replace(/(\S+)="([^"]*)"/g,(_,k,v)=>t.setAttribute(k,v)); t.textContent=text; probe.appendChild(t); document.body.appendChild(probe);
  const measure=()=>{ try{ const b=t.getExtentOfChar(focal); fx=(b.x+b.width*stem)/1000; fy=(b.y+b.height*.55)/260; }catch{} };
  measure(); document.fonts?.ready.then(measure);
  return onFrame(()=>{
    if(!near(section)) return;
    const p=progress(section), h=ease3(clamp((p-start)/span)), W=innerWidth, H=innerHeight;
    const base=W*(W<760?1.05:.86), end=W*endMul, w=base*Math.pow(end/base,h);
    if(h>=.999) setMask('none'); else {
      setMask(uri);
      layer.style.webkitMaskSize=layer.style.maskSize=`${w.toFixed(1)}px auto`;
      layer.style.webkitMaskPosition=layer.style.maskPosition=`${(W/2-fx*w).toFixed(1)}px ${(H/2-fy*w*.26).toFixed(1)}px`;
    }
    fill.style.opacity=ease3(clamp((h-.7)/.3)).toFixed(3);
    layer.style.setProperty('--k-mz-h',h.toFixed(3));
    after&&after.classList.toggle('k-on',p>showAt);
  });
}
