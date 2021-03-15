const sprites = new Map()

function createSprite(path) {
	return new Promise(res => {
		const img = new Image()
		img.src = path
		img.addEventListener('load', () => res(img))
	})
}

export default async function getSprite(path) {
	if (sprites.has(path)) return sprites.get(path)
	const img = await createSprite(path)
	sprites.set(path, img)
	return img
}
