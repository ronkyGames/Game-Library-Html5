// import libraries
import RonkyGames from "../RonkyGames/index.js"
import Squizz from "./entities/Squizz.js"
import Level from "./Level.js"


const {Game, PointerControls, KeyControls, Container, Texture, TileMap, math} = RonkyGames

// Game setup. code
const game = new Game(640,320)
const { scene, w, h } = game
// controls
const pointer = new PointerControls(game.renderer.view)
const controls = new KeyControls()

const level = new Level(w,h)
scene.add(level)

game.run(()=>{
})







