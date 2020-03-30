const router = require('express').Router();
const { celebrate, Joi } = require('celebrate'); // подключили валидацию

// const fs = require('fs');
// const config = require('../config.js');
const {
  getAllCards, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

// запрос всех карточек
router.get('/', getAllCards);

//  создание карточки
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(12),
  }),
}), createCard);

//  удаление карточки
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

// установка лайка
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), setLike);

// удаление лайка
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteLike);

module.exports = router;
