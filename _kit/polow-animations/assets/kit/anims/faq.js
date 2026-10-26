/* Accordéon FAQ, un seul volet ouvert à la fois, aria-expanded géré.
   <div class="k-q"><button aria-expanded="false" aria-controls="a1">Question<i>+</i></button><div class="k-a" id="a1"><div><p>Réponse</p></div></div></div> */
export function accordion(root=document){
  const qs=[...root.querySelectorAll('.k-q')];
  qs.forEach(q=>q.querySelector('button').addEventListener('click',()=>{
    const was=q.classList.contains('open');
    qs.forEach(x=>{ x.classList.remove('open'); x.querySelector('button').setAttribute('aria-expanded','false'); });
    if(!was){ q.classList.add('open'); q.querySelector('button').setAttribute('aria-expanded','true'); }
  }));
}
