import getBlocks from './entities/Block.js'

export default async function createMap(sprite, map) {
	const { empty, bricks, metal, water, forest, ice } = await getBlocks(
		sprite,
		48
	)
	return map.map((line, y) => {
		return line.map((row, x) => {
			if (row === 0) return empty({ x, y })
			if (row === 1) return bricks({ x, y })
			if (row === 2) return metal({ x, y })
			return null
		})
	})
}
