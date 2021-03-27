import Essence from './Essence.js'

export default class Explosion extends Essence {
	constructor(sprite, x, y) {
		super(sprite)
		this.timeCreation = Date.now()
		this.props = {
			x,
			y,
		}
	}

	async draw() {
		const { x1, y1 } = this.props
		return [this.sprite, 16 * 48, 8 * 48, 47, 47, x1 - 12, y1 - 12, 48, 48]
	}
	remove() {
		const timeNow = Date.now()
		const time = timeNow - this.timeCreation
		if (time > 200) return false
		return true
	}
}
