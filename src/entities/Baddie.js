import RonkyGames from "../../RonkyGames/index.js"
const { TileSprite, Texture, math } = RonkyGames
const texture = new Texture("res/images/baddie-walk.png")

class Baddie extends TileSprite{
  constructor(xSpeed,ySpeed){
    super(texture, 32, 32)
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
  }

  update(dt){
    const {pos, xSpeed, ySpeed} = this
    pos.x += xSpeed*dt
    pos.y += ySpeed*dt
  }
}

export default Baddie