const ValidationError = require('../errors/validation-error');
const ServerError = require('../errors/server-error');

// Обработчик ошибок при создании пользователя
module.exports.createUserHandler = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`Ошибка валидации: ${err.message}`));
  } next(new ServerError(`При создании пользователя произошла ошибка на сервере: ${err.message}`));
};

// Обработчик ошибок при обновлении  пользователя
module.exports.updateUserHandler = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`При обновлении данных пользователя произошла ошибка: ${err.message}`));
  } next(new ServerError(`При обновлении данных пользователя произошла ошибка на сервере: ${err.message}`));
};

// Обработчик ошибок при обновлении аватара пользователя
module.exports.updateAvatarHandler = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`При обновлении аватара произошла ошибка: ${err.message}`));
  } next(new ServerError(`При обновлении аватара произошла ошибка на сервере: ${err.message}`));
};

// Обработчик ошибок при создании новой карточки
module.exports.createCardHandler = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`Ошибка валидации: ${err.message}`));
  } next(new ServerError(`При создании карточки произошла ошибка на сервере: ${err.message}`));
};
