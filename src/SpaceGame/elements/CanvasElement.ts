export type Position = {
	x: number;
	y: number;
};

class CanvasElement {
	pos: Position;
	dead = false;
	constructor({ x = 0, y = 0 }: Partial<Position> = {}) {
		this.pos = { x, y };
	}

	update(dt: number): void {
		// Implement in every class
	}
}

export default CanvasElement;
