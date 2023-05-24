// import libraries
import RonkyGames from "../../RonkyGames/index.js"

const {Game,Sprite, Container, Texture} = RonkyGames

const texture = new Texture("/res/images/logo.png")

class LogoScreen extends Container{
  constructor(game, onDone){
    super()
    this.onDone = onDone // a function that is called in update
    this.life = 2 // seconds to show logo
    const logo = this.add(new Sprite(texture))
    logo.anchor = {x:-200,y:-100}
    logo.pos = {x: game.w/2, y:game.h/2} 
  }

  update(dt,t){
    super.update(dt,t)
    this.life -= dt
    if(this.life < 0){
      this.onDone()
    }
  }
}

export default LogoScreen