import Container from "./Container.js"
import math from "./utils/math.js"

class Camera extends Container{
  constructor(subject, viewport, worldSize = viewport){
    super()
    this.w = viewport.w // width of the game screen
    this.h = viewport.h // height of the game screen
    this.worldSize = worldSize // object with w,h is the size of the entire world
    this.setSubject(subject) // what the camera must follow
  }

  setSubject(e){
    this.subject = e ? e.pos || e : this.pos
    this.offset = {x:0,y:0}

    // center on the entity
    if( e && e.w){
      this.offset.x += e.w/2
      this.offset.y += e.h/2
    }
    if(e && e.anchor){
      this.offset.x -= e.anchor.x
      this.offset.y -= e.anchor.y
    }
  }
  
  
  focus(){
    const {pos, w, h, worldSize, subject, offset } = this

    // set the center of the camera the subject + the offset
    const centeredX = subject.x + offset.x - w/2
    const centeredY = subject.y + offset.y - h/2
    // prevent to include te external blank world
    const maxX = worldSize.w - w
    const maxY = worldSize.h - h
    const x = -math.clamp(centeredX, 0, maxX)
    const y = -math.clamp(centeredY, 0, maxY)

    pos.x = x
    pos.y = y
    
  }
  
  update(dt,t){
    super.update(dt,t) // this is important!!!
    
    if(this.subject){
      this.focus()
    }
  }
}

export default Camera