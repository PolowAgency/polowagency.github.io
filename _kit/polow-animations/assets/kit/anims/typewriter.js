/* Texte tapé lettre par lettre, effacé, puis mot suivant. Option onChar : un son « tick » par lettre.
   <h1>Vous avez l'idée, <span id="t"></span><span class="k-caret"></span></h1>
   typewriter($('#t'), ['on la construit.','on la met en ligne.'], {onChar:()=>snd.tick()}) */
import {reducedMotion} from '../core/scroll.js';
export function typewriter(el,words,o={}){
  const {start=900,hold=2200,typeMin=55,typeJitter=60,erase=26,gap=350,onChar=()=>{}}=o;
  if(reducedMotion()){ el.textContent=words[0]; return ()=>{}; }
  let stop=false; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  (async()=>{
    let i=0; await sleep(start);
    while(!stop){
      const w=words[i++%words.length];
      /* ⁠ (word joiner) colle le curseur au dernier mot : il ne passe jamais seul à la ligne */
      for(let k=1;k<=w.length&&!stop;k++){ el.textContent=w.slice(0,k)+'⁠'; if(w[k-1]!==' ') onChar(w[k-1]); await sleep(typeMin+Math.random()*typeJitter); }
      await sleep(hold);
      for(let k=w.length;k>=0&&!stop;k--){ el.textContent=w.slice(0,k)+'⁠'; await sleep(erase); }
      await sleep(gap);
    }
  })();
  return ()=>{stop=true};
}
