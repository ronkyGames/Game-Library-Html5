class PointerControls {
	el: HTMLElement;
	pos: { x: number; y: number };
	isDown: boolean;
	pressed: boolean;
	released: boolean;
	constructor(container?: HTMLElement) {
		this.el = container ?? document.body;
		this.pos = { x: 0, y: 0 };
		this.isDown = false;
		this.pressed = false;
		this.released = false;
		document.addEventListener("mousemove", (e) => this.move(e), false);
		document.addEventListener("mousedown", (e) => this.down(e), false);
		document.addEventListener("mouseup", (e) => this.up(), false);
		document.addEventListener("touchstart", (e) => this.down(e, true), false);
		document.addEventListener("touchend", (e) => this.up(), false);
		document.addEventListener("touchmove", (e) => this.move(e, true), false);
	}

	down(...args: [e: TouchEvent, isTouch: true] | [e: MouseEvent, isTouch?: false]) {
		this.isDown = true;
		this.pressed = true;
		this.move(...args);
	}

	up() {
		this.isDown = false;
		this.released = true;
	}

	update() {
		this.released = false;
		this.pressed = false;
	}

	move(...[e, isTouch]: [e: TouchEvent, isTouch: true] | [e: MouseEvent, isTouch?: false]) {
		if (isTouch) {
			if (!e.touches.length) return;
			e.preventDefault();
		}
		const { clientX, clientY } = isTouch ? e.touches[0] : e;
		// Calculations to set pos.x pos.y
		const { el, pos } = this;
		const rect = el.getBoundingClientRect();
		const xr = rect.width / el.clientWidth;
		const yr = rect.height / el.clientHeight;

		pos.x = (clientX - rect.left) * xr;
		pos.y = (clientY - rect.top) * yr;
	}
}

export default PointerControls;
