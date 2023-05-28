import RonkyGames from "../../RonkyGames/index.js"
const { TileSprite, Texture, math } = RonkyGames
const texture = new Texture("res/images/bravedigger-tiles.png")


class BraveDiggerHero extends TileSprite{
  constructor(controls){
    const tileSize = 48
    super(texture,tileSize,tileSize)
    this.anchor = {x:-tileSize/2, y:-tileSize/2}
    this.pivot = {x: tileSize/2, y: tileSize/2}
    this.speed = 0.15
    // direction of travel
    this.direction = {
      x: 0, // -1,0,1
      y: 0 // -1,0,1
    }
    if(controls) this.controls = controls
    //Animation variable
    this.setAnims()
    this.setIdle()
  }

  setAnims(){
    const {anims} = this
    anims.add("walk", [0,1,2,3,4].map(x => ({x,y:0})),0.07)
    anims.add("idle", [{x:0,y:4}, {x:0,y:5}],1)
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
      this.pos.y = Math.round(this.pos.y / tileSize)*tileSize // snap to a grid
      if(x == 0){
        this.pos.x = Math.round(this.pos.x / tileSize)*tileSize // snap to a grid
      }
    }else if( y !== this.direction.y ){
      // change to vertical movement
      this.direction.x = 0
      this.direction.y = y
      this.pos.x = Math.round(this.pos.x / tileSize)*tileSize // snap to a grid
      if(y == 0){
        this.pos.y = Math.round(this.pos.y / tileSize)*tileSize // snap to a grid
      }
    }
    
  }

  setOrientation(){
    // right
    if(this.direction.x == 1){
      this.rotation = 0
      this.scale.x = 1
      this.scale.y = 1
    }else if(this.direction.x == -1){
      this.rotation = 0
      this.scale.x = -1
      this.scale.y = 1
    }else if(this.direction.y == 1){
      this.rotation = 90
      this.scale.x = 1
      this.scale.y = 1
    }else if(this.direction.y == -1){
      this.rotation = 180
      this.scale.x = -1
      this.scale.y = 1
    }
  }

  update(dt,t){
    super.update(dt)
    const {pos, speed,tileSize, rate, frames} = this
    if(this.controls) this.moveControls()
    this.setOrientation()
    //movement handling
    pos.x += this.direction.x*dt*(tileSize/speed)
    pos.y += this.direction.y*dt*(tileSize/speed)
  }
}

export default BraveDiggerHero