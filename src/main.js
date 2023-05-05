// import libraries
import RonkyGames from "../RonkyGames/index.js"
import Squizz from "./entities/Squizz.js"
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


game.run(()=>{
  const {pos} = squizz
  const { bounds : {top,bottom,left, right}} = level
  const centerPos = entity.center(squizz)
  
  // Confine player pos to the bounds area
  pos.x = math.clamp(pos.x, left, right)
  pos.y = math.clamp(pos.y,top,bottom)
  const ground = level.checkGround(pos)
})