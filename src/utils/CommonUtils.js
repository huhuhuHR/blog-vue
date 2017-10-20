const isEmpty = (value) => {
  return typeof value === 'undefined'
    ||
    value === null
    ||
    value.trim() === '';
};

module.exports = {
  isEmpty
};
