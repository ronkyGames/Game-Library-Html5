class KeyControls{
  constructor(){
    this.keys = {}
    // Bind Event Handlers
    document.addEventListener("keydown",e=>{
      // prevent default use of the keys
      if([37,38,39,40].indexOf(e.which) >= 0){
        e.preventDefault()
      }
      // insert key pressed in a list of keys
      this.keys[e.which] = true
    },false)

    document.addEventListener("keyup", e => {
      this.keys[e.which] = false
    }, false)
  } // End Constructor

  // Handle key Actions
  get action(){
    return this.keys[32] // 32:= CODE OF SPACE BAR
  }

  get x(){
    // left arrow or A key
    if(this.keys[37] || this.keys[65]){
      return -1
    }
    // right arrow or D key
    if(this.keys[39]||this.keys[68]){
      return 1
    }
    // default option
    return 0
  }
  get y(){
    // up arrow or W key
    if(this.keys[38]|| this.keys[87]){
      return -1
    }
    // down arrow or S key
    if(this.keys[40] || this.keys[83]){
      return 1
    }
    // defult option
    return 0
  }

  reset(){
    for(let key in this.keys){
      this.keys[key] = false
    }
  }
  
} // END CLASS

export default KeyControls
