// import libraries
import RonkyGames from "../RonkyGames/index.js"
// all screens
import LogoScreen from "./screens/LogoScreen.js"
import TitleScreen from "./screens/TitleScreen.js"
import GameScreen from "./screens/GameScreen.js"
//import GameOverScreen from "./screen/GameOverScreen.js"


const {Game, KeyControls, math} = RonkyGames

// Game setup. code
const game = new Game(640,640)
// controls
const controls = new KeyControls()

function titleScreen(){
  game.scene = new TitleScreen(game, controls, newGame)
}

function gameOverScreen(result){
  game.scene = new GameOverScreen(game, controls, result, titleScreen)
}

function newGame(){
  game.scene = new GameScreen(game, controls, gameOverScreen)
}

function log(){
  console.log("Screen started!")
}

game.scene = new LogoScreen(game, titleScreen)

game.run()