import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
function errorManipulator(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: 'Um ou mais dados fornecidos estão incorretos.' });
  } else if (err instanceof mongoose.Error.ValidationError) {
    const errorMessage = Object.values(err.errors)
      .map(err => err.message)
      .join(';');
    res.status(400).send({ message: `O(s) seguinte(s) erro(s) fora encontrados: ${errorMessage}` });
  } else {
    res.status(500).send({ message: 'Erro interno de servidor.' });
  }
}

export default errorManipulator;