import Essence from './Essence.js'
import getWorld from '../World.js'

class Block extends Essence {
	constructor(sprite, type, size) {
		super(sprite)
		this.type = type
		this.position = init(type, size)
		this.props = {
			width: size,
			height: size,
			size,
		}
		this.draw = this.draw.bind(this)
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
		return [this.sprite, ...this.position, x1, y1, size, size]
	}
}

function getBlock(type, size, sprite) {
	return function (options) {
		const block = new Block(sprite, type, size)
		return block.create(options)
	}
}

export default async function getBlocks(sprite, size) {
	return {
		bricks: getBlock('bricks', size, sprite),
		metal: getBlock('metal', size, sprite),
		water: getBlock('water', size, sprite),
		forest: getBlock('forest', size, sprite),
		ice: getBlock('ice', size, sprite),
		empty: getBlock('empty', size, sprite),
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
