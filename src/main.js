// import libraries
import RonkyGames from "../RonkyGames/index.js"
// all screens
import Mouse from "./entities/Mouse.js"
import Cheese from "./entities/Cheese.js"

const {Game, KeyControls, math, entity} = RonkyGames

// Game setup. code
const game = new Game(640,320)
const {scene, w, h} = game
// controls
const controls = new KeyControls()

//entities
const mouse = new Mouse(new KeyControls())
const cheese = new Cheese()

scene.add(mouse)
scene.add(cheese)

const relocate = e =>{
  const {pos} = e
  pos.x = math.rand(w)
  pos.y = math.rand(h)
}

relocate(mouse)
relocate(cheese)

game.run(()=>{
  // Bounding-box detection
  if(entity.hit(mouse,cheese)){
    relocate(cheese)
  }
})