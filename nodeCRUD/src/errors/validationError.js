import incorrectRequisition from './incorrectRequisition.js';

class validationError extends incorrectRequisition {
  constructor(err) {
    const errorMessage = Object.values(err.errors)
      .map(err => err.message)
      .join(';');
    super(`O(s) seguinte(s) erro(s) fora encontrados: ${errorMessage}`);
  }
}

export default validationError;