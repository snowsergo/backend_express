const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /^https?:\/\/(www\.)?[a-z]+\.[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)\.(?:jpg|jpeg|png)$/.test(link),
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [], // пустой массив по умолчанию
  }],

  createdAt: {
    type: Date,
    default: Date.now, // текущая дата по умолчанию
  },

});

module.exports = mongoose.model('card', cardSchema);
