/* eslint-disable no-console */
const bcrypt = require('bcryptjs'); // для хеширования пароля
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const ValidationError = require('../errors/validation-error');
const ServerError = require('../errors/server-error');

const { JWT_SECRET } = process.env;

// аутентификация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен с ключем из переменных окружения
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { // вернем токен в виде http-куки продолжительность жизни 7 дней
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true, //  защита от CSRF атак («межсайтовая подделка запроса»)
      })
        .end(); // если у ответа нет тела, можно использовать метод end
    })
    .catch((err) => next(new AuthError(`Ошибка аутентификации: ${err.message}`)));
};

// создание пользователя
module.exports.createUser = (req, res, next) => {
  console.log('пришел запрос на создание пользователя');
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Ошибка валидации: ${err.message}`));
      } next(new ServerError(`При создании пользователя произошла ошибка на сервере: ${err.message}`));
    });
};

// выдача всех пользователей
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(new ServerError(`При запросе всех пользователей произошла ошибка: ${err.message}`)));
};

// выдача пользователя по id
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } throw new NotFoundError(`Пользователь с ID ${req.params.userId} не найден`);
    })
    .catch((err) => next(err));
};

// обновляем данные пользователя
module.exports.updateUser = (req, res, next) => {
  console.log('пришел запрос на обновление данных пользователя');
  const { name, about } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then(() => res.send({ message: 'Данные пользователя обновлены' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`При обновлении данных пользователя произошла ошибка: ${err.message}`));
      } next(new ServerError(`При обновлении данных пользователя произошла ошибка на сервере: ${err.message}`));
    });
};

// обновляем аватар пользователя
module.exports.updateAvatar = (req, res, next) => {
  console.log('пришел запрос на обновление аватара пользователя');
  const { avatar } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then(() => res.send({ message: 'Аватар пользователя изменен' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`При обновлении аватара произошла ошибка: ${err.message}`));
      } next(new ServerError(`При обновлении аватара произошла ошибка на сервере: ${err.message}`));
    });
};
