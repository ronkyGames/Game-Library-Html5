// import libraries
import RonkyGames from "../../RonkyGames/index.js"
import Squizz from "../entities/Squizz.js"
import Baddie from "../entities/Baddie.js"
import Level from "../Level.js"

const {Container, Camera, TileMap, math, entity} = RonkyGames

class GameScreen extends Container{
  constructor(game, controls){
    super()
    // initialization code
    const { w, h } = game
    const unit = math.setUnit(w,h,20)
    //Entities
    const squizz = new Squizz(controls)
    squizz.setIdle()

    const level = new Level(w*2,h*2)

    squizz.pos = level.startPos

    //Add Baddies
    const baddies = this.addBaddies(level)

    const camera = this.add( 
      new Camera(
        squizz,
        {w: w,h: h-3*unit},
        {w:level.w, h:level.h} 
      )
    )

    
    

    camera.add(level)
    camera.add(squizz)
    camera.add(baddies)

    // 
    
    // keep references to things we need in upudate
    this.level = level
    this.camera = camera
    this.squizz = squizz
    this.baddies = baddies

    
  }

  addBaddies(level){
    const baddies = new Container()
    // horizontal bad guys
    for(let i = 0; i < 5; i++){
      const b = baddies.add(new Baddie(32*5,0))
      b.pos.y = Math.floor(level.h/5)*i + level.tileH * 2
    }

    // vertical bad guys
    for(let i = 0; i < 10; i++){
      const b = baddies.add(new Baddie(0, 32*5))
      b.pos.x = Math.floor(level.w / 10)*1+level.tileW
    }
    return baddies
  }

  updateBaddies(){
    const {squizz, level} = this
    this.baddies.map(b => {
      const { pos } = b
      if(entity.distance(squizz,b) < 32){
        // A hit
        squizz.dead = true

        // Send off screen for a bit
        if(b.xSpeed) pos.x = -level.w
        else pos.y = -level.h
      }

      // Screen Wrap
      if(pos.x > level.w) pos.x = -32
      if(pos.y > level.h) pos.y = -32
    })
  }

  update(dt,t){
    super.update(dt,t)
    
    //Game Screen Update Code
    const {squizz, level} = this
    const {pos} = squizz
    const { bounds : {top,bottom,left, right}} = level
    const centerPos = entity.center(squizz)
    this.updateBaddies()
  
    // Confine player pos to the bounds area
    pos.x = math.clamp(pos.x, left, right)
    pos.y = math.clamp(pos.y, top,bottom)
  
    const ground = this.level.checkGround(entity.center(squizz))
    if(ground === "cleared"){
      squizz.dead = true
    }
  }
}

export default GameScreen