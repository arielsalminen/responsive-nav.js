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

    // fn arg can be an object or a function, thanks to handleEvent
    // read more about the explanation at: http://www.thecssninja.com/javascript/handleevent
    addEvent = function (el, evt, fn, bubble) {
      if ('addEventListener' in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
          el.addEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === 'object' && fn.handleEvent) {
            el.addEventListener(evt, function (e) {
              // Bind fn as this and set first arg as event object
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ('attachEvent' in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn === 'object' && fn.handleEvent) {
          el.attachEvent('on' + evt, function () {
            // Bind fn as this
            fn.handleEvent.call(fn);
          });
        } else {
          el.attachEvent('on' + evt, fn);
        }
      }
    },

    removeEvent = function (el, evt, fn, bubble) {
      if ('removeEventListener' in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
          el.removeEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === 'object' && fn.handleEvent) {
            el.removeEventListener(evt, function (e) {
              // Bind fn as this and set first arg as event object
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ('detachEvent' in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn === 'object' && fn.handleEvent) {
          el.detachEvent("on" + evt, function () {
            // Bind fn as this
            fn.handleEvent.call(fn);
          });
        } else {
          el.detachEvent('on' + evt, fn);
        }
      }
    },

    getFirstChild = function (e) {
      var firstChild = e.firstChild;
      // skip TextNodes
      while (firstChild !== null && firstChild.nodeType !== 1) {
        firstChild = firstChild.nextSibling;
      }
      return firstChild;
    },

    log = function (s) { },

    responsiveNav = function (el, options) {
      var i;

      // Default options
      this.options = {
        transition: 300,    // Integer: Speed of the transition, in milliseconds, default is "300"
        label: "Menu",      // String: Label for the navigation toggle, default is "Menu"
        insert: "after",    // String: Insert the toggle before or after the navigation, default is "after"
        customToggle: "",   // Selector: Specify the ID of a custom toggle, default is ""
        debug: false        // Boolean: Log debug messages to console, true or false, default is "false"
      };

      // Wrapper
      var wrapperEl = el.replace("#", "");
      this.wrapper = document.getElementById(wrapperEl);

      // Inner wrapper
      this.wrapper.inner = getFirstChild(this.wrapper);

      // Transition speed
      this.wrapper.speed = parseFloat(this.options.transition);

      // User defined options
      for (i in options) {
        this.options[i] = options[i];
      }

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
      this._init(this);
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
        var speed = this.wrapper.speed + 10,
          wrapper = this.wrapper;

        wrapper.className = wrapper.className.replace(opened, closed);

        setTimeout(function () {
          wrapper.style.position = "absolute";
        }, speed);

        if (computed) {
          this.wrapper.setAttribute(aria, true);
        }

        navOpen = false;

        log("Closed nav");
      }
      return false;
    },

    handleEvent: function (e) {
      var evt = e || window.event,
        t = evt.target || evt.srcElement;

      switch (evt.type) {
      case "load":
        this._resize(evt);
        break;
      case "resize":
        this._resize(evt);
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

        navToggle = document.getElementById("nav-toggle");

        this._handleToggleStates();

        log("Default nav toggle created");
      } else {
        var toggleEl = this.options.customToggle.replace("#", "");
        navToggle = document.getElementById(toggleEl);
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
        speed = this.wrapper.speed;

      objStyle.WebkitTransition = "max-height " + speed + "ms";
      objStyle.MozTransition = "max-height " + speed + "ms";
      objStyle.OTransition = "max-height " + speed + "ms";
      objStyle.transition = "max-height " + speed + "ms";
    },

    _resize: function () {
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
