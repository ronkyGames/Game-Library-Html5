// import libraries
import RonkyGames from "../RonkyGames/index.js"
import Squizz from "./entities/Squizz.js"

const {Game, PointerControls, Container, Texture, TileSprite, math} = RonkyGames

// Game setup. code
const game = new Game(640,320)
const { scene, w, h } = game
// controls
const pointer = new PointerControls(game.renderer.view)

//Populate of squizz
const balls = scene.add(new Container())
for(let i = 0; i < 100; i++){
  const squizz =balls.add(new Squizz())
  squizz.pos.x = math.rand(w)
  squizz.pos.y = math.rand(h)
}



game.run(()=>{
  //Game Logic
  const {pressed, pos} = pointer
  
  balls.map(b => {
    if(b.pos.x > w){
      b.pos.x = -32
      b.speed *= 1.1
    }
    //check for collision
    if(pressed && math.distance(pos, b.pos) < 16){
      if(b.speed > 0 ){
        b.speed = 0
      }else{
        b.dead = true
      }
    }
  })
  pointer.update()
})







