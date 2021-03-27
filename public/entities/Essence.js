export default class Essence {
	#properties = {
		toShoot: true,
		timeShoot: 800,
	}

	// Геттеры и сеттеры
	/**
	 * @param {object} props
	 */
	set props(props) {
		this.#properties = {
			...this.#properties,
			...props,
		}
	}

	get props() {
		const {
			x,
			y,
			width,
			height,
			direction,
			toShoot,
			timeShoot,
			pos,
			frame,
			size,
			g,
		} = this.#properties
		const properties = {
			x1: x,
			x2: x + width,
			y1: y,
			y2: y + height,
			width,
			height,
		}
		if (direction != null) properties.direction = direction
		if (toShoot != null) properties.toShoot = toShoot
		if (timeShoot != null) properties.timeShoot = timeShoot
		if (pos != null) properties.pos = pos
		if (frame != null) properties.frame = frame
		if (size != null) properties.size = size
		if (g != null) properties.g = g

		return properties
	}
	constructor(sprite) {
		this.sprite = sprite
	}
}
