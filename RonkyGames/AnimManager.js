// Inner class used only by AnimManager
class Anim{
  constructor(frames,rate){
    this.frames = frames
    this.rate = rate
    this.reset()
  }

  reset(){
    this.frame = this.frames[0]
    this.curFrame = 0
    this.curTime = 0
  }

  update(dt){
    const {rate, frames} = this
    if((this.curTime += dt ) > rate){
      this.curFrame++
      this.curFrame %= frames.length
      this.frame = frames[this.curFrame]
      this.curTime -= rate
    }
  }
}

// Class that manage the Animations
class AnimationManager{
  constructor(entity){
    this.anims = {}
    this.running = false
    this.frameSource = entity.frame || entity
    this.current = null
  }
  
  add(name, frames,speed){
    this.anims[name] = new Anim(frames, speed)
    return this.anims[name]
  }
  
  update(dt){
    const {current, anims, frameSource} = this
    if(!current){
      return
    }
    const anim = anims[current]
    anim.update(dt)

    // Sync the TileSprite frame
    frameSource.x = anim.frame.x
    frameSource.y = anim.frame.y
  }
  
  play(anim){
    const {current, anims} = this
    if(anim === current){
      return
    }
    this.current = anim
    anims[anim].reset()
  }
  
  stop(){
    this.current = null
  }
}

export default AnimationManager