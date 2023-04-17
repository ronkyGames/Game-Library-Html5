import RonkyGames from "../../RonkyGames/index.js"
const { TileSprite, Texture, math } = RonkyGames
const texture = new Texture("res/images/player-walk.png")


class Squizz extends TileSprite{
  constructor(){
    super(texture,32,32)
    this.anchor = {x:-16, y:-16}
    this.speed = math.rand(20,100)
    //Animation variable
    this.setAnims()
    this.setWalk()
  }

  setAnims(){
    const {anims} = this
    anims.add("walk", [0,1,2,3].map(x => ({x,y:0})),0.07)
    anims.add("idle", [{x:0,y:0}, {x:4,y:0}, {x:4,y:1}, {x:4,y:0}],0.15)
  }

  setWalk(){
    const {anims} = this
    anims.play("walk")
  }

  setIdle(){
    const {anims} = this
    anims.play("idle")
  }

  update(dt,t){
    super.update(dt)
    const {pos, speed, rate, frames} = this
    //movement handling
    pos.x += speed*dt
  }
}

export default Squizz