import Sprite from "./Sprite.js"
import AnimationManager from "./AnimManager.js"

class TileSprite extends Sprite {
  constructor(texture,w,h){
    super(texture)
    this.tileW = w
    this.tileH = h
    this.frame = {x:0,y:0}
    this.anims = new AnimationManager(this)
  }
}

export default TileSprite