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

  static deleteBook = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Livro excluido som sucesso!' });
      } else {
        res.status(500).send({ message: 'Livro não encontrado.' });
      }
    });
  };

  static listBooksByEditora = (req, res) => {
    const editora = req.query.editora;
    livros.find({ 'editora': editora }, {}, (err, livros) => {
      res.status(200).send(livros);
    });
  };
}
export default LivroController;