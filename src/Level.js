import RonkyGames from "../RonkyGames/index.js"
const {Texture, TileMap, math} = RonkyGames

const texture = new Texture("res/images/bravedigger-tiles.png")

const tileIndexes = [
  {id: 'empty', x:0, y:2, walkable: true},
  {id: 'wall', x:2, y:2, walkable: false},
  {id: 'wall_end', x:3,y:2, walkable: false}
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
        // 1. Map borders
        if(y === 0 || x === 0 || y === mapH - 1 || x === mapW - 1){
          levelIndex[math.indexPosition(x,y,mapW)]  =  1
          continue
        } 
        // 2. Grid Points - randomly skip some to make 'rooms'
        if(y % 2 || x % 2 || math.randOneIn(4)){
          continue // don't draw a wall
        }

        // 3. Side Walls - pick a random direction
        const [x0,y0] = math.randOneFrom([[0,-1],[0,1],[1,0],[-1,0]])
        levelIndex[math.indexPosition(x+x0,y+y0,mapW)] = 1
        levelIndex[math.indexPosition(x,y,mapW)] = 1
      }
    }

    // check if below of a wall is empty in this case the cell is substituted by wall-end
    for(let y = 0; y < mapH ; y++){
      for(let x = 0; x < mapW; x++){
          if(levelIndex[math.indexPosition(x,y,mapW)] == 1){
            if(math.indexPosition(x,y+1,mapW) < levelIndex.length){
              if(levelIndex[math.indexPosition(x,y+1,mapW)] == 0) levelIndex[math.indexPosition(x,y,mapW)] = 2
              continue
            }
            else{
              levelIndex[math.indexPosition(x,y,mapW)] = 2
              continue
            }
          }        
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