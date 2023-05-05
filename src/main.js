// import libraries
import RonkyGames from "../RonkyGames/index.js"
import Squizz from "./entities/Squizz.js"
import Baddie from "./entities/Baddie.js"
import Level from "./Level.js"


const {Game, PointerControls, KeyControls, Container, Camera, Texture, TileMap, math, entity} = RonkyGames

// Game setup. code
const game = new Game(640,320)
const { scene, w, h } = game
// controls
const pointer = new PointerControls(game.renderer.view)
const controls = new KeyControls()
//Entities
const squizz = new Squizz(controls)
squizz.setIdle()

/* 
  The camera should follow our main character, Squizz. The size
  of the viewport will be the full canvas size and the size of the 
  world is the pixel size of the level
*/
const level = new Level(w*2,h*2)

squizz.pos = level.startPos

//Add Baddies
const baddies = addBaddies(level)

function addBaddies(level){
  const baddies = new Container()
  // horizontal bad guys
  for(let i = 0; i < 5; i++){
    const b = baddies.add(new Baddie(32*5,0))
    b.pos.y = Math.floor(level.h/5)*i + level.tileH * 2
  }

  // vertical bad guys
  for(let i = 0; i < 10; i++){
    const b = baddies.add(new Baddie(0, 32*5))
    b.pos.x = Math.floor(level.w / 10)*1+level.tileW
  }
  return baddies
}

function updateBaddies(){
  baddies.map(b => {
    const { pos } = b
    if(entity.distance(squizz,b) < 32){
      // A hit
      squizz.dead = true

      // Send off screen for a bit
      if(b.xSpeed) pos.x = -level.w
      else pos.y = -level.h
    }

    // Screen Wrap
    if(pos.x > level.w) pos.x = -32
    if(pos.y > level.h) pos.y = -32
  })
}

/*
  The camera needs to be added to the main scene, but now squizz 
  and level should be added to the camera, not directly to the   
  scene  
*/
const camera = new Camera(
  squizz,
  {w,h},
  {w:level.w, h:level.h} 
)
scene.add(camera)
camera.add(level)
camera.add(squizz)
camera.add(baddies)


game.run(()=>{
  const {pos} = squizz
  const { bounds : {top,bottom,left, right}} = level
  const centerPos = entity.center(squizz)

  updateBaddies()
  
  // Confine player pos to the bounds area
  pos.x = math.clamp(pos.x, left, right)
  pos.y = math.clamp(pos.y,top,bottom)
  
  const ground = level.checkGround(entity.center(squizz))
  if(ground === "cleared"){
    squizz.dead = true
  }
})