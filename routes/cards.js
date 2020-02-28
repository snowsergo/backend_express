const router = require('express').Router();
const fs = require('fs');
const config = require('../config.js');

const { cardsData } = config;
router.get('/', (req, res) => {
  const reader = fs.createReadStream(cardsData);
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  reader.pipe(res);
});

module.exports = router;
