import getSprite from './Sprite.js'
import getWorld from './World.js'

class Shell {
	#img = null
	#properties = {}

	set props(props) {
		this.#properties = {
			...this.#properties,
			...props,
		}
	}

	get props() {
		const { x, y, dx, dy, direction } = this.#properties
		return {
			x,
			y,
			direction,
			dx,
			dy,
		}
	}

	constructor(direction) {
		this.#img = getSprite('./Спрайт.png')
		const [dx, dy] = getDirection(direction)
		this.props = {
			direction,
			dx,
			dy,
		}
	}

	async create(x, y) {
		this.#img = await this.#img
		this.props = {
			x,
			y,
		}
		return this
	}

	draw() {
		const { x, y, dx, dy } = this.#properties
		return [this.#img, dx, dy, 24, 24, x, y, 24, 24]
	}

	chengePosition(x, y) {
		this.props = {
			x,
			y,
		}
	}
}

export default Shell

function getDirection(direction) {
	let d
	switch (direction) {
		case 'up':
			d = [961, 300]
			break
		case 'down':
			d = [1010, 300]
			break
		case 'left':
			d = [985, 300]
			break
		case 'right':
			d = [1030, 300]
			break
	}
	return d
}
