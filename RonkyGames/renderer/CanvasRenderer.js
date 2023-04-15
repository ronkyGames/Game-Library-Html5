class CanvasRenderer{
  constructor(w,h){
    const canvas = document.createElement("canvas")
    this.w = canvas.width = w
    this.h = canvas.height = h
    this.view = canvas
    this.ctx = canvas.getContext("2d")
  }

  render(container, clear = true){
    const {ctx} = this
    function renderRec(container){
      // Render the container children
      container.children.forEach(child => {
        if(child.visible == false){
          return
        }
        ctx.save() // save context options to the default
        // Draw the leaf node
        //child properties
        if(child.pos){
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y))
        }
        if(child.anchor){
          ctx.translate(Math.round(child.anchor.x), Math.round(child.anchor.y))
        }
        if(child.scale){
          ctx.scale(child.scale.x,child.scale.y)
        }
        if(child.rotation){
          const px = child.pivot ? child.pivot.x : 0
          const py = child.pivot ? child.pivot.y : 0
          ctx.translate(px,py) // translate to the pivot point
          ctx.rotate(child.rotation)
          ctx.translate(-px,-py) // return to the previous point
        }
        //child types
        if(child.text){
          const {font, fill, align} = child.style
          if(font) ctx.font = font
          if(fill) ctx.fillStyle = fill
          if(align) ctx.textAlign = align
          ctx.fillText(child.text,0,0)
        }
        else if(child.texture){
          const img = child.texture.img
          if(child.tileW){
            ctx.drawImage(
              img,
              child.frame.x*child.tileW, // source x
              child.frame.y*child.tileH, // source y
              child.tileW, child.tileH, // width and height
              0,0, // destination x,y
              child.tileW, child.tileH // destination width and height
            )
          }else{
          ctx.drawImage(img, 0, 0)
          }
        }
        //Handle the child types
        if(child.children){
          renderRec(child)
        }
        ctx.restore() // restore to default options to not affect the others children of the container
      })
    }
    if(clear){
      ctx.clearRect(0,0,this.w,this.h)
    }
    renderRec(container)
  }
  
}

export default CanvasRenderer