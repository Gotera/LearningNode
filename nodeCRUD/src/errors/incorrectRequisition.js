import baseError from './baseError.js';

class incorrectRequisition extends baseError {
  constructor(message = 'Um ou mais dados fornecidos estão incorretos') {
    super(message, 400);
  }
}

export default incorrectRequisition;