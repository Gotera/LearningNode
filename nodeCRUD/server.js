import app from './src/app.js';

const port = process.env.port || 3334;

app.listen(port, () => {
  console.log(`Servidor ouvindo em http://localhost:${port}`);
});