class KeyControls {
	keys: Record<string, boolean | undefined>;
	constructor() {
		this.keys = {};
		document.addEventListener(
			"keydown",
			(e) => {
				if (e.code.startsWith("Arrow")) e.preventDefault();
				this.keys[e.code] = true;
			},
			false
		);
		document.addEventListener("keyup", (e) => (this.keys[e.code] = false), false);
	}

	get action() {
		return this.keys["Space"] ?? false;
	}

	get x() {
		if (this.keys["ArrowLeft"] || this.keys["KeyA"]) return -1;
		if (this.keys["ArrowRight"] || this.keys["KeyD"]) return 1;
		return 0;
  }
  
	get y() {
		if (this.keys["ArrowUp"] || this.keys["KeyW"]) return -1;
		if (this.keys["ArrowDown"] || this.keys["KeyS"]) return 1;
		return 0;
	}
}

export default KeyControls;
