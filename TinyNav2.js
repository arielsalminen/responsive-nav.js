/*! tinyNav2.js v1.0
 * https://github.com/viljamis/tinyNav2.js
 * http://tinynav2.viljamis.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/*jslint forin: true, browser: true, sloppy: true, vars: true, plusplus: true, indent: 2, devel: true, nomen: true */

var TinyNav = (function (window, document) {

  var navToggle,
    checkResize,

    doc = window.document,
    aria = "aria-hidden",
    ua = navigator.userAgent,
    computed = window.getComputedStyle ? true : false,
    head = doc.getElementsByTagName("head")[0],
    styleElement = doc.createElement("style"),

    navOpen = false,
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

    log = function (s) {
      try {
        console.log(s);
      } catch (e) {
        alert(s);
      }
    },

    TinyNav = function (el, options) {
      var i;

      // Wrapper
      this.wrapper = typeof el === "string" ? doc.querySelector(el) : el;

      // Save this
      this.wrapper.TinyNav = this;

      // Default options
      this.options = {
        inner: "#nav ul", // Selector: selector for the inner wrapper
        transition: 300, // Integer: Speed of the transition, in milliseconds
        label: "Menu", // String: Label for the navigation toggle, default is "Menu"
        debug: false // Boolean: log debug messages to console, true or false
      };

      // User defined options
      for (i in options) {
        this.options[i] = options[i];
      }

      // Inner wrapper
      var innerWrapper = this.options.inner;
      this.wrapper.inner = typeof innerWrapper === "string" ? doc.querySelector(innerWrapper) : innerWrapper;

      // Init
      TinyNav.prototype._init(this);
    };

  TinyNav.prototype = {

    // Public methods
    destroy: function () {
      this.wrapper.className = this.wrapper.className.replace(/(^|\s)closed(\s|$)/, " ");
      this.wrapper.removeAttribute(aria);
      this.wrapper.TinyNav = null;
      this.wrapper.inner = null;

      this._removeToggle();

      removeEvent(window, "load", checkResize);
      removeEvent(window, "resize", checkResize);

      styleElement.parentNode.removeChild(styleElement);

      if (this.options.debug) {
        log("TinyNav2 destroyed");
      }
    },

    toggle: function (obj) {
      if (!navOpen) {
        this.wrapper.className = this.wrapper.className.replace(closed, opened);
        this.wrapper.style.position = "static";

        if (computed) {
          this.wrapper.setAttribute(aria, false);
        }

        navOpen = true;

        if (this.options.debug) {
          log("Opened navigation");
        }
      } else {
        var time = parseFloat(this.options.transition) + 10,
          wrapper = this.wrapper;

        wrapper.className = wrapper.className.replace(opened, closed);

        setTimeout(function() {
          wrapper.style.position = "absolute";
        }, time);

        if (computed) {
          this.wrapper.setAttribute(aria, true);
        }

        navOpen = false;

        if (this.options.debug) {
          log("Closed navigation");
        }
      }
      return false;
    },

    // Private methods
    _init: function (obj) {
      if (obj.options.debug) {
        log("Inited Tinynav2.js");
      }

      obj.wrapper.className = obj.wrapper.className + " closed";

      this._createStyles(obj);
      this._createToggle(obj);
      this._transitions(obj);

      checkResize = function () {
        TinyNav.prototype._resizer(obj);
      };

      addEvent(window, "load", checkResize);
      addEvent(window, "resize", checkResize);
    },

    _createStyles: function (obj) {
      if (!styleElement.parentNode) {
        head.appendChild(styleElement);

        if (obj.options.debug) {
          log("Created 'styleElement' to <head>");
        }
      }
    },

    _removeStyles: function (obj) {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);

        if (obj.options.debug) {
          log("Removed 'styleElement' from <head>");
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

      this._handleToggleStates(obj);

      if (obj.options.debug) {
        log("Navigation toggle created");
      }
    },

    _removeToggle: function (obj) {
      navToggle.parentNode.removeChild(navToggle);

      if (this.options.debug) {
        log("Navigation toggle removed");
      }
    },

    _handleToggleStates: function (obj) {
      // Mousedown
      navToggle.onmousedown = function (event) {
        obj.wrapper.TinyNav.toggle(event);
        if (obj.options.debug) {
          log("Detected mousedown");
        }
      };

      // Touchstart event fires before the mousedown event
      // and can wipe the previous mousedown event
      navToggle.ontouchstart = function (event) {
        navToggle.onmousedown = null;
        obj.wrapper.TinyNav.toggle(event);
      };

      // On click
      navToggle.onclick = function () {
        return false;
      };
    },

    _transitions: function (obj) {
      var objStyle = obj.wrapper.style,
        time = parseFloat(obj.options.transition);

      objStyle.WebkitTransition = "max-height " + time + "ms";
      objStyle.MozTransition = "max-height " + time + "ms";
      objStyle.OTransition = "max-height " + time + "ms";
      objStyle.transition = "max-height " + time + "ms";
    },

    _resizer: function (obj) {
      if (computed) {
        if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
          navToggle.setAttribute(aria, false);

          if (obj.wrapper.className === closed) {
            obj.wrapper.setAttribute(aria, true);
            obj.wrapper.style.position = "absolute";
          }

          this._createStyles(obj);

          var savedHeight = obj.wrapper.inner.offsetHeight,
            innerStyles = "#nav.opened{max-height:" + savedHeight + "px }";

          styleElement.innerHTML = innerStyles;
          innerStyles = '';

          if (obj.options.debug) {
            log("Calculated max-height of " + savedHeight + " pixels and updated 'styleElement'");
          }
        } else {
          navToggle.setAttribute(aria, true);
          obj.wrapper.setAttribute(aria, false);
          obj.wrapper.style.position = "static";

          this._removeStyles(obj);
        }
      }
    }

  };

  return TinyNav;
})(window, document);
