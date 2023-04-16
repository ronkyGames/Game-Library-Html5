import RonkyGames from "../../RonkyGames/index.js"
const { TileSprite, Texture, math } = RonkyGames
const texture = new Texture("res/images/player-walk.png")


class Squizz extends TileSprite{
  constructor(){
    super(texture,32,32)
    this.anchor = {x:-16, y:-16}
    //Animation variable
    this.rate = 0.1
    this.currentTime = 0
    this.currentFrame = 0
    this.frames = [
      {x:0, y:0},
      {x:1, y:0},
      {x:2, y:0},
      {x:3, y:0}
    ]
    this.frame = this.frames[this.currentFrame]
    this.speed = math.rand(20,100)
  }

  update(dt,t){
    const {pos, speed, rate, frames} = this
    
    this.currentTime +=dt
    if(this.currentTime > rate){
      this.frame = frames[this.currentFrame++ % frames.length]
      this.currentTime -= rate
    }
    //movement handling
    pos.x += speed*dt
  }
}

export default Squizz