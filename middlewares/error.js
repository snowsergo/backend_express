/* eslint-disable no-console */
// const defaultErrorStatus = 404;
/*
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
 // const status = err.statusCode || defaultErrorStatus;
 // const message = err.message || 'Запрашиваемый ресурс не найден';
  console.log(Date.now(), req.method, req.path, 'работает мидлвара ошибок');
  res.status(err.statusCode).send({ message: err.message });
};
*/
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? `На сервере произошла ошибка ${message}` : message });
};


module.exports = errorMiddleware;
