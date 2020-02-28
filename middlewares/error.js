const defaultErrorStatus = 500;

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const status = err.status || defaultErrorStatus;
  const message = err.message || 'Problems on server';
  // eslint-disable-next-line no-console
  console.log(Date.now(), req.method, req.path, 'работает мидлвара ошибок');
  res.status(status).json(message);
};

module.exports = errorMiddleware;
