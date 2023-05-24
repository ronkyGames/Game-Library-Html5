function rand(min,max){
  return Math.floor(randf(min,max))
}

function randf(min, max){
  if(max == null){
    max = min || 1
    min = 0
  }
  return Math.random()*(max-min)+min
}

function randOneIn(max=2){
  return rand(0,max) === 0 // return true if rand(0,max)=0
}

// return one random item in array 
function randOneFrom(items){
  return items[rand(items.lenght)]
}

// not random functions
function distance(a,b){
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx*dx + dy*dy)
}

function clamp(x , min, max){
  return Math.max(min, Math.min(x, max))
}

function boolClamp(x, min, max){
  return x == clamp(x,min,max)
}

function setUnit(w,h, n){
    if(w < h){
      return Math.floor(w/n)
    }else{
      return Math.floor(h/n)
    }
  return 0
  }

export default{
  rand,
  randf,
  randOneIn,
  randOneFrom,
  distance,
  clamp,
  boolClamp,
  setUnit
}