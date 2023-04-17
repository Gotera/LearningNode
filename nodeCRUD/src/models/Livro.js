import mongoose from 'mongoose';

const livroSchema = new mongoose.Schema(
  {
    'id': { type: String },
    'titulo': {
      type: String,
      required: [true, 'O título do livro é obrigatório']
    },
    'autor': {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autores',
      required: [true, 'O(a) autor(a) é obrigatório']
    },
    editora: {
      type: String,
      required: [true, 'O(a) editora é obrigatório']
      // if a want to limit the value provided.
      // enum: {
      //   values: ["Casa do Código"],
      //   message: 'A editora {VALUE} não é um valor permitido.'
      // }
    },
    'numeroDePaginas': {
      type: Number,
      min: [10, 'O número de páginas é menor do que o minimo permitido. Valor fornecido: {VALUE}'],
      max: [9999, 'O número de páginas é maior do que o máximo permitido. Valor fornecido: {VALUE}']
    },
  }
);

const livros = mongoose.model('livros', livroSchema);
export default livros;