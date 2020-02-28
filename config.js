const { PORT = 3000 } = process.env;
const cardsData = './data/cards.json';
const usersData = './data/users.json';

module.exports = {
  PORT,
  cardsData,
  usersData,
};
