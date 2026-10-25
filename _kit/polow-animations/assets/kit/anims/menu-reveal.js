/* Menu plein écran qui s'ouvre en cercle depuis le bouton burger (clip-path). Échap ferme. aria-expanded géré.
   body.k-menu-open pilote le CSS. Liens .k-menu a : ferment le menu. */
export function menuReveal({burger,menu,labels={open:'Ouvrir le menu',close:'Fermer le menu'},onToggle=()=>{}}){
  const set=open=>{
    document.body.classList.toggle('k-menu-open',open);
    burger.setAttribute('aria-expanded',open); burger.setAttribute('aria-label',open?labels.close:labels.open);
    onToggle(open);
  };
  burger.addEventListener('click',()=>set(!document.body.classList.contains('k-menu-open')));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
  addEventListener('keydown',e=>{ if(e.key==='Escape') set(false); });
  return set;
}
