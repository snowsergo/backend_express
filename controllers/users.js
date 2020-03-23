/* eslint-disable no-console */
const bcrypt = require('bcryptjs'); // для хеширования пароля
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');

const { JWT_SECRET } = process.env;

// аутентификация пользователя
module.exports.login = (req, res) => {
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
    // res.send({ token }); // вернём токен
    })
    .catch((err) => {
      res.status(401).send({ message: err.message }); // ошибка аутентификации
    });
};

// создание пользователя
module.exports.createUser = (req, res) => {
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
        res.status(403).send({ message: `Ошибка валидации ${err.message}` });
      } else res.status(500).send({ message: `При создании пользователя произошла ошибка на сервере ${err.message}` });
    });
};

// выдача всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `При запросе всех пользователей произошла ошибка, ${err.message}` }));
};

// выдача пользователя по id
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } res.status(404).send({ message: `Пользователь с ID ${req.params.userId} не найден` });
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера при запросе данных пользователя, ${err.message}` }));
};

// обновляем данные пользователя
module.exports.updateUser = (req, res) => {
  console.log('пришел запрос на обновление данных пользователя');
  const { name, about } = req.body;
  // включил валидацию имени
  // eslint-disable-next-line max-len
  // User.schema.path('name').validate((value) => /(^[А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$)|(^[A-Z][a-z]+( [A-Z][a-z]+)?$)/.test(value), 'Invalid name');
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then(() => res.send({ message: 'Данные пользователя обновлены' }))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `При обновлении данных пользователя произошла ошибка, ${err.message}` });
      } else res.status(500).send({ message: `При обновлении данных пользователя произошла ошибка на сервере, ${err.message}` });
    });
};

// обновляем аватар пользователя
module.exports.updateAvatar = (req, res) => {
  console.log('пришел запрос на обновление аватара пользователя');
  const { avatar } = req.body;
  // включил валидацию аватара
  // eslint-disable-next-line max-len
  // User.schema.path('avatar').validate((value) => /^https?:\/\/(www\.)?[a-z]+\.[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)\.(?:jpg|jpeg|png)$/.test(value), 'Invalid avatar');
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then(() => res.send({ message: 'Аватар пользователя изменен' }))
    .catch((err) => {
      console.log(err.name, err.name === 'ValidationError');
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `При обновлении аватара произошла ошибка,${avatar} is invalid avatar` });
      } else res.status(500).send({ message: 'При обновлении аватара произошла ошибка на сервере' });
    });
};
