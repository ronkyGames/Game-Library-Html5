// return the center position of an entity
function center(entity){
  const {pos, tileW, tileH} = entity
  const w = tileW
  const h = tileH
  console.log(w)
  return {
    x: pos.x + Math.floor(w/2),
    y: pos.y + Math.floor(h/2)
  }
}

// return the distance between the center of two entities
function distance(a,b){
  return math.distance(center(a),center(b))
}

export default{
  center
}