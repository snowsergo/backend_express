const router = require('express').Router(); // создали роутер
const fs = require('fs');
const fsPromises = require('fs').promises;
const config = require('../config.js');

const { usersData } = config;
router.get('/', (req, res) => {
  const reader = fs.createReadStream(usersData);
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  reader.pipe(res);
});

router.get('/:id', (req, res, next) => {
  fsPromises
    .readFile(usersData, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    // eslint-disable-next-line consistent-return
    .then((data) => {
      // eslint-disable-next-line no-underscore-dangle
      const user = data.find((elem) => elem._id === req.params.id);
      if (user === undefined) {
        return next({
          status: 404,
          message: { message: 'Нет пользователя с таким id' },
        });
      } res.send(user);
    });
});

module.exports = router;
