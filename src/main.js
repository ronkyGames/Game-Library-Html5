// import libraries
import RonkyGames from "../RonkyGames/index.js"

const {Game, Container, Text, Texture, Sprite, TileSprite, math} = RonkyGames

//Game setup. code
const game = new Game(640,320)
const { scene, w, h } = game

//Controls objects
const keyControls = new RonkyGames.KeyControls()
const touchControls = new RonkyGames.PointerControls()

//Load game textures
const textures = {
  tileSprite: new Texture("res/images/player-walk.png")
}

//Animation
const squizz = new TileSprite(textures.tileSprite,32,32)
scene.add(squizz)

game.run((dt,t)=>{
  squizz.frame.x = Math.floor(t/0.1) %4
})







