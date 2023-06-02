// import library
import Container from "../../RonkyGames/Container.js"
import Camera from "../../RonkyGames/Camera.js"
import TileMap from "../../RonkyGames/TileMap.js"
import math from "../../RonkyGames/utils/math.js"
import entity from "../../RonkyGames/utils/entity.js"

//maps
import Level from "../Level.js"
//entities
import BraveDiggerHero from "../entities/BraveDiggerHero.js"
class GameScreen extends Container{
  constructor(game, controls){
    super()
    // initialization code
    const {w, h} = game
    //map
    const map = new Level(w*2,h*2) 
    //Entities
    const hero = new BraveDiggerHero(controls,map)

    // add camera centered on player
    const camera = this.add(
      new Camera(
        hero,
        {w:w,h:h},
        {w:map.w, h:map.h}
      )
    )

    camera.add(map)
    camera.add(hero)
    
  }
}

export default GameScreen