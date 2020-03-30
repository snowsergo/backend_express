const express = require('express');
const rateLimit = require('express-rate-limit'); // ограничени количества запросов

require('dotenv').config(); // модуль для работы с переменными окружения, в них будем хранить ключи

const helmet = require('helmet'); // модуль для простановки заголовков безопасности
const cookieParser = require('cookie-parser'); // для работы с куками
const morgan = require('morgan'); // для логов
const mongoose = require('mongoose'); // для работы с базой данных
const bodyParser = require('body-parser');// подключили body-parser
const { errors, celebrate, Joi } = require('celebrate');
const config = require('./config.js'); //  в этом файле временная база данных в формате json

const { PORT } = config;
const routerusers = require('./routes/users.js');
const routercards = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');


const errorMiddleware = require('./middlewares/error.js');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(cookieParser()); // подключаем парсер кук как мидлвэр
app.use(limiter); // ограничение на количество запросов
app.use(helmet()); // подключаем заголовки безопасности

// подключаем body-parser как мидлвару всего приложения
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// подключаемся к серверу mongo, mestodb - название бд
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// логгирование в командной строке
app.use(morgan('combined'));

// подключаем логгер запросов в файл
app.use(requestLogger);

// пользовательский вход, получаем токен
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// создаем нового пользователя
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().min(12),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);

app.use('/users', routerusers);
app.use('/cards', routercards);

// запрос на несуществующий адрес
/*
app.all('*', (req, res, next) => next({
  status: 404,
  message: { message: 'Запрашиваемый ресурс не найден' },
}));

*/
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// app.all('*', (req, res, next) => next);

// подключаем логгер ошибок в файл
app.use(errorLogger);

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
app.use(errorMiddleware);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
