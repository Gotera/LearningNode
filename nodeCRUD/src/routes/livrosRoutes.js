import express from 'express';
import LivroController from '../controllers/livrosController.js';

const router = express.Router();

router
  .get('/livros', LivroController.listBooks)
  .get('/livros/busca', LivroController.listBooksByEditora)
  .get('/livros/:id', LivroController.listBooksById)
  .post('/livros', LivroController.registerBook)
  .put('/livros/:id', LivroController.updateBook)
  .delete('/livros/:id', LivroController.deleteBook);
export default router;