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
const checkEmail = (val) => {
  var regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  return regex.test(val);
};

module.exports = {
  isEmpty,
  checkParms,
  checkEmail
};
