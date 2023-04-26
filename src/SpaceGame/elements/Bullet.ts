import Texture from "../Texture";
import { Position } from "./CanvasElement";
import Sprite from "./Sprite";

class Bullet extends Sprite {
	gameWidth: number;
	constructor(gameWidth: number, position?: Partial<Position>) {
		super(new Texture("res/images/bullet.png"), position);
		this.gameWidth = gameWidth;
	}

	update(dt: number) {
		this.pos.x += (4 * dt) / 10;
		this.dead = this.pos.x >= this.gameWidth + 20;
	}
}

export default Bullet;
