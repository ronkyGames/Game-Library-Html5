import TileSprite from "../../RonkyGames/TileSprite.js"
import Texture from "../../RonkyGames/Texture.js"
import entity from "../../RonkyGames/utils/entity.js"
import deadInTracks from "../../RonkyGames/movement/deadInTracks.js"

const texture = new Texture("res/images/bravedigger-tiles.png")

class BraveDiggerHero extends TileSprite{
  constructor(controls, map){
    const tileSize = 48
    super(texture,tileSize,tileSize)
    this.anchor = {x:0, y:0}
    this.pivot = {x: tileSize/2, y: tileSize/2}
    this.speed = 0.15
    this.map = map
    this.pos = map.initialPosition
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
    
    if( x !== this.direction.x ){ // using && x movement is continue because check if x != 0 so if the user has released the key this has not effect, if we want to move only when the user press the keys remove && x and && y
      // change to horizontal movement
      this.snapToGrid()
      this.direction.x = x
      this.direction.y = 0
    }else if( y !== this.direction.y ){
      // change to vertical movement
      this.snapToGrid()
      this.direction.x = 0
      this.direction.y = y
    }
  }

  snapToGrid(){
    const {x, y} = this.controls
    const {tileW, tileH} = this
    if( this.direction.x !== 0){
      this.pos.y = Math.round(this.pos.y / tileH)*tileH
      if( x == 0) this.pos.x = Math.round(this.pos.x / tileW)*tileW
    }else if(this.direction.y !== 0){
      this.pos.x = Math.round(this.pos.x/tileW)*tileW
      if(y == 0) this.pos.y = Math.round(this.pos.y/tileH)*tileH
    }
  }

  setOrientation(){
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
      const {anchor,scale} = entity.flipX(this,false)
      this.rotation = -90
      this.anchor = anchor
      this.scale = scale
    }
  }

  update(dt,t){
    super.update(dt)
    const {pos, map, speed, tileW, tileH} = this
    if(this.controls) {
      this.moveControls()
      this.snapToGrid()
    }
    // set animation 
    const walk = this.setWalk()
    if(!walk) this.setIdle()
    
    this.setOrientation()
    //offset of the future position
    const xo = this.direction.x*dt*(tileW/speed)
    const yo = this.direction.y*dt*(tileH/speed)

    // can we move to this position
    const ds = deadInTracks(this, map, xo, yo)
    pos.x += ds.x
    pos.y += ds.y
  }
}

export default BraveDiggerHero