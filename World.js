import Tank from './Tank.js'
import createMap from './Map.js'

class World {
	constructor(canvas, ctx) {
		this.canvas = canvas
		this.ctx = ctx
		this.motionKey = null

		const rowSize = canvas.width / 13
		const positionSize = canvas.width - rowSize
		this.props = {
			size: positionSize / 24,
			speed: 3,
		}

		this.close = this.close.bind(this)
	}

	// Основные методы
	async start({ map } = {}) {
		this.player = new Tank({ speed: 3 })
		await this.player.create(192, 576)
		this.map = await createMap(map)
		this.#installHandlers()
		this.update()
	}

	update() {
		this.clear()
		this.movementHandler()
		this.draw()
		requestAnimationFrame(this.update.bind(this))
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	draw() {
		this.map.forEach(line =>
			line.forEach(block => block && this.ctx.drawImage(...block.draw()))
		)
		this.ctx.drawImage(...this.player.draw())
	}

	close() {
		this.canvas.remove()
		world = null
	}

	// Проверка на столкновение
	checkUpDown(tx1, tx2, ty) {
		let check = true
		this.map.forEach(line => {
			line.forEach(block => {
				if (block.type === 'empty') return
				const { x1, x2, y1, y2 } = block.props
				if (tx1 >= x2 || tx2 <= x1 || ty < y1 || ty > y2) return
				check = false
			})
		})
		return check
	}

	checkLeftRight(tx, ty1, ty2) {
		let check = true
		this.map.forEach(line => {
			line.forEach(block => {
				if (block.type === 'empty') return
				const { x1, x2, y1, y2 } = block.props
				if (ty1 >= y2 || ty2 <= y1 || tx < x1 || tx > x2) return
				check = false
			})
		})
		return check
	}

	// Движение по направлениям
	moveUp(tank) {
		const { x1, x2, y1 } = tank.props
		let { size, speed } = this.props
		if (y1 <= 0) speed = 0
		else if (!this.checkUpDown(x1, x2, y1)) speed = 0
		const pos = getPosision(x1, size)
		tank.up(pos * size, y1 - speed)
	}

	moveDown(tank) {
		const { x1, x2, y1, y2 } = tank.props
		let { size, speed } = this.props
		if (y2 >= this.canvas.height) speed = 0
		else if (!this.checkUpDown(x1, x2, y2)) speed = 0
		const pos = getPosision(x1, size)
		tank.down(pos * size, y1 + speed)
	}

	moveRight(tank) {
		const { x1, x2, y1, y2 } = tank.props
		let { size, speed } = this.props
		if (x2 >= this.canvas.width) speed = 0
		else if (!this.checkLeftRight(x2, y1, y2)) speed = 0
		const pos = getPosision(y1, size)
		tank.right(x1 + speed, pos * size)
	}

	moveLeft(tank) {
		const { x1, y1, y2 } = tank.props
		let { size, speed } = this.props
		if (x1 <= 0) speed = 0
		else if (!this.checkLeftRight(x1, y1, y2)) speed = 0
		const pos = getPosision(y1, size)
		tank.left(x1 - speed, pos * size)
	}

	// Дополнительные методы
	movementHandler() {
		switch (this.motionKey) {
			case motion1.up:
				return this.moveUp(this.player)
			case motion1.right:
				return this.moveRight(this.player)
			case motion1.left:
				return this.moveLeft(this.player)
			case motion1.down:
				return this.moveDown(this.player)
		}
	}
	#installHandlers() {
		document.addEventListener('keydown', ({ code }) => {
			const key = getMotionKey(code, motion1)
			if (!key || this.motionKey === key) return
			this.motionKey = key
		})

		document.addEventListener('keyup', ({ code }) => {
			if (code === this.motionKey) this.motionKey = null
		})
	}
}

let world = null

export default function getWorld(canvas, ctx) {
	if (world) return world
	world = new World(canvas, ctx)
	return world
}

const motion1 = {
	up: 'ArrowUp',
	right: 'ArrowRight',
	down: 'ArrowDown',
	left: 'ArrowLeft',
}

const motion2 = {
	up: 'KeyW',
	right: 'KeyD',
	down: 'KeyS',
	left: 'KeyA',
}

function getMotionKey(code, motion) {
	switch (code) {
		case motion.up:
		case motion.right:
		case motion.down:
		case motion.left:
			return code
		default:
			return null
	}
}

// if (!this.pressedKeys.player1.some(key => key === code)) {
// 	this.pressedKeys.player1.push(code)
// }

// this.player1.motion[pressedKeys.player1[pressedKeys.player1.length - 1]]?.()

// this.pressedKeys.player2 = this.pressedKeys.player2.filter(
// 	key => key !== code
// )

function getPosision(coord, size) {
	let gap = null
	for (let i = 0; i < 25; i++) {
		if (coord < size / 2) return 0
		if (!(size * i)) {
			gap = size / 2
			continue
		}
		let g = size + gap
		if (coord > gap - 1 && coord < g) return i
		gap = g
	}
}
