import getBlocks from './Block.js'

export default async function createMap(map) {
	const { empty, bricks, metal, water, forest, ice } = await getBlocks(48)
	return map.map((line, y) => {
		return line.map((row, x) => {
			if (row === 0) return empty({ x, y })
			if (row === 1) return bricks({ x, y })
			if (row === 2) return metal({ x, y })
			return null
		})
	})
}
