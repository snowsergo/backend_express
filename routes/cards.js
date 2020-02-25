const router = require('express').Router(); // создали роутер
const cards= require('../data/cards.json'); // данные нужны для роутинга, поэтому импортируем их

router.get('/', (req, res) => {
  res.send(cards);
});

module.exports = router; // экспортировали роутер