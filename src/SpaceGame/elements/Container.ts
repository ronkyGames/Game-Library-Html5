import CanvasElement from "./CanvasElement";

class Container<T extends CanvasElement = CanvasElement> extends CanvasElement {
	children: T[] = [];

	add(child: T) {
		this.children.push(child);
		return child;
	}

	remove(child: T) {
		this.children = this.children.filter((c) => c !== child);
		return child;
	}

	update(dt: number) {
		this.children = this.children.filter((child) => {
			child.update(dt);
			return !child.dead;
		});
	}
}

export default Container;
