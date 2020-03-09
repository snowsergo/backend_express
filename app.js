const express = require('express');

const morgan = require('morgan'); // для логов
const mongoose = require('mongoose'); // для работы с базой данных
const bodyParser = require('body-parser');// подключили body-parser
const config = require('./config.js'); //  в этом файле временная база данных в формате json

const { PORT } = config;
const routerusers = require('./routes/users.js');
const routercards = require('./routes/cards.js');

const errorMiddleware = require('./middlewares/error.js');

const app = express();


// подключаем body-parser как мидлвару всего приложения
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// подключаемся к серверу mongo, mestodb - название бд
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// логгирование
app.use(morgan('combined'));

// временное решение для авторизации (для карточек)
// 5e63a876b704d81c746b9488

app.use((req, res, next) => {
  req.user = {
    _id: '5e63a876b704d81c746b9488',
  };
  next();
});

// app.use(express.static(path.join(__dirname, 'public'))); // убрали раздачу статики
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
