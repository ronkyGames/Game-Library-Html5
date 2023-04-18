// import libraries
import RonkyGames from "../RonkyGames/index.js"
import Squizz from "./entities/Squizz.js"

const {Game, PointerControls, Container, Texture, TileMap, math} = RonkyGames

// Game setup. code
const game = new Game(640,320)
const { scene, w, h } = game
// controls
const pointer = new PointerControls(game.renderer.view)

//Test TileMap
const texture = new Texture("res/images/tiles.png")
const tileSize = 32
const mapW = Math.floor(w / tileSize)
const mapH = Math.floor(h / tileSize)

//Make a random level of tile indexes
const level = []
for(let y = 0; y < mapH; y++){
  for(let x = 0; x < mapW; x++){
    level.push({
      x: math.rand(5),
      y: math.rand(2)
    })
  }
}

const map = new TileMap(level, mapW, mapH, tileSize, tileSize, texture)
scene.add(map)

game.run(()=>{
})







