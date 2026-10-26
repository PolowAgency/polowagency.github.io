/* Un halo lumineux suit la souris à l'intérieur d'une carte (variables CSS --mx / --my, voir .k-spot dans kit.css). */
export function spotlight(cards){
  cards.forEach(c=>c.addEventListener('pointermove',e=>{
    const r=c.getBoundingClientRect(); c.style.setProperty('--mx',e.clientX-r.left+'px'); c.style.setProperty('--my',e.clientY-r.top+'px');
  }));
}
