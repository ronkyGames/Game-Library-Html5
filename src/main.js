// import libraries
import RonkyGames from "../RonkyGames/index.js"
import GameScreen from "./screens/GameScreen.js"


const {Game, KeyControls} = RonkyGames

// Game setup. code
const game = new Game(640,320)
// controls
const controls = new KeyControls()

game.scene = new GameScreen(game,controls)

game.run()