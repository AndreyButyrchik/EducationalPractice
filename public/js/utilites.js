/* eslint-disable no-unused-vars */
const utilities = (function utilities() {
  const formatDate = function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    let mm = date.getMonth() + 1;
    if (mm < 10) {
      mm = `0${mm}`;
    }

    let yy = date.getFullYear();
    if (yy < 10) {
      yy = `0${yy}`;
    }

    return `${dd}.${mm}.${yy}`;
  };

  const parseDate = function parseDate(key, value) {
    if (key === 'createdAt' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  };

  return {
    formatDate,
    parseDate
  };
}());
