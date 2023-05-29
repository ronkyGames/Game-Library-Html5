import RonkyGames from "../../RonkyGames/index.js"
const { TileSprite, Texture, math, entity} = RonkyGames
const texture = new Texture("res/images/bravedigger-tiles.png")


class BraveDiggerHero extends TileSprite{
  constructor(controls){
    const tileSize = 48
    super(texture,tileSize,tileSize)
    this.anchor = {x:0, y:0}
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
    anims.add("idle", [{x:4,y:0}, {x:5,y:0}],1)
  }

  setWalk(){
    const {anims} = this
    if(this.direction.x != 0 || this.direction.y != 0){ 
      anims.play("walk")
      return true
    }else{
      return false
    }
  }

  setIdle(){
    const {anims} = this
    anims.play("idle")
  }

  //controls
  moveControls(){
    const {x, y} = this.controls
    const {tileW, tileH} = this
    if( x !== this.direction.x ){ // using && x movement is continue because check if x != 0 so if the user has released the key this has not effect, if we want to move only when the user press the keys remove && x and && y
      // change to horizontal movement 
      this.direction.x = x
      this.direction.y = 0
      this.pos.y = Math.round(this.pos.y / tileH)*tileH // snap to a grid
      if(x == 0){
        this.pos.x = Math.ceil(this.pos.x / tileW)*tileW // snap to a grid
      }
    }else if( y !== this.direction.y ){
      // change to vertical movement
      this.direction.x = 0
      this.direction.y = y
      this.pos.x = Math.round(this.pos.x / tileW)*tileW // snap to a grid
      if(y == 0){
        this.pos.y = Math.ceil(this.pos.y / tileH)*tileH // snap to a grid
      }
    }
    
  }

  setOrientation(w){
    // right
    if(this.direction.x == 1){
      const {anchor,scale} = entity.flipX(this,false) 
      this.anchor = anchor
      this.rotation = 0
      this.scale = scale
    }else if(this.direction.x == -1){
      this.anchor = entity.flipX(this,true).anchor
      this.rotation = 0
      this.scale = entity.flipX(this,true).scale
    }else if(this.direction.y == 1){
      const {anchor,scale} = entity.flipX(this,false) 
      this.rotation = 90
      this.anchor = anchor
      this.scale = scale
    }else if(this.direction.y == -1){
      this.rotation = -90
      this.scale.x = 1
      this.scale.y = 1
    }else{
      this.anchor = {x:0,y:0}
    }
  }

  update(dt,t){
    super.update(dt)
    const {pos, speed, tileW, tileH} = this
    if(this.controls) this.moveControls()
    // set animation 
    const walk = this.setWalk()
    if(!walk) this.setIdle()
    
    this.setOrientation(tileW)
    //movement handling
    pos.x += this.direction.x*dt*(tileW/speed)
    pos.y += this.direction.y*dt*(tileH/speed)
    
  }
}

export default BraveDiggerHero