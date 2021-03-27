import Essence from './Essence.js'

export default class Shell extends Essence {
	constructor({ sprite, direction, x, y }) {
		super(sprite)
		const pos = getDirection[direction]
		this.props = {
			direction,
			pos,
			x,
			y,
			width: 24,
			height: 24,
		}
	}

	draw() {
		const { x1, y1, width, height, pos } = this.props
		return [this.sprite, pos, 300, width, height, x1, y1, width, height]
	}

	changePosition(speed) {
		const { direction, x1: x, y1: y } = this.props

		if (direction === 'up') return (this.props = { x, y: y - speed })
		if (direction === 'down') return (this.props = { x, y: y + speed })
		if (direction === 'left') return (this.props = { x: x - speed, y })
		if (direction === 'right') return (this.props = { x: x + speed, y })
	}
}

const getDirection = {
	up: 961,
	down: 1010,
	left: 985,
	right: 1030,
}
