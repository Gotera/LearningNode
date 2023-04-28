import { autores, livros } from "../models/index.js";
import incorrectRequisition from "../errors/incorrectRequisition.js";

class LivroController {
  static listBooks = async (req, res, next) => {
    try {
      let { limit = 5, pag = 1, ordering = "_id:-1" } = req.query;
      let [orderingField, order] = ordering.split(":");
      if (limit >= 0 && pag >= 0) {
        const livrosResult = await livros
          .find()
          .sort({ [orderingField]: order })
          .skip((pag - 1) * limit)
          .limit(limit)
          .populate("autor")
          .exec();
        res.status(200).json(livrosResult);
      } else {
        next(new incorrectRequisition());
      }
    } catch (err) {
      next(err);
    }
  };

  static listBooksById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const bookResult = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();
      if (bookResult !== null) {
        res.status(200).send({ bookResult });
      } else {
        res.status(404).send({ message: "Id do autor não localizado." });
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
      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (err) {
      next(err);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro excluido com sucesso!" });
    } catch (err) {
      next(err);
    }
  };

  static listBooksByFilter = async (req, res, next) => {
    try {
      const search = await searchBySomething(req.query);
      if (!search) {
        const bookResult = await livros.find(search).populate("autor");
        res.status(200).send(bookResult);
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  };
}

async function searchBySomething(params) {
  const { editora, titulo, minPags, maxPags, nomeAutor } = params;
  let search = {};
  const regex = new RegExp(titulo, "i");
  //Search by editora
  if (editora) search.editora = editora;
  //Search by tittle
  if (titulo) search.titulo = regex;
  //Search by qt pags
  if (minPags || maxPags) search.numeroDePaginas = {};
  if (minPags) search.numeroDePaginas.$gte = minPags;
  if (maxPags) search.numeroDePaginas = { $lte: maxPags };
  //Search by autor name
  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });
    if (!autor) {
      search.autor = autor._id;
    }
  }
  return search;
}

export default LivroController;
