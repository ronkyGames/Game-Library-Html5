// import libraries
import RonkyGames from "../RonkyGames/index.js"

const {Container, Text, CanvasRenderer} = RonkyGames

// initialize objects
const keyControls = new RonkyGames.KeyControls()
const touchControls = new RonkyGames.PointerControls()

//set the main scene
const scene = new Container()

//Game setup. code
const w = 320
const h = 240
const renderer = new CanvasRenderer(w,h)
document.querySelector("#board").appendChild(renderer.view)

//loop setup
let dt = 0
let last = 0

function loop(ms){
  requestAnimationFrame(loop)

  // set time variables to use in game logic
  const t = ms/1000
  dt = t - last
  last = t

  // Game Logic Code Here
  scene.update(dt,t)
  //render the main container
  renderer.render(scene)
  
}

requestAnimationFrame(loop)