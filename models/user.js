const mongoose = require('mongoose');

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
      validator: (link) => /^https?:\/\/(www\.)?[a-z]+\.[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)\.(?:jpg|jpeg|png)$/.test(link),
    },
  },
});

module.exports = mongoose.model('user', userSchema);
