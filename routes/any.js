const router = require('express').Router(); // создали роутер

router.get('/', (req, res, next) => {
  return next ({status: 401, message:{ message: "где ресурс" }})
});

module.exports = router; // экспортировали роутер