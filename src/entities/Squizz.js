import RonkyGames from "../../RonkyGames/index.js"
const { TileSprite, Texture, math } = RonkyGames
const texture = new Texture("res/images/player-walk.png")


class Squizz extends TileSprite{
  constructor(controls){
    super(texture,32,32)
    this.anchor = {x:0, y:0}
    this.speed = 0.15
    // direction of travel
    this.direction = {
      x: 1, // -1,0,1
      y: 0 // -1,0,1
    }
    this.controls = controls
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

  //controls
  controls(){
    const {x, y} = this.controls
    if(x && x !== this.direction.x){
      // change to horizontal movement 
    }else if(y && y !== this.direction.y ){
      // change to vertical movement
    }
  }

  update(dt,t){
    super.update(dt)
    const {pos, speed, rate, frames} = this
    //movement handling
    //pos.x += speed*dt
  }
}

export default Squizz