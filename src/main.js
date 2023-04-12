// import libraries
import RonkyGames from "../RonkyGames/index.js"

const {Container, Text, Texture, Sprite, CanvasRenderer} = RonkyGames

//Game setup. code
const w = 640
const h = 300
const renderer = new CanvasRenderer(w,h)
document.querySelector("#board").appendChild(renderer.view)

//Controls objects
const keyControls = new RonkyGames.KeyControls()
const touchControls = new RonkyGames.PointerControls()

//Game Objects
const scene = new Container()

//Load game textures
const textures = {
  background: new Texture("res/images/bg.png"),
  spaceship: new Texture("res/images/spaceship.png")
}

//Make a spaceship
const ship = new Sprite(textures.spaceship)
ship.pos.x = w/8 - 16
ship.pos.y = h /2 - 16
ship.update = function(dt,t){
  //Update the player position
  console.log("Player will move!")
}

//Add everithing to the scene container
scene.add(new Sprite(textures.background))
scene.add(ship)

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