import Container from "../elements/Container";
import Sprite from "../elements/Sprite";
import Text from "../elements/Text";

class CanvasRenderer {
	w: number;
	h: number;
	view: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	constructor(w: number, h: number) {
		this.view = document.createElement("canvas");
		this.w = this.view.width = w;
		this.h = this.view.height = h;
		this.ctx = this.view.getContext("2d")!;
	}

	render(container: Container, clear = true) {
		if (clear) this.ctx.clearRect(0, 0, this.w, this.h);
		const renderRec = (container: Container) => {
			// Render the container children
			for (const child of container.children) {
				this.ctx.save(); // save context options to the default
				// Draw the leaf node
				if (child.pos) this.ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
				if (child instanceof Text) {
					const { font, fill, align } = child.style;

					if (font) this.ctx.font = font;
					if (fill) this.ctx.fillStyle = fill;
					if (align) this.ctx.textAlign = align;
					this.ctx.fillText(child.text, 0, 0);
				} else if (child instanceof Sprite) this.ctx.drawImage(child.texture.img, 0, 0);
				// Handle the child types
				else if (child instanceof Container) renderRec(child);
				this.ctx.restore(); // restore to default options to not affect the others children of the container
			}
		};
		renderRec(container);
	}
}

export default CanvasRenderer;
