import {clamp,lerp,ease,easeIO,useScrollProgress as prog,onFrame} from './scroll.js';
import {snd} from './sound.js';
import {T} from './i18n.js';
import {$,$$,RM,initCommon} from './common.js';
import {introShutters} from './mix/intro-shutters.js';
import {maskZoom} from './mix/mask-zoom.js';

initCommon();

/* ================= OUVERTURE A VOLETS (1 fois par session) + ZOOM FINAL ================= */
{ const logo=$('.hd .logo img');
  introShutters({key:'polow-intro',html:logo?`<img src="${logo.src}" alt="">`:'',lineAt:500,openAt:850,endAt:1500}); }
maskZoom($('#final'),{text:'POLOW',focal:2});

/* ================= HERO : titre tapé ================= */
const words=T.words;
const typed=$('#typed');
if(RM) typed.textContent=words[0];
else (async()=>{
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  let wi=0; await sleep(900);
  while(true){ const w=words[wi%words.length];
    for(let i=1;i<=w.length;i++){ typed.textContent=w.slice(0,i)+'\u2060'; if(w[i-1]!==' ') snd.tick(); await sleep(55+Math.random()*60); }
    await sleep(2200);
    for(let i=w.length;i>=0;i--){ typed.textContent=w.slice(0,i)+'\u2060'; await sleep(26); }
    await sleep(350); wi++; }
})();

/* ================= VIDEO DE PRESENTATION ================= */
const vid=$('#vid'), vcard=$('#vcard'), vbar=$('#vbar');
const noVideo=()=>vcard.classList.add('novideo');
vid.querySelector('source').addEventListener('error',noVideo);
vid.addEventListener('error',noVideo);
const fmt=s=>isFinite(s)?Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'):'0:00';
vid.addEventListener('timeupdate',()=>{
  const pc=Math.round(vid.currentTime/vid.duration*100)||0;
  $('#vprog').style.width=pc+'%'; vbar.setAttribute('aria-valuenow',pc);
  $('#vtime').textContent=fmt(vid.currentTime)+' / '+fmt(vid.duration);
});
const setPlayIco=()=>$('#vplayIco').setAttribute('d',vid.paused?'M2 1l9 5-9 5z':'M2 1h3v10H2zM7 1h3v10H7z');
$('#vplay').addEventListener('click',()=>{ vid.paused?vid.play().catch(()=>{}):vid.pause(); });
vid.addEventListener('play',setPlayIco); vid.addEventListener('pause',setPlayIco);
$('#vmute').addEventListener('click',()=>{ vid.muted=!vid.muted; $('#vmuteX').style.display=vid.muted?'':'none'; $('#vmute').setAttribute('aria-label',vid.muted?T.vmuteOn:T.vmuteOff); });
const seek=x=>{ const r=vbar.getBoundingClientRect(); if(vid.duration) vid.currentTime=clamp((x-r.left)/r.width)*vid.duration; };
vbar.addEventListener('click',e=>seek(e.clientX));
vbar.addEventListener('keydown',e=>{ if(!vid.duration) return;
  if(e.key==='ArrowRight') vid.currentTime=Math.min(vid.duration,vid.currentTime+5);
  if(e.key==='ArrowLeft') vid.currentTime=Math.max(0,vid.currentTime-5); });
/* lecture auto quand visible (désactivée en mouvement réduit) */
if(!RM) new IntersectionObserver(es=>es.forEach(e=>{ e.isIntersecting?vid.play().catch(()=>{}):vid.pause(); }),{threshold:.3}).observe(vcard);

/* ================= VIDEOS DES REALISATIONS ================= */
const rvio=new IntersectionObserver(es=>es.forEach(e=>{ e.isIntersecting?e.target.play().catch(()=>{}):e.target.pause(); }),{threshold:.25});
$$('.rvid').forEach(v=>{
  const dropVideo=()=>{ rvio.unobserve(v); v.remove(); };
  v.addEventListener('error',dropVideo);
  const src=v.querySelector('source'); if(src) src.addEventListener('error',dropVideo);
  if(!RM) rvio.observe(v);
});

if(!RM){
  const wio=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) snd.whoosh(.8); }),{threshold:.05});
  $$('#pixel,#vision,#designs,#reals').forEach(el=>wio.observe(el));
}

/* ================= TEXTES DECOUPES ================= */
const manifT=$('#manifT'); let orMode=false;
manifT.innerHTML=manifT.textContent.split(' ').map(w=>{ let cls=''; if(w.startsWith('*')){orMode=true;w=w.slice(1)} if(orMode)cls='or'; if(w.endsWith('*')){w=w.slice(0,-1);orMode=false} return `<span class="${cls}">${w}</span>`; }).join(' ');
const manifW=$$('#manifT span'), visW=$$('#visionT span');

/* ================= NOMS QUI DEFILENT ================= */
const rollUl=$('#rollUl'), rollN=rollUl.children.length; let ri=0;
if(!RM) setInterval(()=>{ ri=(ri+1)%rollN; rollUl.style.transform=`translateY(${-ri*1.15}em)`; if(ri===rollN-1) snd.pop(); else snd.tick(); },1800);

/* ================= ANIMATIONS AU SCROLL ================= */
if(!RM){
  const secV=$('#video'), secP=$('#pixel'), secC=$('#vision'), secM=$('#manif'), secD=$('#designs'), secR=$('#reals');
  const lines=$$('#lines i'), pdot=$('#pdot'), ptitle=$('#ptitle'), pgrid=$('#pgrid'), ring=$('#ring');
  const cards=$$('.fcard').map(el=>({el,x:+el.dataset.x,y:+el.dataset.y,r:+el.dataset.r,d:+el.dataset.d}));
  const designsT=$('#designsT'), htrack=$('#htrack');
  let pmx=0,pmy=0,lastPixelStage=0,trackMax=0,mx=innerWidth/2,my=innerHeight/2;
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
  const measure=()=>{ trackMax=Math.max(htrack.scrollWidth-innerWidth,0); };
  measure(); addEventListener('resize',measure); addEventListener('load',measure);
  /* une section n'est calculée que lorsqu'elle est proche de l'écran */
  const near=el=>{ const r=el.getBoundingClientRect(); return r.bottom>-200&&r.top<innerHeight+200; };

  onFrame(()=>{
    pmx=lerp(pmx,(mx/innerWidth-.5),.06); pmy=lerp(pmy,(my/innerHeight-.5),.06);

    if(near(secV)){ const p=prog(secV), e=ease(clamp(p*2.2)); vcard.style.transform=`scale(${lerp(.78,1,e)}) translateY(${lerp(80,0,e)}px)`; vcard.style.borderRadius=lerp(48,24,e)+'px'; }

    if(near(secP)){ const p=prog(secP), a=clamp(p/.45), b=clamp((p-.4)/.3), c=clamp((p-.55)/.4);
      const base=Math.min(innerWidth*.8,900);
      lines.forEach((l,i)=>{ const w=base*(1-i*.15)*(1-easeIO(a)); l.style.width=Math.max(w,0)+'px'; l.style.opacity=1-a*.6; l.style.transform=`translateY(${a*(innerHeight*.33-i*36)}px)`; });
      pdot.style.opacity=(a>.95&&b<1)?1:0; pdot.style.transform=`scale(${1+b*3}) rotate(${b*90}deg)`;
      ptitle.style.opacity=c; ptitle.style.transform=`scale(${lerp(.6,1,ease(c))})`; ptitle.style.filter=`blur(${(1-c)*14}px)`;
      pgrid.style.opacity=c*.9;
      const stage=c>.5?2:a>.95?1:0; if(stage!==lastPixelStage){ if(stage>lastPixelStage) snd.pop(); lastPixelStage=stage; } }

    if(near(secC)){ secC.classList.add('armed'); const p=prog(secC), a=ease(clamp(p/.5)), b=clamp((p-.5)/.5);
      ring.style.transform=`translate(${lerp(-38,0,a)}vw,${Math.sin(p*Math.PI)*-6}vh) scale(${lerp(1,1.6,a)+easeIO(b)*5})`;
      ring.style.opacity=1-b*.85; ring.style.background=`rgba(255,106,26,${b*.12})`;
      const n=Math.floor(clamp(p/.75)*visW.length+.001); visW.forEach((w,i)=>w.classList.toggle('on',i<n)); }

    if(near(secM)){ secM.classList.add('armed'); const p=prog(secM), n=Math.floor(clamp(p/.85)*manifW.length); manifW.forEach((w,i)=>w.classList.toggle('on',i<n)); }

    if(near(secD)){ const p=prog(secD), e=ease(clamp(p/.6)), out=clamp((p-.8)/.2), mob=innerWidth<820?.75:1;
      cards.forEach(c=>{ const sx=c.x*2.4, sy=c.y*2.6, x=lerp(sx,c.x*mob,e)+pmx*c.d*-30, yv=lerp(sy,c.y,e)+pmy*c.d*-30, r=lerp(c.r*3,c.r,e)+pmx*c.d*6;
        c.el.style.transform=`translate(-50%,-50%) translate(${x}vw,${yv}vh) rotate(${r}deg) scale(${lerp(1.3,1,e)*(1-out*.2)})`; c.el.style.opacity=clamp(e*1.5)*(1-out); });
      designsT.style.transform=`scale(${lerp(.7,1,e)})`; designsT.style.opacity=clamp(e*1.4)*(1-out); }

    if(near(secR)){ const p=prog(secR); htrack.style.transform=`translateY(-50%) translateX(${-trackMax*easeIO(p)}px)`; }
  });
}
