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
  bullet: new Texture("res/images/bullet.png"),
  baddie: new Texture("res/images/baddie.png")
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
    // tell to container update function that the bullet must be cancelled
    if(bullet.pos.x >= w + 20){
    bullet.dead = true
    }
  }
  bullets.add(bullet)
}

//Bad guys
const baddies = new Container()
function spawnBaddie(x,y,speed){
  const baddie = new Sprite(textures.baddie)
  baddie.pos.x = x
  baddie.pos.y = y
  baddie.update = function(dt){
    this.pos.x += speed*dt 
    if(this.pos.x < -32){
      baddie.dead = true
    }
  }
  baddies.add(baddie)
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

// Add the score game object
const score = new Text("score:",{
  font : "20px sans-serif",
  fill: "#8B8994",
  align: "center"
})

score.pos.x = w / 2
score.pos.y = h - 30


//Add everithing to the scene container
scene.add(new Sprite(textures.background))

scene.add(bullets)
scene.add(ship)
scene.add(baddies)

scene.add(score)

// Game state variables
let lastShot = 0
let lastSpawn = 0
let spawnSpeed = 1.0

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

  // Spawn bad guys
  if(t-lastSpawn > spawnSpeed){
    lastSpawn = t
    const speed = -50 - (Math.random()*Math.random()*100)
    const position = Math.random()*(h-32)
    spawnBaddie(w,position, speed)

    //Accelerating for the next spawn
    spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed*0.97 + 0.001
  }
  
  scene.update(dt,t)
  //render the main container
  renderer.render(scene)
  
}

requestAnimationFrame(loop)