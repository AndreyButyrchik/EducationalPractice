const mongoose = require('mongoose');
const hash = require('./hashFunc');

const verification = (function verification() {
  const PostScheme = new mongoose.Schema({
    password: Object,
    login: String,
  });

  const Passwords = mongoose.model('Passwords', PostScheme);

  const getUserPassword = async function getUser(log) {
    const password = await Passwords.findOne({ login: log });
    if (password !== undefined) {
      return password;
    }
    return false;
  };

  const verifyPassword = async function verifyPassword(login, password) {
    const userPassword = await getUserPassword(login);
    if (!userPassword) {
      return false;
    }
    const hashPassword = hash.sha512(password, userPassword.password.salt);
    if (hashPassword.value !== userPassword.password.value) {
      return false;
    }
    return { username: login, password };
  };

  return {
    verifyPassword,
  };
}());

module.exports = verification;

// const acc = [
//   ['Катя Пляжная', 'kate2012'],
//   ['Луи Кирпич', 'meexxy47'],
//   ['Галя Печка', 'deadlock15'],
//   ['Дима Зевс', 'loqiemean78'],
//   ['Рома Торпеда', 'unforgiven44'],
//   ['Димон Кудрявый', 'metallica19'],
//   ['Вася Сиплый', 'loopest74'],
//   ['Фил Ночной', 'pathcont12'],
//   ['Зоя Кожаный-Затылок', 'sandman49'],
//   ['Леха Краснопёрый', 'pepcoin0007'],
//   ['Танюха Мазь', 'smells745'],
//   ['Павлик Подгубный', 'like9542'],
//   ['Даня Фазан', 'teen663'],
//   ['Шурик Веселый', 'spirit1421'],
//   ['Саша Соска', 'muter412'],
//   ['Ислам Чех', 'teQuieroPuta759'],
//   ['Вано Питон', 'du75231'],
//   ['Ульянка Куст', 'hast58561'],
//   ['Гена Орешек', 'LeTai323'],
//   ['Ромчик Гвоздь', 'Sawyer741']
// ];
