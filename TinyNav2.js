/*! tinyNav2.js v1.0
 * https://github.com/viljamis/tinyNav2.js
 * http://tinynav2.viljamis.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/*jslint forin: true, browser: true, sloppy: true, vars: true, plusplus: true, indent: 2, devel: true, nomen: true */

var TinyNav = (function (window, document) {

  var c = console,
    checkResize,
    navToggle,
    doc = window.document,
    aria = "aria-hidden",
    ua = navigator.userAgent,
    resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize',
    computed = window.getComputedStyle ? true : false,
    head = doc.getElementsByTagName("head")[0],
    styleEl = doc.createElement("style"),
    nav_open = false,
    closed = "closed",
    opened = "opened",

    addEvent = function (obj, type, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
      } else if (obj.attachEvent) {
        obj["e" + type + fn] = fn;
        obj[type + fn] = function () {
          obj["e" + type + fn](window.event);
        };
        obj.attachEvent("on" + type, obj[type + fn]);
      }
    },

    removeEvent = function (obj, type, fn) {
      if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false);
      } else if (obj.detachEvent) {
        obj.detachEvent("on" + type, obj[type + fn]);
        obj[type + fn] = null;
        obj["e" + type + fn] = null;
      }
    },

    TinyNav = function (el, options) {
      var i,
        navInner;

      // Wrapper
      this.wrapper = typeof el === "string" ? doc.querySelector(el) : el;

      // Save this for later
      this.wrapper.tinynav = this;

      // Default settings
      this.options = {
        label: "Menu", // String: Label for the navigation toggle, default is "Menu"
        debug: false, // Boolean: log debug messages to console, true or false
        navInner: "#nav ul" // Selector: selector for the inner wrapper
      };

      // User defined options
      for (i in options) {
        this.options[i] = options[i];
      }

      this.wrapper.className = this.wrapper.className + " closed";

      // Fixes overflow: hidden; bug in Opera Mobile
      if (ua.match(/(Opera Mobi)/)) {
        this.wrapper.style.position = "absolute";
      }

      var inner = this.options.navInner;
      this.wrapper.inner = typeof inner === "string" ? doc.querySelector(inner) : inner;

      // Init
      TinyNav.prototype.init(this);

      // Debug
      if (this.options.debug) {
        c.log("Inited Tinynav2.js");
      }
    };

  TinyNav.prototype = {

    init: function (obj) {
      if (this.initiated) {
        return;
      }
      this.initiated = true;
      this._createStyles(obj);
      this._createToggle(obj);
      function checkResize() {
        TinyNav.prototype._resizer(obj);
      }
      addEvent(window, "load", checkResize);
      addEvent(window, "resize", checkResize);
    },

    destroy: function () {
      this.initiated = false;
      styleEl.parentNode.removeChild(styleEl);
      this.wrapper.className = this.wrapper.className.replace(/(^|\s)closed(\s|$)/, " ");
      this.wrapper.tinynav = null;
      //this.wrapper.removeAttribute(aria);
      this._removeToggle();
      removeEvent(window, "load", checkResize);
      removeEvent(window, "resize", checkResize);
    },

    toggle: function (obj) {
      if (!nav_open) {
        this.wrapper.className = this.wrapper.className.replace(closed, opened);
        if (computed) {
          this.wrapper.setAttribute(aria, false);
        }
        nav_open = true;
        if (this.options.debug) {
          c.log("Opened navigation");
        }
      } else {
        this.wrapper.className = this.wrapper.className.replace(opened, closed);
        if (computed) {
          this.wrapper.setAttribute(aria, true);
        }
        nav_open = false;
        if (this.options.debug) {
          c.log("Closed navigation");
        }
      }
      return false;
    },


    _createStyles: function (obj) {
      if (!styleEl.parentNode) {
        head.appendChild(styleEl);
        if (obj.options.debug) {
          c.log("Created 'styleEl' to <head>");
        }
      }
    },

    _removeStyles: function (obj) {
      if (styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
        if (obj.options.debug) {
          c.log("Removed 'styleEl' from <head>");
        }
      }
    },

    _createToggle: function (obj) {
      var toggle = doc.createElement("a");
      toggle.setAttribute("href", "#");
      toggle.setAttribute("id", "tinynav-toggle");
      toggle.innerHTML = obj.options.label;
      obj.wrapper.parentNode.insertBefore(toggle, obj.wrapper.nextSibling);
      navToggle = doc.querySelector("#tinynav-toggle");
      if (obj.options.debug) {
        c.log("Navigation toggle created");
      }
      this._handleToggleStates(obj);
    },

    _removeToggle: function (obj) {
      navToggle.parentNode.removeChild(navToggle);
      if (obj.options.debug) {
        c.log("Navigation toggle removed");
      }
    },

    _handleToggleStates: function (obj) {
      // Mousedown
      navToggle.onmousedown = function (event) {
        event.preventDefault();
        obj.wrapper.tinynav.toggle();
        if (obj.options.debug) {
          c.log("Detected mousedown");
        }
      };

      // Touchstart event fires before the mousedown event
      // and can wipe the previous mousedown event
      navToggle.ontouchstart = function (event) {
        navToggle.onmousedown = null;
        event.preventDefault();
        obj.wrapper.tinynav.toggle();
        if (obj.options.debug) {
          c.log("Detected touchstart");
        }
      };

      // On click
      navToggle.onclick = function () {
        return false;
      };
    },

    _resizer: function (obj) {
      if (computed) {
        if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
          navToggle.setAttribute(aria, false);
          obj.wrapper.setAttribute(aria, true);

          this._createStyles(obj);

          var savedHeight = obj.wrapper.inner.offsetHeight,
            innerStyles = "#nav.opened{max-height:" + savedHeight + "px }";
          styleEl.innerHTML = innerStyles;
          innerStyles = '';
          if (obj.options.debug) {
            c.log("Calculated max-height of " + savedHeight + " pixels and updated 'styleEl'");
          }
        } else {
          navToggle.setAttribute(aria, true);
          obj.wrapper.setAttribute(aria, false);

          this._removeStyles(obj);
        }
      }
    }

  };

  return TinyNav;
})(window, document);
