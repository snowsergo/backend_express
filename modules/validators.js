const { celebrate, Joi } = require('celebrate');

// валидация запросов при входе пользователя
module.exports.userSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// валидация запросов при создании пользователя
module.exports.userSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().min(12),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
