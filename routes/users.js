const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate'); // подключили валидацию
// const fs = require('fs');
// const fsPromises = require('fs').promises;
// const config = require('../config.js');
const {
// createUser,
  getAllUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

// router.post('/', createUser); //   5e63a876b704d81c746b9488 для временного решения

// обновление данных профиля
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}),
updateUser);


router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(12),
  }),
}), updateAvatar); // обновление аватара

module.exports = router;
