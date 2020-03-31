# Сервер на Express
Учебный сервер на express

## Текущая версия
3.0.2

## Ссылки на приложение
  *[https://www.snowsergo-mesto.tk](https://www.snowsergo-mesto.tk)
  *[https://snowsergo-mesto.tk](https://snowsergo-mesto.tk)
  *[http://84.201.147.150/](http://84.201.147.150/)

## Функционол

### version 3.0.2
- добавлена централизованная обработка ошибок
- валидированы запросы
- добавленно логгирование ошибок и запросов в файл

### version 3.0.1
- исправлены статусы ошибок
- исправлена валидация аватара


### version 3.0.0
- добавлена аутентификация по email и password
- добавлена авторизация по jwt токену который приходит в http куке
- улучшена безопасность


### version 2.0.0
- удалена раздача статики (принцип REST)
- подключена база данных MONGO
- использованы модели и схемы пользователя и карточки
- все запросы взаимодействуют с локальной базой данных
- контроллеры вынесены из роутов
- добавлена валидация ссылок
- код проведен через eslint

### version 1.0.0
- ввозвращение массива пользователей по запросу /users
- возвращение данных пользователя по запросу /users/id
- возвращение массива карточек по запросу /cards
- обработка ошибок несуществующий id и несуществующий адрес
- запросы можно проверить в postman по адресу http://localhost:3000

## Установка проекта

Скопируйте проект на компьютер:

```
git clone https://github.com/snowsergo/backend_express.git
```

Установите зависимости проекта:

```
npm i
```

Отправляйте запросы вида:

```
http://localhost:3000/users (GET)
http://localhost:3000/user (POST)
http://localhost:3000/users/id (GET)
http://localhost:3000/users/me (PATCH)
http://localhost:3000/users/avatar (PATCH)

http://localhost:3000/cards (GET,POST)
http://localhost:3000/cards/id (DELETE)
http://localhost:3000/cards/:cardId/likes (PUT, DELETE)

```

## Работа

Режим development:

Сборка для сервера c hot-reload (nodemon)

```
npm run dev
```

Режим development:

Сборка для сервера без hot-reload

```
npm run start
```
