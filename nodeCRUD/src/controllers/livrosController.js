import { livros } from '../models/index.js';

class LivroController {
  static listBooks = async (req, res, next) => {
    try {
      const livrosResult = await livros.find().populate('autor').exec();
      res.status(200).json(livrosResult);
    } catch (err) {
      next(err);
    }
  };

  static listBooksById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const bookResult = await livros
        .findById(id)
        .populate('autor', 'nome')
        .exec();
      if (bookResult !== null) {
        res.status(200).send({ bookResult });
      } else {
        res.status(404).send({ message: 'Id do autor não localizado.' });
      }
    } catch (err) {
      next(err);
    }
  };

  static registerBook = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: 'Livro atualizado com sucesso!' });
    } catch (err) {
      next(err);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: 'Livro excluido com sucesso!' });
    } catch (err) {
      next(err);
    }
  };

  static listBooksByFilter = async (req, res, next) => {
    try {
      const search = searchBySomething(req.query);
      const bookResult = await livros.find(search);

      res.status(200).send(bookResult);
    } catch (err) {
      next(err);
    }
  };
}

function searchBySomething(params) {
  const { editora, titulo, minPags, maxPags } = params;
  const search = {};
  const regex = new RegExp(titulo, 'i');
  //Search by editora
  if (editora) search.editora = editora;
  //Search by tittle
  if (titulo) search.titulo = regex;
  //Search by qt pags
  if (minPags || maxPags) search.numeroDePaginas = {};
  if (minPags) search.numeroDePaginas.$gte = minPags;
  if (maxPags) search.numeroDePaginas = { $lte: maxPags };

  return search;
}

export default LivroController;
