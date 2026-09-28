
/* ── Blur-text ── */
function initBlurText(){
  const h1=document.getElementById('heroH1')
  if(!h1)return
  let delay=0
  const processNode=(node)=>{
    if(node.nodeType===3){
      const words=node.textContent.split(/(\s+)/)
      const frag=document.createDocumentFragment()
      words.forEach(w=>{
        if(w.match(/\S/)){const s=document.createElement('span');s.className='bw';s.style.setProperty('--d',delay+'ms');s.textContent=w;frag.appendChild(s);delay+=65}
        else if(w){frag.appendChild(document.createTextNode(w))}
      })
      node.parentNode.replaceChild(frag,node)
    }else if(node.nodeType===1&&node.tagName!=='BR'){Array.from(node.childNodes).forEach(processNode)}
  }
  Array.from(h1.childNodes).forEach(processNode);h1.offsetHeight
}
initBlurText()

/* ── Hero Mockup Tabs ── */
const hmData=[
  {
    title:"Un site qui déclenche l'action",
    bullets:["Plus de demandes réellement qualifiées","Meilleure conversion à trafic égal","Moins de visiteurs qui repartent sans décider"],
    preview:"Site Web.",
    code:`<span class="cm">// votre site, en clair</span>
<span class="ky">objectif</span> <span class="op">:</span> <span class="st">"convertir les visiteurs en rendez-vous"</span>
<span class="ky">action</span>   <span class="op">:</span> <span class="st">"répond en 5 secondes aux questions clés"</span>
<span class="ky">résultat</span> <span class="op">:</span> <span class="st">"moins d'appels, plus de demandes qualifiées"</span>`
  },
  {
    title:"Un dashboard que votre équipe va adorer",
    bullets:["Données en temps réel, toujours accessibles","Accès multi-rôles et permissions fines","Déployé en semaines, pas en mois"],
    preview:"App / SaaS.",
    code:`<span class="cm">// votre application, en clair</span>
<span class="ky">objectif</span> <span class="op">:</span> <span class="st">"un outil que vos équipes ouvrent chaque jour"</span>
<span class="ky">action</span>   <span class="op">:</span> <span class="st">"centralise vos données en temps réel"</span>
<span class="ky">résultat</span> <span class="op">:</span> <span class="st">"zéro tableur, zéro double-saisie"</span>`
  },
  {
    title:"Un logiciel taillé pour votre métier",
    bullets:["Adapté à vos flux, pas l'inverse","Intégrations sur mesure avec vos outils","Formation et support inclus"],
    preview:"ERP / Logiciel.",
    code:`<span class="cm">// votre logiciel métier, en clair</span>
<span class="ky">objectif</span> <span class="op">:</span> <span class="st">"suivre vos dossiers sans y penser"</span>
<span class="ky">action</span>   <span class="op">:</span> <span class="st">"alerte automatiquement en cas de retard"</span>
<span class="ky">résultat</span> <span class="op">:</span> <span class="st">"zéro appel pour un point d'avancement"</span>`
  }
]
function setGutter(code){
  const lines=code.split('\n').length
  document.getElementById('hmGutter').innerHTML=Array.from({length:lines},(_,i)=>`<span>${i+1}</span>`).join('')
}
let hmIdx=0
function switchHmTab(idx){
  const d=hmData[idx]
  const title=document.getElementById('hmTitle')
  const bullets=document.getElementById('hmBullets')
  const code=document.getElementById('hmCode')
  const preview=document.getElementById('hmPreviewText')
  title.style.opacity='0';title.style.transform='translateY(6px)'
  bullets.style.opacity='0';code.style.opacity='0'
  preview.style.opacity='0';preview.style.transform='translateY(6px)'
  setTimeout(()=>{
    title.textContent=d.title
    bullets.innerHTML=d.bullets.map(b=>`<span class="hm-bullet">${b}</span>`).join('')
    code.innerHTML=d.code
    setGutter(d.code)
    preview.textContent=d.preview
    title.style.opacity='1';title.style.transform='none'
    bullets.style.opacity='1';code.style.opacity='1'
    preview.style.opacity='1';preview.style.transform='none'
  },200)
  document.querySelectorAll('.hm-tab').forEach((t,i)=>t.classList.toggle('act',i===idx))
  hmIdx=idx
}
document.getElementById('hmCode').innerHTML=hmData[0].code
setGutter(hmData[0].code)
document.getElementById('hmTabs').addEventListener('click',e=>{
  const tab=e.target.closest('.hm-tab')
  if(!tab)return
  switchHmTab(parseInt(tab.dataset.idx))
})
setInterval(()=>switchHmTab((hmIdx+1)%3),4500)

/* ── Pref buttons ── */
function togglePref(type){
  document.getElementById('prefCall').classList.toggle('sel',type==='call')
  document.getElementById('prefMsg').classList.toggle('sel',type==='msg')
  document.getElementById('contactPref').value=type
}

/* ── Type selector ── */
document.getElementById('typeGrid').addEventListener('click',function(e){
  const card=e.target.closest('.type-card')
  if(!card)return
  this.querySelectorAll('.type-card').forEach(c=>c.classList.remove('sel'))
  card.classList.add('sel')
  document.getElementById('typeProjet').value=card.dataset.type
})

/* ── Budget selector ── */
document.getElementById('budgetGrid').addEventListener('click',function(e){
  const opt=e.target.closest('.budget-opt')
  if(!opt)return
  this.querySelectorAll('.budget-opt').forEach(o=>o.classList.remove('sel'))
  opt.classList.add('sel')
  document.getElementById('budgetVal').value=opt.dataset.budget
})

/* ── Contact form ── */
document.getElementById('cform').addEventListener('submit',async function(e){
  e.preventDefault()
  const btn=this.querySelector('.btn-submit')
  const ok=document.getElementById('ok'),err=document.getElementById('err')
  ok.style.display='none';err.style.display='none'
  btn.disabled=true;btn.querySelector('span').textContent='Envoi...'
  try{
    const res=await fetch('https://formspree.io/f/xykqonqo',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(this)))})
    if(res.ok){ok.style.display='block';this.reset()}else throw new Error()
  }catch{err.style.display='block'}
  finally{btn.disabled=false;btn.querySelector('span').textContent='Envoyer ma demande'}
})
document.getElementById('prefCall').addEventListener('click',()=>togglePref('call'))
document.getElementById('prefMsg').addEventListener('click',()=>togglePref('msg'))
