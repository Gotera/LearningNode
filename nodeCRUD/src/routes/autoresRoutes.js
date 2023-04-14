import express from 'express';
import autorController from '../controllers/autoresController.js';

const router = express.Router();

router
  .get('/autores', autorController.listAutors)
  .get('/autores/:id', autorController.listAutorsById)
  .post('/autores', autorController.registerAutor)
  .put('/autores/:id', autorController.updateAutor)
  .delete('/autores/:id', autorController.deleteAutor);
export default router;