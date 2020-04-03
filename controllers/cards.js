/* eslint-disable no-console */
const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const ServerError = require('../errors/server-error');
const AutorError = require('../errors/autor-error');
const { createCardHandler } = require('../modules/error-handlers');

// создание новой карточки
module.exports.createCard = (req, res, next) => {
  const owner = req.user._id; // временное решение для авторизации
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      createCardHandler(err, next);
    });
};

// выдача всех карточек
module.exports.getAllCards = (req, res, next) => {
  console.log('пришел запрос всех карточек');
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(new ServerError(`При запросе всех карточек произошла ошибка на сервере: ${err.message}`)));
};

// удаление карточки
module.exports.deleteCard = (req, res, next) => {
  console.log('пришел запрос на удаление карточки');
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточки с ID ${req.params.cardId} не существует`);
      // eslint-disable-next-line eqeqeq
      } else if (card.owner == req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      } else throw new AutorError(`Ошибка авторизации, нет прав на удаление карточки с ID ${req.params.cardId}`);
    })
    .catch((err) => next(err));
};

// установка лайка
module.exports.setLike = (req, res, next) => {
  console.log('пришел запрос на постановку лайка');
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } throw new NotFoundError(`Карточки с ID ${req.params.cardId} не существует`);
    })
    .catch((err) => next(err));
};

// удаление лайка
module.exports.deleteLike = (req, res, next) => {
  console.log('пришел запрос на удаление лайка');
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } throw new NotFoundError(`Карточки с ID ${req.params.cardId} не существует`);
    })
    .catch((err) => next(err));
};
