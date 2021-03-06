const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // для хеширования пароля

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => /(^[А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$)|(^[A-Z][a-z]+( [A-Z][a-z]+)?$)/.test(value),
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /^https?:\/\/(www\.)?([a-z]+\.)+[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)(\.(?:jpg|jpeg|png))?$/.test(link),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /\w+([-.]*\w*)*?@\w+\.[a-z]{2,}/.test(value),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // Так по умлочанию хеш пароля пользователя не будет возвращаться из базы
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // здесь нужно возвращать хэш пароля
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);
