import mongoose from 'mongoose';
import baseError from '../errors/baseError.js';
import incorrectRequisition from '../errors/incorrectRequisition.js';
import validationError from '../errors/validationError.js';

// eslint-disable-next-line no-unused-vars
function errorManipulator(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new incorrectRequisition().sendAnswer(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new validationError(err).sendAnswer(res);
  } else if (err instanceof baseError) {
    err.sendAnswer(res);
  } else {
    new baseError().sendAnswer(res);
  }
}

export default errorManipulator;