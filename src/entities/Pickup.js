import Texture from "../../RonkyGames/Texture.js"
import TileSprite from "../../RonkyGames/TileSprite.js"

const texture = new Texture("res/images/bravedigger-tiles.png")

class Pickup extends TileSprite{
  constructor(){
    const tileSize = 48
    super(texture, tileSize, tileSize)
    this.frame = {x: 5,y: 2}
  }
}

export default Pickup