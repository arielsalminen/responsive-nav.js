/*! responsive-nav.js v1.1
 * https://github.com/viljamis/responsive-nav.js
 * http://responsive-nav.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/* jshint strict:false, forin:false, noarg:true, noempty:true, eqeqeq:true,
boss:true, bitwise:true, browser:true, devel:true, indent:2 */
/* exported responsiveNav */

var responsiveNav = (function (window, document) {

  var computed = !!window.getComputedStyle;

  // getComputedStyle polyfill
  if (!window.getComputedStyle) {
    window.getComputedStyle = function(el) {
      this.el = el;
      this.getPropertyValue = function(prop) {
        var re = /(\-([a-z]){1})/g;
        if (prop === "float") {
          prop = "styleFloat";
        }
        if (re.test(prop)) {
          prop = prop.replace(re, function () {
            return arguments[2].toUpperCase();
          });
        }
        return el.currentStyle[prop] ? el.currentStyle[prop] : null;
      };
      return this;
    };
  }

  var nav,
    opts,
    navToggle,
    docEl = document.documentElement,
    head = document.getElementsByTagName("head")[0],
    styleElement = document.createElement("style"),
    navOpen = false,

    // fn arg can be an object or a function, thanks to handleEvent
    // read more at: http://www.thecssninja.com/javascript/handleevent
    addEvent = function (el, evt, fn, bubble) {
      if ("addEventListener" in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
          el.addEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.addEventListener(evt, function (e) {
              // Bind fn as this and set first arg as event object
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("attachEvent" in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn === "object" && fn.handleEvent) {
          el.attachEvent("on" + evt, function () {
            // Bind fn as this
            fn.handleEvent.call(fn);
          });
        } else {
          el.attachEvent("on" + evt, fn);
        }
      }
    },

    removeEvent = function (el, evt, fn, bubble) {
      if ("removeEventListener" in el) {
        try {
          el.removeEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.removeEventListener(evt, function (e) {
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("detachEvent" in el) {
        if (typeof fn === "object" && fn.handleEvent) {
          el.detachEvent("on" + evt, function () {
            fn.handleEvent.call(fn);
          });
        } else {
          el.detachEvent("on" + evt, fn);
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

    setAttributes = function (el, attrs) {
      for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },

    addClass = function (el, cls) {
      el.className += " " + cls;
      el.className = el.className.replace(/(^\s*)|(\s*$)/g,"");
    },

    removeClass = function (el, cls) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
    },

    log = function () {},

    ResponsiveNav = function (el, options) {
      var i;

      // Default options
      this.options = {
        animate: true,        // Boolean: Use CSS3 transitions, true or false
        transition: 400,      // Integer: Speed of the transition, in milliseconds
        label: "Menu",        // String: Label for the navigation toggle
        insert: "after",      // String: Insert the toggle before or after the navigation
        customToggle: "",     // Selector: Specify the ID of a custom toggle
        tabIndex: 1,          // Integer: Specify the default toggle's tabindex
        openPos: "relative",  // String: Position of the opened nav, relative or static
        jsClass: "js",        // String: 'JS enabled' class which is added to <html> el
        debug: false,         // Boolean: Log debug messages to console, true or false
        init: function(){},   // Function: Init callback
        open: function(){},   // Function: Open callback
        close: function(){}   // Function: Close callback
      };

      // User defined options
      for (i in options) {
        if (i in this.options) {
          this.options[i] = options[i];
        } else {
          throw new Error("Responsive nav doesn't support option: " + i);
        }
      }

      // Adds "js" class for <html>
      addClass(docEl, this.options.jsClass);

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

      // Wrapper
      this.wrapperEl = el.replace("#", "");
      if (document.getElementById(this.wrapperEl)) {
        this.wrapper = document.getElementById(this.wrapperEl);
      } else {
        // If el doesn't exists, stop here.
        throw new Error("The nav element you are trying to select doesn't exist");
      }

      // Inner wrapper
      this.wrapper.inner = getFirstChild(this.wrapper);

      // For minification
      opts = this.options;
      nav = this.wrapper;

      // Init
      this._init(this);
    };

  ResponsiveNav.prototype = {

    // Public methods
    destroy: function () {
      this._removeStyles();
      removeClass(nav, "closed");
      removeClass(nav, "opened");
      nav.removeAttribute("style");
      nav.removeAttribute("aria-hidden");
      nav = null;
      _instance = null;

      removeEvent(window, "load", this, false);
      removeEvent(window, "resize", this, false);
      removeEvent(navToggle, "mousedown", this, false);
      removeEvent(navToggle, "touchstart", this, false);
      removeEvent(navToggle, "keyup", this, false);
      removeEvent(navToggle, "click", this, false);

      if (!opts.customToggle) {
        navToggle.parentNode.removeChild(navToggle);
      } else {
        navToggle.removeAttribute("aria-hidden");
      }

      log("Destroyed!");
    },

    toggle: function () {
      if (!navOpen) {
        removeClass(nav, "closed");
        addClass(nav, "opened");
        nav.style.position = opts.openPos;
        setAttributes(nav, {"aria-hidden": "false"});

        navOpen = true;
        opts.open();
        log("Opened nav");

      } else {
        removeClass(nav, "opened");
        addClass(nav, "closed");
        setAttributes(nav, {"aria-hidden": "true"});

        if (opts.animate) {
          setTimeout(function () {
            nav.style.position = "absolute";
          }, opts.transition + 10);
        } else {
          nav.style.position = "absolute";
        }

        navOpen = false;
        opts.close();
        log("Closed nav");
      }
    },

    handleEvent: function (e) {
      var evt = e || window.event;

      switch (evt.type) {
      case "mousedown":
        this._onmousedown(evt);
        break;
      case "touchstart":
        this._ontouchstart(evt);
        break;
      case "keyup":
        this._onkeyup(evt);
        break;
      case "click":
        this._onclick(evt);
        break;
      case "load":
        this._transitions(evt);
        this._resize(evt);
        break;
      case "resize":
        this._resize(evt);
        break;
      }
    },

    // Private methods
    _init: function () {
      log("Inited Responsive Nav");
      addClass(nav, "closed");
      this._createToggle();

      addEvent(window, "load", this, false);
      addEvent(window, "resize", this, false);
      addEvent(navToggle, "mousedown", this, false);
      addEvent(navToggle, "touchstart", this, false);
      addEvent(navToggle, "keyup", this, false);
      addEvent(navToggle, "click", this, false);
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
      if (!opts.customToggle) {
        var toggle = document.createElement("a");
        toggle.innerHTML = opts.label;
        setAttributes(toggle, {
          "href": "#",
          "id": "nav-toggle",
          "tabindex": opts.tabIndex
        });

        if (opts.insert === "after") {
          nav.parentNode.insertBefore(toggle, nav.nextSibling);
        } else {
          nav.parentNode.insertBefore(toggle, nav);
        }

        navToggle = document.getElementById("nav-toggle");
        log("Default nav toggle created");

      } else {
        var toggleEl = opts.customToggle.replace("#", "");

        if (document.getElementById(toggleEl)) {
          navToggle = document.getElementById(toggleEl);
          log("Custom nav toggle created");
        } else {
          throw new Error("The custom nav toggle you are trying to select doesn't exist");
        }
      }
    },

    _preventDefault: function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },

    _onmousedown: function (e) {
      var evt = e || window.event;
      // If the user isn't right clicking:
      if (!(evt.which === 3 || evt.button === 2)) {
        this._preventDefault(e);
        this.toggle(e);
      }
    },

    _ontouchstart: function (e) {
      // Touchstart event fires before
      // the mousedown and can wipe it
      navToggle.onmousedown = null;
      this._preventDefault(e);
      this.toggle(e);
    },

    _onkeyup: function (e) {
      var evt = e || window.event;
      if (evt.keyCode === 13) {
        this.toggle(e);
      }
    },

    _onclick: function (e) {
      this._preventDefault(e);
    },

    _transitions: function () {
      if (opts.animate) {
        var objStyle = nav.style,
          transition = "max-height " + opts.transition + "ms";

        objStyle.WebkitTransition = transition;
        objStyle.MozTransition = transition;
        objStyle.OTransition = transition;
        objStyle.transition = transition;
      }
    },

    _calcHeight: function () {
      var savedHeight = nav.inner.offsetHeight,
        innerStyles = "#" + this.wrapperEl + ".opened{max-height:" + savedHeight + "px}";

      // Hide from old IE
      if (computed) {
        styleElement.innerHTML = innerStyles;
        innerStyles = "";
      }

      log("Calculated max-height of " + savedHeight + "px and updated 'styleElement'");
    },

    _resize: function () {
      if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
        setAttributes(navToggle, {"aria-hidden": "false"});

        // If the navigation is hidden
        if (nav.className.match(/(^|\s)closed(\s|$)/)) {
          setAttributes(nav, {"aria-hidden": "true"});
          nav.style.position = "absolute";
        }

        this._createStyles();
        this._calcHeight();
      } else {
        setAttributes(navToggle, {"aria-hidden": "true"});
        setAttributes(nav, {"aria-hidden": "false"});
        nav.style.position = opts.openPos;
        this._removeStyles();
      }

      // Init callback
      opts.init();
    }

  };

  var _instance;
  function rn (el, options) {
    if (!_instance) {
      _instance = new ResponsiveNav(el, options);
    }
    return _instance;
  }

  return rn;
})(window, document);
