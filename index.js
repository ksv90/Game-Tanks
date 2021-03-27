import express from 'express'

const app = express()
const port = 1111

app.use(express.static('public'))

app.get((_, res) => {
	res.sendFile('index.html')
})

app.listen(port, () => {
	console.log(`Сервер работает на порту: ${port}`)
})
