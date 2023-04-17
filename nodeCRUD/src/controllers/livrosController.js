import { livros } from '../models/index.js';

class LivroController {
  static listBooks = async (req, res, next) => {
    try {
      const livrosResult = await livros.find()
        .populate('autor')
        .exec();
      res.status(200).json(livrosResult);
    } catch (err) {
      next(err);
    }
  };

  static listBooksById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const bookResult = await livros.findById(id)
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
      res.status(200).send({ message: 'Livro excluido som sucesso!' });
    } catch (err) {
      next(err);
    }
  };

  static listBooksByEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      await livros.find({ 'editora': editora }, {});
      res.status(200).send(livros);
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;