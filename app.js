const express = require('express');
const path = require('path');
const morgan = require('morgan');

const config = require('./config.js');

const { PORT } = config;
const routerusers = require('./routes/users.js');
const routercards = require('./routes/cards.js');

const errorMiddleware = require('./middlewares/error.js');

const app = express();
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам
app.use('/users', routerusers); // запускаем
app.use('/cards', routercards); // запускаем
// запрос на несуществующий адрес
app.all('*', (req, res, next) => next({
  status: 404,
  message: { message: 'Запрашиваемый ресурс не найден' },
}));
app.use(errorMiddleware);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
