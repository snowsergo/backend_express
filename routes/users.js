const router = require('express').Router(); // создали роутер
// const fs = require('fs');
// const fsPromises = require('fs').promises;
// const config = require('../config.js');
const {
// createUser,
  getAllUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
// router.post('/', createUser); //   5e63a876b704d81c746b9488 для временного решения
router.patch('/me', updateUser); // обновление данных профиля
router.patch('/me/avatar', updateAvatar); // обновление аватара

module.exports = router;
