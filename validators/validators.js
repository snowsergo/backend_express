const { celebrate, Joi } = require('celebrate');
const ValidationError = require('../errors/validation-error');
const ServerError = require('../errors/server-error');


// const AutorError = require('../errors/autor-error');

// валидация запросов при создании пользователя
module.exports.createUserValidation = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`Ошибка валидации: ${err.message}`));
  } next(new ServerError(`При создании пользователя произошла ошибка на сервере: ${err.message}`));
};

// валидация запросов при обновлении  пользователя
module.exports.updateUserValidation = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`При обновлении данных пользователя произошла ошибка: ${err.message}`));
  } next(new ServerError(`При обновлении данных пользователя произошла ошибка на сервере: ${err.message}`));
};

// валидация запросов при обновлении аватара пользователя
module.exports.updateAvatarValidation = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`При обновлении аватара произошла ошибка: ${err.message}`));
  } next(new ServerError(`При обновлении аватара произошла ошибка на сервере: ${err.message}`));
};

// валидация запросов при создании новой карточки
module.exports.createCardValidation = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`Ошибка валидации: ${err.message}`));
  } next(new ServerError(`При создании карточки произошла ошибка на сервере: ${err.message}`));
};

const userSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().min(12),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  userSignin,
  userSignup,
};
