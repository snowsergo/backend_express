# Сервер на Express
Учебный сервер на express

## Текущая версия
1.0.2

## Функционол
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
http://localhost:3000/users
http://localhost:3000/cards
http://localhost:3000/users/id
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
