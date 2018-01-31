const TOKEN_KEY = 'token';
const UUID = 'uuid';
const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;

const clearCookie = () => {
  setCookie(TOKEN_KEY, null, -1);
  myCookie.userId = '';
  myCookie.userState = '0';
  myCookie.userImage = '';
  window.location.reload();
};

const saveCookie = (userId, userState, userImage) => {
  var cookie = userId + '-' + userState + '-' + userImage;
  console.log('setCookie:' + myCookie);
  setCookie(TOKEN_KEY, cookie, ONE_DAY);
  myCookie.userId = userId;
  myCookie.userState = userState;
  myCookie.userImage = userImage;
};

const refresh = () => {
  var cookies = getCookieValue(TOKEN_KEY);
  console.log('cookies:' + cookies);
  if (cookies) {
    var array = cookies.split('-');
    if (array) {
      myCookie.userId = array[0];
      myCookie.userState = array[1];
      myCookie.userImage = array[2];
      console.log('refresh-userId:' + myCookie.userId);
      console.log('refresh-userState:' + myCookie.userState);
    }
  }
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
const myCookie = {
  userImage: '',
  userId: '',
  userState: '0'//默认0游客；1注册未激活；2注册已经激活/已登录
};
// auth
module.exports = {
  myCookie,
  refresh,
  saveCookie,
  setCookie,
  getCookieValue,
  clearCookie,
  TOKEN_KEY,
  ONE_HOUR,
  ONE_DAY,
  UUID
};
