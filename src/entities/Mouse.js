import RonkyGames from "../../RonkyGames/index.js"
const { Sprite, Texture, math } = RonkyGames
const texture = new Texture("res/images/mouse.png")

class Mouse extends Sprite{
  constructor(controls){
    super(texture)
    this.w = 150
    this.h = 51
    // mantains the bounds of the collision area relative to the position of the Sprite itself.
    this.hitBow = {
      x: 18,
      y: 8,
      w: 70,
      h:35
    }
    this.controls = controls
  }

  update(dt){
    const {pos,controls} = this
    const { x, y} = controls
    const speed = 100
    pos.x += x*dt*speed
    pos.y += y*dt*speed
  }
}
export default Mouse