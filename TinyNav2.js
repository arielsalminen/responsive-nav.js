/*! TinyNav2.js v0.2
 * https://github.com/viljamis/TinyNav2.js
 * http://viljamis.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/*jslint browser: true, sloppy: true, vars: true, plusplus: true, indent: 2 */

(function (w) {

  // TinyNav
  var tinynav = w.tinynav || {};

  var nav,
    nav_toggle,
    aria = "aria-hidden",
    computed = w.getComputedStyle ? true : false;

  // Set aria-hidden
  w.setAria = function () {
    if (computed) {
      if (w.getComputedStyle(nav_toggle, null).getPropertyValue("display") !== "none") {
        nav_toggle.setAttribute(aria, false);
        nav.setAttribute(aria, true);
      } else {
        nav_toggle.setAttribute(aria, true);
        nav.setAttribute(aria, false);
      }
    }
  };

  // Navigation
  w.navigation = function () {

    var nav_open = false,
      closed = "closed",
      opened = "opened";

    // Get element
    var getElement = function (el) {
      return w.document.getElementById(el);
    };

    // Default settings
    nav = getElement(tinynav.nav) || getElement("nav"); // String: #id of the nav
    nav_toggle = getElement(tinynav.nav_toggle) || getElement("nav-toggle"); // String: #id of the toggle

    // Determines if we should open or close the nav
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

    // Init aria on load
    w.setAria();

    // Mousedown
    nav_toggle.onmousedown = function () {
      nav_function();
    };

    // Touchstart event fires before the mousedown event
    // and can wipe the previous mousedown event
    nav_toggle.ontouchstart = function () {
      nav_toggle.onmousedown = null;
      nav_function();
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
