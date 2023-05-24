// import libraries
import RonkyGames from "../../RonkyGames/index.js"
import Squizz from "../entities/Squizz.js"
import Baddie from "../entities/Baddie.js"
import Level from "../Level.js"

const {Game,TileSprite, Container, Texture,Text, math} = RonkyGames

const texture = new Texture("res/images/tiles.png")

class TitleScreen extends Container{
  constructor(game, controls, onStart){
    super()
    this.onStart = onStart
    this.controls = controls
    controls.reset()

    //set unit of measure
    this.unit = math.setUnit(game.w, game.h, 20)
    //define the center
    this.center = {
      x: game.w/2,
      y: game.h/2
    }

    this.title = this.addMsg("SQUIZZY!",{x: this.center.x, y:2*this.unit}, 2*this.unit, "center")

    this.description1 = this.addMsg("Remove the ground moving around.", {x:this.center.x,y:3.5*this.unit}, 0.7*this.unit, "center")
    this.description1 = this.addMsg("Beware enemies and holes!", {x:this.center.x,y:4.5*this.unit}, 0.7*this.unit, "center")
    this.action = this.addMsg("Press Space To Play!",{x:this.center.x, y:6*this.unit},this.unit, "center")

    this.groundTile = this.addTile(texture,{x:1,y:0},{x:this.center.x-2*this.unit,y:7*this.unit})
    
    this.ground = this.addMsg("The Ground", {x:this.center.x+this.unit,y:8*this.unit-0.2*this.unit}, 0.6*this.unit)

    this.wallTile1 = this.addTile(texture,{x:1,y:1},{x:this.center.x-3*this.unit,y:9*this.unit})

    this.wallTile2 = this.addTile(texture,{x:4,y:1},{x:this.center.x-this.unit,y:9*this.unit})

    this.wall = this.addMsg("The Wall", {x:this.center.x+this.unit,y:10*this.unit-0.2*this.unit}, 0.6*this.unit)

    this.squizz = this.addSquizz({x:this.center.x-2*this.unit,y:11*this.unit})

    this.player = this.addMsg("You", {x:this.center.x+this.unit,y:12*this.unit-0.2*this.unit}, 0.6*this.unit)

    this.baddie = this.addBaddie({x:this.center.x-2*this.unit,y:13*this.unit})

    this.enemy = this.addMsg("Your Enemy", {x:this.center.x+this.unit,y:14*this.unit-0.2*this.unit}, 0.6*this.unit)

    this.holeTile = this.addTile(texture,{x:0,y:0},{x:this.center.x-2*this.unit,y:15*this.unit})

    this.hole = this.addMsg("The Hole", {x:this.center.x+this.unit,y:16*this.unit-0.2*this.unit}, 0.6*this.unit)
    
  }

  addMsg(msg,pos,size,align = ""){
    const text = new Text(
      msg,
      {
        font:`${size}px 'Quicksand'`,
        fill: `#000000`
      }
    )
    if(align){
      text.style.align = align
    }
    text.pos = pos
    return this.add(text)
  }

  addSquizz(pos){
    const squizz = new Squizz()
    squizz.pos = pos
    return this.add(squizz)
  }

  addBaddie(pos){
    const baddie = new Baddie(0,0)
    baddie.pos = pos
    return this.add(baddie)
  }

  addTile(texture, frame,pos){
    const tile = new TileSprite(texture,32,32)
    tile.frame = frame
    tile.pos = pos
    return this.add(tile)
  }

  update(dt,t){
    super.update(dt,t)

    if(this.controls.action){
      this.onStart()
    }
  }
  
}

export default TitleScreen