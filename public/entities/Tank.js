import getWorld from '../World.js'
import Shell from './Shell.js'
import Essence from './Essence.js'

class Tank extends Essence {
	#lvl = 0

	constructor({ sprite, level, size: sz, speed }) {
		super(sprite)
		this.level = level ?? 0
		const world = getWorld().canvas
		const s = sz ?? world.width / 13
		const size = world.width - s
		this.world = {
			size,
			rows: size / 24,
		}
		this.props = {
			frame: true,
			g: 0,
			width: 45,
			height: 47,
			speed: speed ?? 3,
			size: s,
			toShoot: true,
			timeShoot: 800,
		}
	}

	//Основные методы
	create(x = 100, y = 100, level = 1) {
		this.level = level ?? this.#lvl
		this.up(x, y)
		return this
	}

	draw() {
		const { g, width, height, x1, y1, size } = this.props
		return [this.sprite, g, this.#lvl, width, height, x1, y1, size, size]
	}

	/**
	 * @param {number} lvl
	 */
	set level(lvl) {
		const level = Math.min(Math.max(lvl, 0), 7)
		this.#lvl = level * 48
	}

	// Направление танка
	up(x, y) {
		const { frame } = this.props
		this.props = {
			frame: !frame,
			g: frame ? 48 * 0 : 48 * 1,
			width: 45,
			height: 47,
			x,
			y,
			direction: 'up',
		}
	}

	down(x, y) {
		const { frame } = this.props
		this.props = {
			frame: !frame,
			g: frame ? 48 * 4 : 48 * 5,
			width: 45,
			height: 47,
			x,
			y,
			direction: 'down',
		}
	}

	left(x, y) {
		const { frame } = this.props
		this.props = {
			frame: !frame,
			g: frame ? 48 * 2 : 48 * 3,
			width: 48,
			height: 45,
			x,
			y,
			direction: 'left',
		}
	}

	right(x, y) {
		const { frame } = this.props
		this.props = {
			frame: !frame,
			g: frame ? 48 * 6 : 48 * 7,
			width: 47,
			height: 45,
			x,
			y,
			direction: 'right',
		}
	}

	// Стрельба
	shoot() {
		const { x1, y1, width, height, direction, toShoot, timeShoot } = this.props
		if (!toShoot) return null
		setTimeout(() => {
			this.props = { toShoot: true }
		}, timeShoot)
		this.props = { toShoot: false }
		return new Shell({
			direction,
			sprite: this.sprite,
			x: x1 + width / 4,
			y: y1 + height / 4,
		})
	}
}

export default Tank

// function getPosision(coord) {
// 	let result = 0
// 	if (coord < 12) return 1
// 	else if (coord > 11 && coord < 36) result = 2
// 	else if (coord > 35 && coord < 60) result = 3
// 	else if (coord > 59 && coord < 84) result = 4
// 	else if (coord > 83 && coord < 108) result = 5
// 	else if (coord > 107 && coord < 132) result = 6
// 	else if (coord > 131 && coord < 156) result = 7
// 	else if (coord > 155 && coord < 180) result = 8
// 	else if (coord > 179 && coord < 204) result = 9
// 	else if (coord > 203 && coord < 228) result = 10
// 	else if (coord > 227 && coord < 252) result = 11
// 	else if (coord > 251 && coord < 276) result = 12
// 	else if (coord > 275 && coord < 300) result = 13
// 	else if (coord > 299 && coord < 324) result = 14
// 	else if (coord > 323 && coord < 348) result = 15
// 	else if (coord > 347 && coord < 372) result = 16
// 	else if (coord > 371 && coord < 396) result = 17
// 	else if (coord > 395 && coord < 420) result = 18
// 	else if (coord > 419 && coord < 444) result = 19
// 	else if (coord > 443 && coord < 468) result = 20
// 	else if (coord > 467 && coord < 492) result = 21
// 	else if (coord > 491 && coord < 516) result = 22
// 	else if (coord > 515 && coord < 540) result = 23
// 	else if (coord > 539 && coord < 564) result = 24
// 	else if (coord > 563) result = 25

// 	return 24 * (result - 1)
// }
