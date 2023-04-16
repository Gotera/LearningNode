import livros from '../models/Livro.js';

class LivroController {
  static listBooks = (req, res) => {
    livros.find()
      .populate('autor')
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listBooksById = (req, res) => {
    let id = req.params.id;
    livros.findById(id)
      .populate('autor', 'nome')
      .exec((err, livros) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Id do livro não localizado.` });
        } else {
          res.status(200).send({ livros });
        }
      });
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