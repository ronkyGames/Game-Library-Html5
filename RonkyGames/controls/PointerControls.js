class PointerControls{
  constructor(container){
    this.el = container || document.body
    // state variable
    this.pos= {x:0, y:0}
    this.isDown = false
    this.pressed = false
    this.released = false
    // Handlers
    // mouse 
    document.addEventListener("mousemove",e =>this.move(e),false)
    document.addEventListener("mousedown",e =>this.down(e),false)
    document.addEventListener("mouseup",e =>this.up(e),false)
    // touch
    document.addEventListener("touchstart", e => this.down(e,true),false)
    document.addEventListener("touchend", e => this.up(e,true),false)
    document.addEventListener("touchmove", e => this.move(e,true), false)
  }

  // Action
  move(e,isTouch=false){
    this.pointerPosFromEvent(e,isTouch)
  }

  down(e,isTouch=false){
    this.isDown = true
    this.pressed = true
    this.pointerPosFromEvent(e)
  }

  up(){
    this.isDown = false
    this.released = true
  }

  update(){
    this.released = false
    this.pressed = false
  }

  pointerPosFromEvent(e,isTouch){
    if(isTouch){
      if(!e.touches || !e.touches.lenght){
        return
      }
      e.preventDefault()
    }
    const {clientX, clientY} = isTouch ? e.touches[0] : e

    // Calculations to set pos.x pos.y
    const {el,pos} = this
    const rect = el.getBoundingClientRect()
    const xr = el.width/el.clientWidth
    const yr = el.height/el.clientHeight

    pos.x = (clientX - rect.left) * xr
    pos.y = (clientY - rect.top) * yr
  }

}

export default PointerControls