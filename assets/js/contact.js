import {initCommon,$} from './common.js';
initCommon();

const form=$('#cform'), ok=$('#ok'), ko=$('#err'), send=$('#send');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  ok.hidden=ko.hidden=true;
  send.disabled=true; send.firstElementChild.textContent='Envoi en cours';
  try{
    const res=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
    if(!res.ok) throw new Error(res.status);
    ok.hidden=false; form.reset(); ok.scrollIntoView({block:'center',behavior:'smooth'});
  }catch{ ko.hidden=false; }
  finally{ send.disabled=false; send.firstElementChild.textContent='Envoyer ma demande'; }
});
