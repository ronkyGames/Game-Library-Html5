import Texture from "../Texture";
import CanvasElement, { Position } from "./CanvasElement";

class Sprite extends CanvasElement {
	texture: Texture;
	dead = false;
	constructor(texture: Texture, position?: Partial<Position>) {
		super(position);
		this.texture = texture;
	}
}

export default Sprite;
