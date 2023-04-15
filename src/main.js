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
const squizz = new Squizz()
scene.add(squizz)

game.run((dt,t)=>{
  squizz.frame.x = Math.floor(t/0.1) %4
})







