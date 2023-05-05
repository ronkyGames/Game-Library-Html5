//utils helper
import math from "./utils/math.js"
import entity from "./utils/entity.js"
//container
import Container from "./Container.js"
import TileMap from "./TileMap.js"
//game objects
import Text from "./Text.js"
import Texture from "./Texture.js"
import Sprite from "./Sprite.js"
import TileSprite from "./TileSprite.js"
//Renderer
import CanvasRenderer from "./renderer/CanvasRenderer.js"
//controls
import KeyControls from "./controls/KeyControls.js"
import PointerControls from "./controls/PointerControls.js"
import AnimationManager from "./AnimManager.js"
// Game Library
import Game from "./Game.js"

export default{
  entity,
  math,
  CanvasRenderer,
  Container,
  TileMap,
  Text,
  Texture,
  Sprite,
  TileSprite,
  //controls
  KeyControls, 
  PointerControls,
  //Game
  Game
}
