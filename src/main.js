// import libraries
import RonkyGames from "../RonkyGames/index.js"
// all screens
import Level from "./Level.js"

const {Game, KeyControls, Container, math, entity} = RonkyGames

// Game setup. code
const game = new Game(640,320)
const {scene, w, h} = game
// controls
const controls = new KeyControls()
const level = new Level(w,h)
scene.add(level)
//entities

game.run(()=>{
  
})