// import libraries
import RonkyGames from "../RonkyGames/index.js"

const {Container, Text, Texture, Sprite, CanvasRenderer} = RonkyGames

//Game setup. code
const w = 320
const h = 240
const renderer = new CanvasRenderer(w,h)
document.querySelector("#board").appendChild(renderer.view)

//Controls objects
const keyControls = new RonkyGames.KeyControls()
const touchControls = new RonkyGames.PointerControls()

//Game Objects
const scene = new Container()

const texture = new Texture("res/images/spaceship.png")
for(let i=0; i< 50; i++){
  const ship = new Sprite(texture)
  ship.pos.x = Math.random() * w
  ship.pos.y = Math.random() * h
  scene.add(ship)
}

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