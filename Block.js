import getSprite from './Sprite.js'
import getWorld from './World.js'

class Block {
	#img = null
	properties = {}

	constructor(type, size) {
		this.#img = img
		this.type = type
		this.position = init(type, size)
		this.props = {
			size,
		}
		this.draw = this.draw.bind(this)
	}

	/**
	 * @param {object} props
	 */
	set props(props) {
		this.properties = {
			...this.properties,
			...props,
		}
	}

	get props() {
		const { x, y, size } = this.properties
		return {
			x1: x,
			x2: x + size,
			y1: y,
			y2: y + size,
			width: size,
			height: size,
			size,
		}
	}

	create({ x, y } = {}) {
		const { size: sz } = this.props
		this.props = {
			x: x * sz,
			y: y * sz,
		}
		const world = getWorld().canvas
		const rowSize = world.width / 13
		const workingSize = world.width - rowSize
		this.world = {
			size: workingSize,
			rows: workingSize / 24,
		}
		return this
	}

	draw() {
		const { x1, y1, size } = this.props
		return [this.#img, ...this.position, x1, y1, size, size]
	}
}

function getBlock(type, size) {
	return function (options) {
		const block = new Block(type, size)
		return block.create(options)
	}
}

let img = null

export default async function getBlocks(size) {
	img = await getSprite('./Спрайт.png')
	return {
		bricks: getBlock('bricks', size),
		metal: getBlock('metal', size),
		water: getBlock('water', size),
		forest: getBlock('forest', size),
		ice: getBlock('ice', size),
		empty: getBlock('empty', size),
	}
}

function init(type, size) {
	switch (type) {
		case 'empty':
			return [21 * size, 0 * size + 2, 48, 48]
		case 'bricks':
			return [16 * size + 1, 0 * size + 1, size - 2, size - 2]
		case 'metal':
			return [16 * size, 1 * size, size, size - 2]
		case 'water':
		case 'forest':
		case 'ice':
	}
}
