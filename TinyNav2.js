/*! TinyNav2.js v0.1 by @viljamis */
(function (w) {
 
  w.navigation = function () {
    var nav_open = false,
      doc = w.document,
      nav = doc.getElementById(tinynav.nav) || doc.getElementById('nav'),
      nav_toggle = doc.getElementById(tinynav.nav_toggle) || doc.getElementById('nav-toggle'),
      nav_function = function () {
        if (nav_open === false) {
          nav.className = nav.className.replace('closed', 'opened');
          nav_open = true;
        } else {
          nav.className = nav.className.replace('opened', 'closed');
          nav_open = false;
        }
        return false;
      };
    
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
  } else if (w.attachEvent) {
    w.attachEvent("onload", w.navigation);
  }
 
})(this);
