/* Les éléments .k-rv apparaissent (montée + fondu) quand ils entrent dans l'écran. Une seule fois. */
export function revealOnScroll(selector='.k-rv',{threshold=.15}={}){
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold});
  document.querySelectorAll(selector).forEach(el=>io.observe(el));
}
