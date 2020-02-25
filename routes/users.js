const router = require('express').Router(); // создали роутер
const users = require('../data/users.json'); // данные нужны для роутинга, поэтому импортируем их

router.get('/', (req, res) => {
  res.send(users);
});



router.get('/:id', (req, res, next) => {

  let userExist = false;

  for (let i=0; i < users.length; i++){
    if (req.params.id === users[i]['_id']){
      res.send(users[i]);
      userExist = true;
      return;
    }
  }

    if (!userExist){
      return next ({status: 404, message:{ message: "Нет пользователя с таким id" }})
    }
});

module.exports = router;