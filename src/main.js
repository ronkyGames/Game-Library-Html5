// import libraries
import RonkyGames from "../RonkyGames/index.js"
// all screens
import Level from "./Level.js"

// Entities
import BraveDiggerHero from "./entities/BraveDiggerHero.js"

const {Game, KeyControls, Container, math, entity} = RonkyGames

// Game setup. code
const game = new Game(640,640)
const {scene, w, h} = game
// controls
const controls = new KeyControls()

// create level
const level = new Level(w,h)
scene.add(level)

//entities
const hero = new BraveDiggerHero(controls)
scene.add(hero)

game.run(()=>{
  
})