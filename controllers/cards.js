/* eslint-disable no-console */
const Card = require('../models/card');

// создание новой карточки
module.exports.createCard = (req, res) => {
  console.log('пришел запрос на создание карточки');
  const owner = req.user._id; // временное решение для авторизации
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'При создании карточки произошла ошибка' }));
};

// выдача всех карточек
module.exports.getAllCards = (req, res) => {
  console.log('пришел запрос всех карточек');
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'При запросе всех карточек произошла ошибка' }));
};

// удаление карточки
module.exports.deleteCard = (req, res) => {
  console.log('пришел запрос на удаление карточки');
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'При удалении карточки произошла ошибка' }));
};

// установка лайка
module.exports.setLike = (req, res) => {
  console.log('пришел запрос на постановку лайка');
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'При добавлении лайка произошла ошибка' }));
};

// удаление лайка
module.exports.deleteLike = (req, res) => {
  console.log('пришел запрос на удаление лайка');
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'При удалении лайка произошла ошибка' }));
};