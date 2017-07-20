const defaultRem = 16;
const initFontSize = function (pStore = null) {
  window.jspx = (r) => {
    r = parseFloat(r / defaultRem);
    return r * rem;
  };

  let winWidth = window.screen.width;
  if (winWidth > 769) {
    setFontSize(defaultRem);
    return;
  }
  let rem = winWidth / 320 * defaultRem;
  setFontSize(rem);
};
const setFontSize = function (value) {
  document.getElementsByTagName('html')[0].style.fontSize = value + 'px';
};
export default {
  initFontSize,
};
