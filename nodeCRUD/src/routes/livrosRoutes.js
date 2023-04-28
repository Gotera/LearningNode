import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/livros", LivroController.listBooks, paginate)
  .get("/livros/busca", LivroController.listBooksByFilter, paginate)
  .get("/livros/:id", LivroController.listBooksById)
  .post("/livros", LivroController.registerBook)
  .put("/livros/:id", LivroController.updateBook)
  .delete("/livros/:id", LivroController.deleteBook);
export default router;
