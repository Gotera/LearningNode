import express from 'express';
import LivroController from '../controllers/livrosController.js';

const router = express.Router();

router
	.get("/livros", LivroController.listBooks)
	.post("/livros", LivroController.registerBook)
	.put("/livros/:id", LivroController.updateBook)
	
export default router;