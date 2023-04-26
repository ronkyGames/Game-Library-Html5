import CanvasElement, { Position } from "./CanvasElement";

export type TextStyle = Partial<{
	font: string;
	align: CanvasTextAlign;
	fill: string;
}>;

class Text extends CanvasElement {
	text: string;
	style: TextStyle;
	constructor(text: string, style: TextStyle = {}, position?: Partial<Position>) {
		super(position);
		this.text = text;
		this.style = style;
	}
}

export default Text;
