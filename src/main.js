
// import library
import Game from "../RonkyGames/Game.js"
import KeyControls from "../RonkyGames/controls/KeyControls.js"

console.log('start')

// import level
import Level from "./Level.js"

// Entities
import BraveDiggerHero from "./entities/BraveDiggerHero.js"

// Game setup. code
const game = new Game(640,640)
const {scene, w, h} = game
// controls
const controls = new KeyControls()

// create level
const level = new Level(w,h)
scene.add(level)

//entities
const hero = new BraveDiggerHero(controls, level)
scene.add(hero)

game.run(()=>{
  
})
