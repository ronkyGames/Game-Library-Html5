import Sprite from "./Sprite.js"
import AnimationManager from "./AnimManager.js"

class TileSprite extends Sprite {
  constructor(texture,w,h){
    super(texture)
    this.tileW = w
    this.tileH = h
    this.w = this.tileW
    this.h = this.tileH
    this.frame = {x:0,y:0}
    this.anims = new AnimationManager(this)
  }

  update(dt){
    this.anims.update(dt)
  }
}

export default TileSprite