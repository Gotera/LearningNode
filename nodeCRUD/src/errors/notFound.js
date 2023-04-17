import baseError from './baseError.js';

class notFound extends baseError {
  constructor(message = 'Página não encontrada') {
    super(message, 404);
  }
}

export default notFound;