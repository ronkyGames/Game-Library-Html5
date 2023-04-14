// import libraries
import RonkyGames from "../RonkyGames/index.js"

const {Game, Container, Text, Texture, Sprite, CanvasRenderer, math} = RonkyGames

//Game setup. code
const game = new Game(640,320)
const { scene, w, h } = game

//Controls objects
const keyControls = new RonkyGames.KeyControls()
const touchControls = new RonkyGames.PointerControls()

//Load game textures
const textures = {
  background: new Texture("res/images/bg-2.png"),
  spaceship: new Texture("res/images/spaceship.png"),
  building: new Texture("res/images/building.png")
}

//Make a spaceship
const ship = new Sprite(textures.spaceship)
ship.pos = {x:w/2-16,y:h/2-16}
ship.update = function(dt,t){
  // Wobbly ship
  const { scale } = this
  scale.x = Math.abs(Math.sin(t)) + 1
  scale.y = Math.abs(Math.sin(t * 1.33)) + 1
}

//Add everithing to the scene container
  scene.add(new Sprite(textures.background))

const buildings = scene.add(new Container())
const makeRandom = (b, x) => {
  // Place the building at x position, with random scale
  b.scale.x = math.randf(1, 3)
  b.scale.y = math.randf(1, 3)
  b.pos.x = x
  b.pos.y = h-b.scale.y * 64
}

  //Populate buildings and place at a random place from 0 to w
  for(let x = 0; x < 50; x++){
    const b = buildings.add(new Sprite(textures.building))
    makeRandom(b, math.rand(w))
  }

  scene.add(ship)

// call the loop from the game class
game.run(dt => {
  buildings.map(b => {
    b.pos.x -= 100 * dt
    if(b.pos.x < -80){
      makeRandom(b,w)
    }
  })
})


