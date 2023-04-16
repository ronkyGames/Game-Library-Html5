// import libraries
import RonkyGames from "../RonkyGames/index.js"
import Squizz from "./entities/Squizz.js"

const {Game, Container, Texture, TileSprite, math} = RonkyGames

//Game setup. code
const game = new Game(640,320)
const { scene, w, h } = game

//Controls objects
const keyControls = new RonkyGames.KeyControls()
const touchControls = new RonkyGames.PointerControls()

//Animation
const balls = scene.add(new Container())
for(let i = 0; i < 100; i++){
  const squizz =balls.add(new Squizz())
  squizz.pos.x = math.rand(w)
  squizz.pos.y = math.rand(h)
}

game.run()







