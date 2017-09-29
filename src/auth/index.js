const TOKEN_KEY = 'uuid';
const TOKEN_KEY_EXPIRE_TIME = 1000 * 60 * 30;

const checkAuth = () => {
  let token = getCookieValue(TOKEN_KEY);
  cookie.authenticated = !!token;
};

const clearCookie = () => {
  setCookie(cookie.cookieName, null, -1);
};
const saveCookie = (value, id) => {
  let name = TOKEN_KEY;
  let expireTime = TOKEN_KEY_EXPIRE_TIME;
  setCookie(name, value, expireTime);
  cookie.accountId = id;
};
const getCookieValue = (name) => {
  var cookieValues = new RegExp('(^| )' + name + '=([^;]*)(;|$)').exec(document.cookie);
  return cookieValues ? cookieValues[2] : null;
};

const setCookie = (name, value, expireTime) => {
  var expiresDate;
  expireTime && (expiresDate = new Date(), expiresDate.setTime(expiresDate.getTime() + expireTime));
  document.cookie = name + '=' + value + (expiresDate ? '; expires=' + expiresDate.toGMTString() : '');
};
const cookie = {
  authenticated: false,
  cookieName: '',
  accountId: ''
};

export default {
  cookie,
  checkAuth,
  saveCookie,
  clearCookie
};
