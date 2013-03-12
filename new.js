var TinyNav = (function (window, document) {

  var c = console,
    doc = window.document,
    aria = "aria-hidden",
    ua = navigator.userAgent,
    computed = window.getComputedStyle ? true : false,
    head = doc.getElementsByTagName("head")[0],
    styleEl = doc.createElement("style"),
    nav_open = false,
    closed = "closed",
    opened = "opened",

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
      this.wrapper.inner = typeof this.options.navInner == "string" ? doc.querySelector(this.options.navInner) : this.options.navInner;

      // Init
      TinyNav.prototype.init(this);

      // Debug
      if (this.options.debug) c.log("Inited Tinynav2.js");
    };

  TinyNav.prototype = {
    init: function (el) {
      if (this.initiated) return;
      this.initiated = true;
      this.__createStyles(el);
      // window.addEventListener(resizeEvent, this, false);
      // this.wrapper.addEventListener(startEvent, this, false);
    },

    msg: function () {
      c.log("msg method called");
    },

    destroy: function () {
      // window.removeEventListener(resizeEvent, this, false);
      // this.wrapper.removeEventListener(startEvent, this, false);
      // etc
    },

    // Private methods
    __createStyles: function (el) {
      if (!styleEl.parentNode) {
        head.appendChild(styleEl);
        if (el.options.debug) c.log("Created 'styleEl' to <head>");
      }
    },

    __removeStyles: function (el) {
      // Remove custom styles
      if (styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
        if (el.options.debug) c.log("Removed 'styleEl' from <head>");
      }
    },
    
    __injectStyles: function (el) {
      var savedHeight = navInner.offsetHeight,
        innerStyles = "#nav.opened{max-height:" + savedHeight + "px }";
      styleEl.innerHTML = innerStyles;
      innerStyles = '';
      if (el.options.debug) c.log("Calculated max-height of " + savedHeight + " pixels and updated 'styleEl'");
    },

    __resizer: function () {
      
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
    }
  };

  return TinyNav;
})(window, document);