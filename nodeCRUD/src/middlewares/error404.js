import notFound from '../errors/notFound.js';

function error404(req, res, next) {
  const error404 = new notFound();
  next(error404);
}

export default error404;