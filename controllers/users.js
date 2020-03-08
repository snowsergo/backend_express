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
    .catch(() => res.status(500).send({ message: 'При запросе пользователя произошла ошибка' }));
};

// обновляем данные пользователя
module.exports.updateUser = (req, res) => {
  console.log('пришел запрос на обновление данных пользователя');
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'При обновлении данных пользователя произошла ошибка' }));
};

// обновляем аватар пользователя
module.exports.updateAvatar = (req, res) => {
  console.log('пришел запрос на обновление аватара пользователя');
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'При обновлении аватара произошла ошибка' }));
};
