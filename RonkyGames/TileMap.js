import Container from "./Container.js"
import TileSprite from "./TileSprite.js"

class TileMap extends Container{
  constructor(tiles, mapW, mapH, tileW, tileH, texture){
    super()
    this.mapW = mapW
    this.mapH = mapH
    this.tileW = tileW
    this.tileH = tileH
    this.w = mapW * tileW
    this.h =mapH * tileH 

    // Add all tilesprites
   this.children = tiles.map((frame,i)=>{
     const s = new TileSprite(texture, tileW, tileH)
     s.frame = frame
     s.pos.x = i % mapW * tileW
     s.pos.y = Math.floor(i / mapW) * tileH
     // set visible to false turn true if camera see it
     s.visible = true
     return s
   })
  }

  pixelToMapPos(pos){
    const {tileW, tileH} = this
    return {
      x: Math.floor(pos.x / tileW),
      y: Math.floor(pos.y / tileH)
    }
  }

  mapToPixelPos(mapPos){
    const {tileW, tileH} = this
    return {
      x: mapPos.x * tileW,
      y: mapPos.y * tileH
    }
  }

  tileAtMapPos(mapPos){
    return this.children[mapPos.y * this.mapW + mapPos.x]
  }

  tileAtPixelPos(pos){
    return this.tileAtMapPos(this.pixelToMapPos(pos))
  }

  setFrameAtMapPos(mapPos, frame){
    const tile = this.tileAtMapPos(mapPos)
    tile.frame = frame
    return tile
  }

  setFrameAtPixelPos(pos, frame){
    return this.setFrameAtMapPos(this.pixelToMapPos(pos),frame)
  }

  setVisibleAtMapPos(mapPos,visible = true){
    const tile = this.tileAtMapPos(mapPos)
    tile.visible = visible
    return tile
  }

  setVisibleAtPixelPos(pos,visible = true){
    return this.setVisibleAtMapPos(this.pixelTMapPos(pos),visible)
  }

  tilesAtCorners(bounds, xo = 0, yo = 0){
    return [
      [bounds.x,bounds.y],, // Top left corner
      [bounds.x + bounds.w, bounds.y], // Top right corner
      [bounds.x, bounds.y + bounds.h], // Bottom left corner
      [bounds.x +bounds.w, bounds.y + bounds.h] // Bottom right corner
    ].map(
      ([x,y]) => this.tileAtPixelPos({ // get any element of the original array
        x: x + xo,                      // create an array of tiles respect
        y: y + yo                        // the position given
      })                                // xo, yo are the future offset were entity want walk
    )                                  // must be checked before the walk
  }
  
}

export default TileMap