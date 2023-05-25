// import libraries
import RonkyGames from "../RonkyGames/index.js"
// all screens
import Mouse from "./entities/Mouse.js"
import Cheese from "./entities/Cheese.js"

const {Game, KeyControls, Container, math, entity} = RonkyGames

// Game setup. code
const game = new Game(640,320)
const {scene, w, h} = game
// controls
const controls = new KeyControls()

//entities
const mouse = new Mouse(new KeyControls())
const cheeses = new Container()

scene.add(mouse)
scene.add(cheeses)

const relocate = e =>{
  const {pos} = e
  pos.x = math.rand(w)
  pos.y = math.rand(h)
}

for(let i=1; i<=10; i++){
 const cheese = cheeses.add(new Cheese())
  relocate(cheese)
}

relocate(mouse)

game.run(()=>{
  // Bounding-box detection
  entity.hits(mouse, cheeses, cheese =>{
    relocate(cheese)
  })
})