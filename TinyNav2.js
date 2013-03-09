/*! tinyNav2.js v0.61
 * https://github.com/viljamis/tinyNav2.js
 * http://tinynav2.viljamis.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/*jslint browser: true, sloppy: true, vars: true, plusplus: true, indent: 2 */

(function (w) {

  var tinyNav = w.tinyNav || {};

  var nav,
    navToggle,
    navInner,
    c = console,
    doc = w.document,
    aria = "aria-hidden",
    ua = navigator.userAgent,
    head = doc.getElementsByTagName("head")[0],
    styleEl = doc.createElement("style"),
    computed = w.getComputedStyle ? true : false,
    label = tinyNav.label || "Menu",
    debug = tinyNav.debug || false; // Boolean: log debug messages to console, true or false

  // Debug
  if (debug === true) {
    c.log("Inited Tinynav2.js");
  }

  // Create style element
  head.appendChild(styleEl);

  // Debug
  if (debug === true) {
    c.log("Created initial 'styleEl' to <head>");
  }

  // Resizer
  w.resizer = function () {
    if (computed) {
      if (w.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {

        // Set aria-hidden
        navToggle.setAttribute(aria, false);
        nav.setAttribute(aria, true);

        // Inject custom styles
        if (!styleEl.parentNode) {
          head.appendChild(styleEl);

          // Debug
          if (debug === true) {
            c.log("Appended 'styleEl' to <head>");
          }

        }
        var savedHeight = navInner.offsetHeight,
          innerStyles = "#nav.opened{max-height:" + savedHeight + "px }";
        styleEl.innerHTML = innerStyles;
        innerStyles = '';

        // Debug
        if (debug === true) {
          c.log("Calculated max-height of " + savedHeight + " pixels and updated 'styleEl'");
        }

      } else {

        // Set aria-hidden
        navToggle.setAttribute(aria, true);
        nav.setAttribute(aria, false);

        // Remove custom styles
        if (styleEl.parentNode) {
          styleEl.parentNode.removeChild(styleEl);

          // Debug
          if (debug === true) {
            c.log("Removed 'styleEl' from <head>");
          }

        }
      }
    }
  };

  // Navigation
  w.navigation = function () {

    var nav_open = false,
      closed = "closed",
      opened = "opened",
      getElement = function (el) {
        return doc.getElementById(el);
      };

    // Default selectors
    nav = getElement(tinyNav.nav) || getElement("nav"); // String: id of the nav
    navInner = getElement(tinyNav.navInner) || getElement("nav-inner"); // String: id of the nav wrapper

    // Create navigation toggle
    var toggle = doc.createElement("a");
    toggle.setAttribute("href", "#");
    toggle.setAttribute("id", "tinynav-toggle");
    toggle.innerHTML = label;
    nav.parentNode.insertBefore(toggle, nav.nextSibling);
    navToggle = getElement("tinynav-toggle");

    // Following tries to fix overflow: hidden; "bug" in Opera Mobile.
    // The problem seems to be that when using "max-height" on an element
    // the overflow: hidden; doesn't work anymore unless we also set
    // clip: rect(0 0 0 0); and position: absolute.
    // But in this case we don't really want absolute position,
    // so we need to override this in the css with static position
    // when the animation starts.
    //
    // This: https://dl.dropbox.com/u/2206960/GIF/panda.gif
    if (ua.match(/(Opera Mobi)/)) {
      nav.style.position = "absolute";
    }

    // Debug
    if (debug === true) {
      c.log("Navigation toggle created");
    }

    // Determines if we should open or close the nav
    var navFunction = function (e) {
        e.preventDefault();
        if (!nav_open) {
          nav.className = nav.className.replace(closed, opened);
          if (computed) {
            nav.setAttribute(aria, false);
          }
          nav_open = true;

          // Debug
          if (debug === true) {
            c.log("Opened navigation");
          }

        } else {
          nav.className = nav.className.replace(opened, closed);
          if (computed) {
            nav.setAttribute(aria, true);
          }
          nav_open = false;

          // Debug
          if (debug === true) {
            c.log("Closed navigation");
          }

        }
        return false;
      };

    // Init on load
    w.resizer();

    // Mousedown
    navToggle.onmousedown = function (e) {

      // Debug
      if (debug === true) {
        c.log("Detected mousedown");
      }

      navFunction(e);
    };

    // Touchstart event fires before the mousedown event
    // and can wipe the previous mousedown event
    navToggle.ontouchstart = function (e) {

      // Debug
      if (debug === true) {
        c.log("Detected touchstart");
      }

      navToggle.onmousedown = null;
      navFunction(e);
    };

    // On click
    navToggle.onclick = function () {
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
    w.addEventListener("resize", w.resizer, false);
  } else if (w.attachEvent) {
    w.attachEvent("onload", w.navigation);
    w.attachEvent("resize", w.resizer);
  }

})(this);
