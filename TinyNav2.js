/*! TinyNav2.js v0.2 by @viljamis */
(function (w) {

  var nav,
    nav_toggle,
    aria = 'aria-hidden',
    computed = w.getComputedStyle ? true : false;
  
  w.setAria = function() {
    if (computed) {
      if (w.getComputedStyle(nav_toggle).getPropertyValue('display') !== 'none') {
        nav_toggle.setAttribute(aria, false);
        nav.setAttribute(aria, true);
      }
      else {
        nav_toggle.setAttribute(aria, true);
        nav.setAttribute(aria, false);
      }
    }
  };
  
  w.navigation = function () {
    var nav_open = false,
       doc = w.document,
       closed = 'closed',
       opened = 'opened';
   
    nav = doc.getElementById(tinynav.nav) || doc.getElementById('nav'),
    nav_toggle = doc.getElementById(tinynav.nav_toggle) || doc.getElementById('nav-toggle');
   
    var nav_function = function () {
      if (!nav_open) {
          nav.className = nav.className.replace(closed, opened);
          if (computed) {
            nav.setAttribute(aria, false);
          }
          nav_open = true;
        } else {
          nav.className = nav.className.replace(opened, closed);
          if (computed) {
            nav.setAttribute(aria, true);
          }
          nav_open = false;
        }
        return false;
      };
  
    w.setAria();
    // Touchstart event fires before the mousedown event, and can wipe the mousedown event
    nav_toggle.onmousedown = function () {
      nav_function();
    };
    nav_toggle.ontouchstart = function () {
      nav_toggle.onmousedown = null;
      nav_function();
    };
    nav_toggle.onclick = function () {
      return false;
    };
  }
 
  // Run on domready (w.load as a fallback)
  if (w.addEventListener) {
    w.addEventListener("DOMContentLoaded", function () {
      w.navigation();
      // Run once only
      w.removeEventListener("load", w.navigation, false);
    }, false);
    w.addEventListener("load", w.navigation, false);
    w.addEventListener("resize", w.setAria, false);
  } else if (w.attachEvent) {
    w.attachEvent("onload", w.navigation);
    w.attachEvent("resize", w.setAria);
  }
 
})(this);
