/* Moteur de son Web Audio, aucun fichier audio. L'état est global et mémorisé. */
const KEY='polow-sound';
const S={ctx:null,master:null,on:false};
const listeners=new Set();
const read=()=>{try{return localStorage.getItem(KEY)}catch{return null}};
const write=v=>{try{localStorage.setItem(KEY,v?'on':'off')}catch{}};

function initAudio(){
  if(S.ctx) return true;
  const C=window.AudioContext||window.webkitAudioContext;
  if(!C) return false;
  S.ctx=new C(); S.master=S.ctx.createGain(); S.master.gain.value=.5; S.master.connect(S.ctx.destination);
  return true;
}
function noiseBuf(d){
  const c=S.ctx,b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),x=b.getChannelData(0);
  for(let i=0;i<x.length;i++) x[i]=Math.random()*2-1;
  return b;
}

export const snd={
  tick(){ if(!S.on)return; const c=S.ctx,t=c.currentTime,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
    s.buffer=noiseBuf(.03); f.type='bandpass'; f.frequency.value=2500+Math.random()*2500; f.Q.value=3;
    g.gain.setValueAtTime(.35,t); g.gain.exponentialRampToValueAtTime(.001,t+.03); s.connect(f).connect(g).connect(S.master); s.start(t); },
  blip(){ if(!S.on)return; const c=S.ctx,t=c.currentTime,o=c.createOscillator(),g=c.createGain();
    o.type='sine'; o.frequency.setValueAtTime(1300,t); o.frequency.exponentialRampToValueAtTime(900,t+.06);
    g.gain.setValueAtTime(.06,t); g.gain.exponentialRampToValueAtTime(.001,t+.08); o.connect(g).connect(S.master); o.start(t); o.stop(t+.1); },
  pop(){ if(!S.on)return; const c=S.ctx,t=c.currentTime,o=c.createOscillator(),g=c.createGain();
    o.type='triangle'; o.frequency.setValueAtTime(420,t); o.frequency.exponentialRampToValueAtTime(140,t+.12);
    g.gain.setValueAtTime(.25,t); g.gain.exponentialRampToValueAtTime(.001,t+.15); o.connect(g).connect(S.master); o.start(t); o.stop(t+.16); },
  whoosh(dur=.7){ if(!S.on)return; const c=S.ctx,t=c.currentTime,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
    s.buffer=noiseBuf(dur); f.type='bandpass'; f.Q.value=1.2; f.frequency.setValueAtTime(300,t); f.frequency.exponentialRampToValueAtTime(3200,t+dur*.6); f.frequency.exponentialRampToValueAtTime(600,t+dur);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.22,t+dur*.4); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f).connect(g).connect(S.master); s.start(t); },
  chime(){ if(!S.on)return; const c=S.ctx,t=c.currentTime; [660,990,1320].forEach((fr,i)=>{const o=c.createOscillator(),g=c.createGain();
    o.type='sine'; o.frequency.value=fr; g.gain.setValueAtTime(.0001,t+i*.07); g.gain.exponentialRampToValueAtTime(.08,t+i*.07+.02); g.gain.exponentialRampToValueAtTime(.0001,t+i*.07+.6);
    o.connect(g).connect(S.master); o.start(t+i*.07); o.stop(t+i*.07+.7);}); },
};

export const isSoundOn=()=>S.on;

/* Abonnement à l'état du son. Renvoie la fonction de désabonnement. */
export function onSoundChange(fn){ listeners.add(fn); return ()=>listeners.delete(fn); }

export function setSound(v){
  if(!initAudio()) return;
  S.on=v; write(v);
  if(v) S.ctx.resume();
  listeners.forEach(fn=>fn(v));
  if(v) snd.chime();
}
export const toggleSound=()=>setSound(!S.on);

/* Le navigateur bloque l'audio avant un geste : le premier clic active le son,
   sauf si le visiteur l'a coupé lui-même lors d'une visite précédente. */
export function armFirstGesture(ignoreSelector='#snd,#ear'){
  if(read()==='off') return;
  addEventListener('pointerdown',e=>{
    if(e.target.closest(ignoreSelector)) return;
    setSound(true);
  },{capture:true,once:true});
}
