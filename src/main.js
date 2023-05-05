// import libraries
import RonkyGames from "../RonkyGames/index.js"
import Squizz from "./entities/Squizz.js"
import Level from "./Level.js"


const {Game, PointerControls, KeyControls, Container, Texture, TileMap, math, entity} = RonkyGames

// Game setup. code
const game = new Game(640,320)
const { scene, w, h } = game
// controls
const pointer = new PointerControls(game.renderer.view)
const controls = new KeyControls()
//Entities
const squizz = new Squizz(controls)
squizz.setIdle()



const level = new Level(w,h)

scene.add(level)
scene.add(squizz)

game.run(()=>{
  const {pos} = squizz
  const { bounds : {top,bottom,left, right}} = level
  const centerPos = entity.center(squizz)
  
  // Confine player pos to the bounds area
  pos.x = math.clamp(pos.x, left, right)
  pos.y = math.clamp(pos.y,top,bottom)
  const ground = level.checkGround(pos)
})