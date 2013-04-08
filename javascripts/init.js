// A fix is on the way to get Windows Phone 8 to recognize
// CSS pixels rather than device pixels (which is preferred behavior).
// In the meantime, use this javascript before any other script
// if you need an immediate patch:
//
// http://trentwalton.com/2013/01/16/windows-phone-8-viewport-fix/
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement("style");
  msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
  document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}
;
