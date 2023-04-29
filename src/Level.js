import RonkyGames from "../RonkyGames/index.js"
const {Texture, TileMap, math} = RonkyGames

const texture = new Texture("res/images/tiles.png")

class Level extends TileMap{
  constructor(w,h){
    // tile map setup
    const tileSize = 32
    const mapW = Math.floor(w / tileSize)
    const mapH = Math.floor(h / tileSize)

    //make a random level of tile indexes
    const level = []
    for(let y = 0; y < mapH; y++){
      for(let x = 0; x < mapW; x++){
        if(x == 0){
          level.push({
            x:1,
            y:1
          })
        }else if(x == mapW-1){
          level.push({
            x:3,
            y:1
          })
        }else if(y == 0){
          level.push({
            x:2,
            y:1
          })
        }else if(y == mapH-2){
          level.push({
            x:4,
            y:1
          })
        }else if(y== mapH-1){
          level.push({
            x:2,
            y:1
          })
        }else{
          level.push({
            x:math.rand(1,5),
            y:0
          })
        }
      }
    }

    super(level, mapW, mapH, tileSize, tileSize, texture)

    this.bounds = {
      left: tileSize,
      right: w - tileSize * 2,
      top: tileSize,
      bottom: h - tileSize * 2
    }
    
  }
}

export default Level