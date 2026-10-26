/* En-tête fixe : fond flou après un peu de scroll (.k-solid), masqué quand on descend, réapparaît en remontant (.k-hide). */
export function smartHeader(header,{solidAfter=40,hideAfter=200}={}){
  let last=0;
  const f=()=>{
    const y=scrollY, menuOpen=document.body.classList.contains('k-menu-open');
    header.classList.toggle('k-solid',y>solidAfter);
    header.classList.toggle('k-hide',y>last&&y>hideAfter&&!menuOpen); last=y;
  };
  f(); addEventListener('scroll',f,{passive:true});
}
