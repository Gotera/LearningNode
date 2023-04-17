class baseError extends Error {
  constructor(message = 'Erro interno no servidor', status = '500') {
    super();
    this.message = message;
    this.status = status;
  }

  sendAnswer(res) {
    res.status(this.status).send({
      message: this.message,
      status: this.status
    });
  }
}

export default baseError;