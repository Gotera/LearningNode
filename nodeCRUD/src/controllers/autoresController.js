import autores from '../models/Autor.js';

class autorController {
  static listAutors = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  static listAutorsById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const autorResult = await autores.findById(id);
      if (autorResult !== null) {
        res.status(200).send({ autorResult });
      } else {
        res.status(404).send({ message: 'Id do autor não localizado.' });
      }
    } catch (err) {
      next(err);
    }
  };

  static registerAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      next(err);
      // res.status(500).send({ message: `${err.message} - falha ao cadastrar autor.` });
    }
  };

  static updateAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: 'autor atualizado com sucesso!' });
    } catch (err) {
      next(err);
      // res.status(500).send({ message: err.message });
    }
  };

  static deleteAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: 'autor excluido som sucesso!' });
    } catch (err) {
      next(err);
      // res.status(500).send({ message: 'autor não encontrado.' });
    }
  };
}
export default autorController;