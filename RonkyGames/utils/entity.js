import math from "./math.js"
// return the center position of an entity
function center(entity){
  const {pos, tileW, tileH} = entity
  const w = tileW
  const h = tileH
  return {
    x: pos.x + Math.floor(w/2),
    y: pos.y + Math.floor(h/2)
  }
}

// return the distance between the center of two entities
function distance(a,b){
  return math.distance(center(a),center(b))
}

// bounds of entity for collisions
function bounds(entity){
  const {w, h, pos, hitBox} = entity
  const hit = hitBox || {x:0, y:0, w, h}
  return {
    x: hit.x +pos.x,
    y: hit.y +pos.y,
    w: hit.w -1,
    h: hit.h -1
  }
}

function hit(e1,e2){
  const a = bounds(e1)
  const b = bounds(e2)
  return a.x +a.w >= b.x && a.x <= b.x+b.w && a.y +a.h >= b.y && a.y <= b.y + b.h
}
// perform a callback function when one entity of a container is hit by the principal entity
function hits(entity, container, hitCallback){
  const e1 = entity
  container.map(e2 =>{
    if(hit(e1,e2)){
      hitCallback(e2)
    }
  })
}

// flip entity 
function flipX(e,flipped = true){
  const {anchor, scale, tileW} = e
  scale.x = flipped ? -1 : 1
  anchor.x = flipped ? tileW : 0
  return {anchor, scale}
}

function flipY(e,flipped = true){
  const {anchor, scale, tileH} = e
  scale.y = flipped ? -1 : 1
  anchor.y = flipped ? tileH : 0
  return {anchor, scale}
}

export default{
  center,
  distance,
  bounds,
  hit,
  hits,
  flipX, flipY
}