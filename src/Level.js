import RonkyGames from "../RonkyGames/index.js"
const {Texture, TileMap, math} = RonkyGames

const texture = new Texture("res/images/bravedigger-tiles.png")

const tileIndexes = [
  {id: 'empty', x:0, y:2},
  {id: 'wall', x:2, y:2},
  {id: 'wall_end', x:3,y:2}
]

class Level extends TileMap{
  constructor(w,h){
    // tile map setup
    const tileSize = 48
    const mapW = Math.floor(w / tileSize)
    const mapH = Math.floor(h / tileSize)
    

    // make an empty array of dimensions of maps the entire map refer 
    // to the first tileIndexes
    const levelIndex = Array(mapW*mapH).fill(0)

    // make a random dungeon
    for(let y= 0; y< mapH; y++){
      for(let x = 0; x < mapW; x++){
        // Define the dungeon walls
        levelIndex[y * mapW + x] = math.randOneFrom([0,0,1])
      }
    }
    
    // trasform the level array in array of tileIndexes 
    // to be used by canvas renderer
    const level = levelIndex.map(i=> tileIndexes[i])
    

    super(level, 
          mapW, mapH, 
          tileSize, tileSize, 
          texture)

    this.bounds = {
      left: tileSize,
      right: w - tileSize * 2,
      top: tileSize * 2,
      bottom: h - tileSize * 3
    }
    
  }

  checkGround(pos){
    const {blank, lastTile} = this
    const tile = this.tileAtPixelPos(pos)
    if(lastTile == tile){
      return "checked"
    }
    this.lastTile = tile
    if(tile.frame !== blank ){
      this.setFrameAtPixelPos(pos, blank)
      return "solid"
    }
    return "cleared"
  }
}

export default Level