require("@test");
setBodyFontSize();

function setBodyFontSize() {
  document.documentElement.style.fontSize = (window.innerWidth / 100) + 'px';
}
window.onresize = setBodyFontSize;