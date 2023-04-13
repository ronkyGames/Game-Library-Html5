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
  spaceship: new Texture("res/images/spaceship.png"),
  bullet: new Texture("res/images/bullet.png")
}

// Bullets
const bullets = new Container()

// add functionality to shoot bullets
function fireBullet(x,y){
  const bullet = new Sprite(textures.bullet)
  bullet.pos.x = x
  bullet.pos.y = y
  bullet.update = function(dt){
    this.pos.x += 400 * dt
  }
  bullets.add(bullet)
}



//Make a spaceship
const ship = new Sprite(textures.spaceship)
ship.pos.x = w/8 - 16
ship.pos.y = h /2 - 16
ship.update = function(dt,t){
  //Update the player position
  const {pos} = this
  pos.x += keyControls.x * dt * 200 // -1*dt*200 or +1*dt*200
  pos.y += keyControls.y * dt * 200

  // test border
  if(pos.x < 0) pos.x = 0
  if(pos.x > w-32) pos.x = w-32
  if(pos.y < 0) pos.y = 0
  if(pos.y > h - 32) pos.y = h - 32
}

//Add everithing to the scene container
scene.add(new Sprite(textures.background))
scene.add(bullets)
scene.add(ship)

// Game state variables
let lastShot = 0

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
  if(keyControls.action && t - lastShot > 0.15){
    lastShot = t
    fireBullet(ship.pos.x +24,ship.pos.y +16)
  }
  // Destroy bullets when they go out of the screen
  bullets.children = bullets.children.filter(bullet => {
    return bullet.pos.x < w + 20
  })
  scene.update(dt,t)
  //render the main container
  renderer.render(scene)
  
}

requestAnimationFrame(loop)