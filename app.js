const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const routerUsers = require('./routes/users.js');
const routerCards = require('./routes/cards.js');

const  logger  = require('./middlewares/logger.js');
const errorMiddleware = require('./middlewares/error.js');
const app = express();

app.use(logger);
app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам
app.use('/users', routerUsers); // запускаем
app.use('/cards', routerCards); // запускаем
app.get('*', (req, res) => {
     res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' })
   })
app.use(errorMiddleware);



app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
});



