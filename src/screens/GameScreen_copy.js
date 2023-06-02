// import libraries
import Container from "../../RonkyGames/Container.js"
import Camera from "../../RonkyGames/Camera.js"
import TileMap from "../../RonkyGames/TileMap.js"
import math from "../../RonkyGames/utils/math.js"
import entity from "../../RonkyGames/utils/entity.js"


import BravediggerHero from "../entities/BravediggerHero.js"
import Level from "../Level.js"

class GameScreen extends Container{
  constructor(game, controls){
    super()
    // initialization code
    const { w, h } = game
    //Entities

    const map = new Level(w*2,h*2)

    const camera = this.add( 
      new Camera(
        squizz,
        {w: w,h: h},
        {w:level.w, h:level.h} 
      )
    )

    camera.add(map)
    
    // keep references to things we need in upudate
    this.map = level
    this.camera = camera
  }

  update(dt,t){
    super.update(dt,t)
    
  }
}

export default GameScreen