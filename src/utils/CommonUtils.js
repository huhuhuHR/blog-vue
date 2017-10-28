const isEmpty = (value) => {
  return typeof value === 'undefined'
    ||
    value === null
    ||
    value.trim() === '';
};
const checkParms = (params) => {
  for (var i in params) {
    if (isEmpty(params[i])) {
      return '1';
    }
  }
};

module.exports = {
  isEmpty,
  checkParms
};
