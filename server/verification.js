const fs = require('fs');
const hash = require('./hashFunc');

const verification = (function verification() {
  function readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  const getUserPassword = async function getUser(login) {
    const data = await readFile('./data/passwords.json');
    const users = new Map(JSON.parse(data));
    const password = users.get(login);
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
    const hashPassword = hash.sha512(password, userPassword.salt);
    if (hashPassword.value !== userPassword.value) {
      return false;
    }
    return { username: login, password };
  };
  return {
    verifyPassword
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
