import getWorld from './World.js'
import { m1 } from './m1.js'
// import { m2 } from './m2.js'

const root = document.getElementById('root')

const canvas = document.createElement('canvas')
root.append(canvas)

const ctx = canvas.getContext('2d')
canvas.width = 624
canvas.height = 624

const world = getWorld(canvas, ctx)
world.start({ map: m1 }).then(() => {
	console.log('start')
})
