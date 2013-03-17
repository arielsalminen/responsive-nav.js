/*! responsive-nav.js v1.0
 * https://github.com/viljamis/responsive-nav.js
 * http://responsive-nav.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/*jslint forin: true, browser: true, sloppy: true, vars: true,
plusplus: true, indent: 2, devel: true, nomen: true */

var responsiveNav = (function (window, document) {

  var navToggle,

    aria = "aria-hidden",
    computed = window.getComputedStyle ? true : false,
    head = document.getElementsByTagName("head")[0],
    styleElement = document.createElement("style"),

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

    log = function (s) { },

    responsiveNav = function (el, options) {
      var i;

      // Wrapper
      this.wrapper = typeof el === "string" ? document.querySelector(el) : el;

      // Default options
      this.options = {
        inner: "#nav ul",   // Selector: Inner wrapper, default is "#nav ul"
        transition: 300,    // Integer: Speed of the transition, in milliseconds, default is "300"
        label: "Menu",      // String: Label for the navigation toggle, default is "Menu"
        insert: "after",    // String: Insert the toggle before or after the navigation, default is "after"
        customToggle: "",   // Selector: Specify a custom toggle here, default is ""
        debug: false        // Boolean: Log debug messages to console, true or false, default is "false"
      };

      // User defined options
      for (i in options) {
        this.options[i] = options[i];
      }

      // Inner wrapper
      var innerWrapper = this.options.inner;
      this.wrapper.inner = typeof innerWrapper === "string" ? document.querySelector(innerWrapper) : innerWrapper;

      // Debug logger
      if (this.options.debug) {
        log = function (s) {
          try {
            console.log(s);
          } catch (e) {
            alert(s);
          }
        };
      }

      // Init
      this._init();
    };

  responsiveNav.prototype = {

    // Public methods 
    destroy: function () {
      this.wrapper.className = this.wrapper.className.replace(/(^|\s)closed(\s|$)/, " ");
      this.wrapper.removeAttribute(aria);
      this.wrapper.inner = null;

      this._removeToggle();

      removeEvent(window, "load", this);
      removeEvent(window, "resize", this);

      styleElement.parentNode.removeChild(styleElement);

      log("Destroyed!");
    },

    toggle: function () {
      if (!navOpen) {
        this.wrapper.className = this.wrapper.className.replace(closed, opened);
        this.wrapper.style.position = "static";

        if (computed) {
          this.wrapper.setAttribute(aria, false);
        }

        navOpen = true;

        log("Opened nav");
      } else {
        var time = parseFloat(this.options.transition) + 10,
          wrapper = this.wrapper;

        wrapper.className = wrapper.className.replace(opened, closed);

        setTimeout(function () {
          wrapper.style.position = "absolute";
        }, time);

        if (computed) {
          this.wrapper.setAttribute(aria, true);
        }

        navOpen = false;

        log("Closed nav");
      }
      return false;
    },

    handleEvent: function(e) {
      switch(e.type) {
        case "load":
          this._resizer(e);
          break;
        case "resize":
          this._resizer(e);
          break;
      }
    },

    // Private methods
    _init: function () {
      log("Inited responsiveNav2.js");

      this.wrapper.className = this.wrapper.className + " closed";

      this._createStyles();
      this._createToggle();
      this._transitions();

      addEvent(window, "load", this);
      addEvent(window, "resize", this);
    },

    _createStyles: function () {
      if (!styleElement.parentNode) {
        head.appendChild(styleElement);

        log("Created 'styleElement' to <head>");
      }
    },

    _removeStyles: function () {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);

        log("Removed 'styleElement' from <head>");
      }
    },

    _createToggle: function () {
      if (!this.options.customToggle) {
        var toggle = document.createElement("a");

        toggle.setAttribute("href", "#");
        toggle.setAttribute("id", "nav-toggle");
        toggle.innerHTML = this.options.label;

        if (this.options.insert === "after") {
          this.wrapper.parentNode.insertBefore(toggle, this.wrapper.nextSibling);
        } else {
          this.wrapper.parentNode.insertBefore(toggle, this.wrapper);
        }

        navToggle = document.querySelector("#nav-toggle");

        this._handleToggleStates();

        log("Default nav toggle created");
      } else {
        navToggle = document.querySelector(this.options.customToggle);
        this._handleToggleStates();

        log("Custom nav toggle created");
      }
    },

    _removeToggle: function () {
      navToggle.parentNode.removeChild(navToggle);

      log("Nav toggle removed");
    },

    _handleToggleStates: function () {
      var that = this;

      // Mousedown
      navToggle.onmousedown = function (event) {
        if (that.preventDefault) {
          event.preventDefault();
        }
        that.toggle(event);
      };

      // Touchstart event fires before the mousedown event
      // and can wipe the previous mousedown event
      navToggle.ontouchstart = function (event) {
        navToggle.onmousedown = null;
        event.preventDefault();
        that.toggle(event);
      };

      // On click
      navToggle.onclick = function () {
        return false;
      };
    },

    _transitions: function () {
      var objStyle = this.wrapper.style,
        time = parseFloat(this.options.transition);

      objStyle.WebkitTransition = "max-height " + time + "ms";
      objStyle.MozTransition = "max-height " + time + "ms";
      objStyle.OTransition = "max-height " + time + "ms";
      objStyle.transition = "max-height " + time + "ms";
    },

    _resizer: function () {
      if (computed) {
        if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
          navToggle.setAttribute(aria, false);

          if (this.wrapper.className.match(/(^|\s)closed(\s|$)/)) {
            this.wrapper.setAttribute(aria, true);
            this.wrapper.style.position = "absolute";
          }

          this._createStyles();

          var savedHeight = this.wrapper.inner.offsetHeight,
            innerStyles = "#nav.opened{max-height:" + savedHeight + "px }";

          styleElement.innerHTML = innerStyles;
          innerStyles = '';

          log("Calculated max-height of " + savedHeight + "px and updated 'styleElement'");
        } else {
          navToggle.setAttribute(aria, true);
          this.wrapper.setAttribute(aria, false);
          this.wrapper.style.position = "static";

          this._removeStyles();
        }
      }
    }

  };

  return responsiveNav;
})(window, document);
