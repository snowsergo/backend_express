const router = require('express').Router();
// const fs = require('fs');
// const config = require('../config.js');
const {
  getAllCards, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
