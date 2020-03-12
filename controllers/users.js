/* eslint-disable no-console */
const User = require('../models/user');


// создание пользователя
module.exports.createUser = (req, res) => {
  console.log('пришел запрос на создание пользователя');
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'При создании пользователя произошла ошибка' }));
};

// выдача всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'При запросе всех пользователей произошла ошибка' }));
};

// выдача пользователя по id
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Указанный пользователь не найден' }));
};

// обновляем данные пользователя
module.exports.updateUser = (req, res) => {
  console.log('пришел запрос на обновление данных пользователя');
  const { name, about } = req.body;
  // включил валидацию имени
  User.schema.path('name').validate((value) => /(^[А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$)|(^[A-Z][a-z]+( [A-Z][a-z]+)?$)/.test(value), 'Invalid name');
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then(() => res.send({ message: 'Данные пользователя обновлены' }))
    .catch(() => res.status(500).send({ message: `При обновлении данных пользователя произошла ошибка, ${name} is invalid name` }));
};

// обновляем аватар пользователя
module.exports.updateAvatar = (req, res) => {
  console.log('пришел запрос на обновление аватара пользователя');
  const { avatar } = req.body;
  // включил валидацию аватара
  User.schema.path('avatar').validate((value) => /^https?:\/\/(www\.)?[a-z]+\.[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)\.(?:jpg|jpeg|png)$/.test(value), 'Invalid avatar');
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then(() => res.send({ message: 'Аватар пользователя изменен' }))
    .catch(() => res.status(500).send({ message: `При обновлении аватара произошла ошибка,${avatar} is invalid avatar` }));
};
