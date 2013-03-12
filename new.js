var TinyNav = (function (window, document) {

  var c = console,
    checkResize,
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

    getElement = function (el) {
      return doc.getElementById(el);
    },

    TinyNav = function (el, options) {
      var i,
      navToggle,
      navInner;

      // Determine the wrapper
      this.wrapper = typeof el == "string" ? doc.querySelector(el) : el;
      
      console.log(this.wrapper);

      // Default settings
      this.options = {
        label: "Menu", // String: Label for the navigation toggle, default is "Menu"
        debug: false, // Boolean: log debug messages to console, true or false
        navInner: "#nav ul" // Selector: selector for the inner wrapper
      };

      // User defined options
      for (i in options) this.options[i] = options[i];

      this.wrapper.className = this.wrapper.className + " closed";

      // Fixes overflow: hidden; bug in Opera Mobile
      if (ua.match(/(Opera Mobi)/)) {
        this.wrapper.style.position = "absolute";
      }

      var inner = this.options.navInner;
      this.wrapper.inner = typeof inner == "string" ? doc.querySelector(inner) : inner;

      // Init
      TinyNav.prototype.init(this);

      // Debug
      if (this.options.debug) c.log("Inited Tinynav2.js");
    };

  TinyNav.prototype = {
    handleEvent: function (e) {
      switch(e.type) {
        case "onmousedown":
          alert("foo")
          break;
        default:
          alert("problems")
      }
    },

    init: function (el) {
      if (this.initiated) return;
      this.initiated = true;
      this._createStyles(el);
      this._createToggle(el);
      function checkResize() {
        TinyNav.prototype._resizer(el);
      }
      window.addEventListener("load", checkResize, false);
      window.addEventListener(resizeEvent, checkResize, false);
    },

    destroy: function () {
      this.initiated = false;
      styleEl.parentNode.removeChild(styleEl);
      this.wrapper.className = this.wrapper.className.replace(/(^|\s)closed(\s|$)/, " ");
      //this.wrapper.removeAttribute(aria);
      this._removeToggle();
      window.removeEventListener("load", checkResize, false);
      window.removeEventListener(resizeEvent, checkResize, false);
    },

    _createStyles: function (el) {
      if (!styleEl.parentNode) {
        head.appendChild(styleEl);
        if (el.options.debug) c.log("Created 'styleEl' to <head>");
      }
    },

    _removeStyles: function (el) {
      if (styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
        if (el.options.debug) c.log("Removed 'styleEl' from <head>");
      }
    },

    _createToggle: function (el) {
      var toggle = doc.createElement("a");
      toggle.setAttribute("href", "#");
      toggle.setAttribute("id", "tinynav-toggle");
      toggle.innerHTML = el.options.label;
      el.wrapper.parentNode.insertBefore(toggle, el.wrapper.nextSibling);
      navToggle = getElement("tinynav-toggle");
      if (el.options.debug) c.log("Navigation toggle created");
      this._handleToggleStates(el);
    },

    _removeToggle: function (el) {
      navToggle.parentNode.removeChild(navToggle);
      if (el.options.debug) c.log("Navigation toggle removed");
    },
    
    _toggle: function (el) {
      if (!nav_open) {
        el.wrapper.className = el.wrapper.className.replace(closed, opened);
        if (computed) {
          el.wrapper.setAttribute(aria, false);
        }
        nav_open = true;
        if (el.options.debug) c.log("Opened navigation");
      } else {
        el.wrapper.className = el.wrapper.className.replace(opened, closed);
        if (computed) {
          el.wrapper.setAttribute(aria, true);
        }
        nav_open = false;
        if (el.options.debug) c.log("Closed navigation");
      }
      return false;
    },

    _handleToggleStates: function (el) {
      // Mousedown
      navToggle.onmousedown = function () {
        event.preventDefault();
        TinyNav.prototype._toggle(el);
        if (el.options.debug) c.log("Detected mousedown");
      };
      // Touchstart event fires before the mousedown event
      // and can wipe the previous mousedown event
      navToggle.ontouchstart = function (event) {
        navToggle.onmousedown = null;
        event.preventDefault();
        TinyNav.prototype._toggle(el);
        if (el.options.debug) c.log("Detected touchstart");
      };
      // On click
      navToggle.onclick = function () {
        return false;
      };
    },

    _resizer: function (el) {
      if (computed) {
        if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
          navToggle.setAttribute(aria, false);
          el.wrapper.setAttribute(aria, true);

          this._createStyles(el);

          var savedHeight = el.wrapper.inner.offsetHeight,
            innerStyles = "#nav.opened{max-height:" + savedHeight + "px }";
          styleEl.innerHTML = innerStyles;
          innerStyles = '';
          if (el.options.debug) c.log("Calculated max-height of " + savedHeight + " pixels and updated 'styleEl'");
        } else {
          navToggle.setAttribute(aria, true);
          el.wrapper.setAttribute(aria, false);

          this._removeStyles(el);
        }
      }
    }
  };

  return TinyNav;
})(window, document);