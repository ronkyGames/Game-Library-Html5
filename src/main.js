
// import library
import Game from "../RonkyGames/Game.js"
import KeyControls from "../RonkyGames/controls/KeyControls.js"

// import Screens
import GameScreen from "./screens/GameScreen.js"

// Game setup. code
const game = new Game(640,480)

const controls = new KeyControls()

const gameScreen = new GameScreen(game,controls)

game.scene.add(gameScreen)

game.run(()=>{
  
})
