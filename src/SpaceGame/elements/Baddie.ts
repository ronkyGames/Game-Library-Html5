import Texture from "../Texture";
import { Position } from "./CanvasElement";
import Sprite from "./Sprite";

class Baddie extends Sprite {
	speed: number;
	constructor(speed: number, position?: Partial<Position>) {
		super(new Texture("res/images/baddie.png"), position);
		this.speed = speed;
	}

	update(dt: number) {
		this.pos.x += Math.floor((this.speed * dt) / 1_000);
	}
}

export default Baddie;
