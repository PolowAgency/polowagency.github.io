/* Ressort amorti : s = {v:valeur, vel:vitesse}. À appeler à chaque image avec le pas de temps dt (secondes).
   const s={v:1,vel:0}; spring(s, cible, dt, 420, 14)   (raideur, amortissement) */
export function spring(s,target,dt,k=420,c=14){
  const d=Math.min(dt,.033);
  s.vel+=((target-s.v)*k-s.vel*c)*d;
  s.v+=s.vel*d;
  return s.v;
}
