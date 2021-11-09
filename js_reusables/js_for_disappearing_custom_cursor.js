/*__ See css_for_disappearing_custom_cursor.css __*/
window.addEventListener("mousemove",cursorIsNotIdleF);
function cursorIsNotIdleF() {
  document.body.style.animationName = "reset";
  setTimeout(function() {
    document.body.style.animationName = "defaultCursorDisappearWhenIdle";
  },1500);
}

function hideCursorPermanently() {
  window.removeEventListener("mousemove",cursorIsNotIdleF);
  document.body.style.animationName = "noCursor";
}
