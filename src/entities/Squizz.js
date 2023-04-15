import RonkyGames from "../../RonkyGames/index.js"
const { TileSprite, Texture } = RonkyGames
const texture = new Texture("res/images/player-walk.png")


class Squizz extends TileSprite{
  constructor(){
    super(texture,32,32)
  }

  update(dt,t){
    this.frame.x = Math.floor(t/0.1) % 4
  }
}

export default Squizz