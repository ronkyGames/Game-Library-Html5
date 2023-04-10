// import libraries
import RonkyGames from "../RonkyGames/index.js"

const colors ={
  red : "red",
  green: "green",
  blue: "blue",
  black : "black"
}

const {Container, Text, CanvasRenderer} = RonkyGames

// initialize objects
const keyControls = new RonkyGames.KeyControls()
const touchControls = new RonkyGames.PointerControls()

//function
function helloWorld(color){
  const body = document.body
  const h1 = document.createElement("h1")
  h1.setAttribute("class", color)
  h1.innerHTML = "Hello World"
  body.append(h1)
  return h1
}

function changeColor(tag,color){
  tag.setAttribute("class", color)
}

const h1 = helloWorld("black")
// Text
const scene = new Container()

//Game setup. code
const w = 320
const h = 240
const renderer = new CanvasRenderer(w,h)
document.querySelector("#board").appendChild(renderer.view)

const message = new Text("The Renderer", {
  font: "20pt monospace",
  fill: "blue",
  align: "center"
})
message.pos.x = w/2
message.pos.y = h/2

message.update = function(dt,t){
  this.pos.x -= 50*dt
  if(this.pos.x < -100){
    this.pos.x = w+100
  }
}

scene.add(message)

//loop setup
let dt = 0
let last = 0

function loop(ms){
  requestAnimationFrame(loop)

  // set time variables to use in game logic
  const t = ms/1000
  dt = t - last
  last = t

  // Game Logic Code Here
  if(keyControls.action || touchControls.pressed){
    changeColor(h1,colors.green)
  }
  if(touchControls.released){
    changeColor(h1,colors.red)
    touchControls.update()
  }
  scene.update(dt,t)
  //render the main container
  renderer.render(scene)
  
}

requestAnimationFrame(loop)