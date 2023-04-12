import express from 'express';
import db from './config/dbConnect.js'
import livros from './models/Livro.js'
import routes from './routes/index.js'

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
	console.log('Conexão Estabelecida')
})
const app = express();
app.use(express.json())
routes(app)


app.get('/livros/:id', (req, res) => {
	let index = searchBook(req.params.id);
	res.json(livros[index]);
})

app.post('/livros', (req, res) => {
	livros.push(req.body);
	res.status(201).send('livro cadastrado com sucesso!')
})

app.put('/livros/:id', (req, res) => {
	let index = searchBook(req.params.id);
	livros[index].titulo = req.body.titulo;
	res.json(livros);
})

app.delete('/livros/:id', (req, res) => {
	let { id } = req.params;
	let index = searchBook(id)
	livros.splice(index, 1)
	res.send(`Livro ${id} excluido.`)
})


function searchBook(id) {
	return livros.findIndex(livro => livro.id == id)
}

export default app