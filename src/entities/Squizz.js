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
      x: 0, // -1,0,1
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
  moveControls(){
    const {x, y} = this.controls
    if( x !== this.direction.x ){ // using && x movement is continue because check if x != 0 so if the user has released the key this has not effect, if we want to move only when the user press the keys remove && x and && y
      // change to horizontal movement 
      this.direction.x = x
      this.direction.y = 0
      this.pos.y = Math.round(this.pos.y / 32)*32 // snap to a grid
      if(x == 0){
        this.pos.x = Math.round(this.pos.x / 32)*32 // snap to a grid
      }
    }else if( y !== this.direction.y ){
      // change to vertical movement
      this.direction.x = 0
      this.direction.y = y
      this.pos.x = Math.round(this.pos.x / 32)*32 // snap to a grid
      if(y == 0){
        this.pos.y = Math.round(this.pos.y / 32)*32 // snap to a grid
      }
    }
    
  }

  setFrame(){
    // right
    if(this.direction.x == 1){
      this.frame.x = 1
      this.frame.y = 0
    }else if(this.direction.x == -1){
      this.frame.x = 3
      this.frame.y = 0
    }else if(this.direction.y == 1){
      this.frame.x = 2
      this.frame.y = 0
    }else if(this.direction.y == -1){
      this.frame.x = 0
      this.frame.y = 0
    }
  }

  update(dt,t){
    super.update(dt)
    const {pos, speed, rate, frames} = this
    this.moveControls()
    this.setFrame()
    //movement handling
    pos.x += this.direction.x*dt*(32/speed)
    pos.y += this.direction.y*dt*(32/speed)
  }
}

export default Squizz