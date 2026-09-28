
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
