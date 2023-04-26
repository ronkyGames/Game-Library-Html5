import Texture from "../Texture";
import KeyControls from "../controls/KeyControls";
import Sprite from "./Sprite";

class Ship extends Sprite {
	gameWidth: number;
	gameHeight: number;
	keyControls: KeyControls;
	constructor(gameWidth: number, gameHeight: number, keyControls: KeyControls) {
		super(new Texture("res/images/spaceship.png"), {
			x: gameWidth / 8 - 16,
			y: gameHeight / 2 - 16,
		});
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.keyControls = keyControls;
	}

	update(dt: number) {
		this.pos.x += (this.keyControls.x * dt * 2) / 10;
		this.pos.y += (this.keyControls.y * dt * 2) / 10;

		// test border
		if (this.pos.x < 0) this.pos.x = 0;
		if (this.pos.x > this.gameWidth - 32) this.pos.x = this.gameWidth - 32;
		if (this.pos.y < 0) this.pos.y = 0;
		if (this.pos.y > this.gameHeight - 32) this.pos.y = this.gameHeight - 32;
	}
}

export default Ship;
