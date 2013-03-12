var TinyNav = (function (window, document) {
  var TinyNav = function (el, options) {
      var i,
      nav,
      navToggle,
      navInner,
      c = console,
      doc = w.document,
      aria = "aria-hidden",
      ua = navigator.userAgent,
      head = doc.getElementsByTagName("head")[0],
      styleEl = doc.createElement("style"),
      computed = w.getComputedStyle ? true : false;

      this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
      this.options = {
        label: "Menu", // String: Label for the navigation toggle, default is "Menu"
        debug: true // Boolean: log debug messages to console, true or false
      };

      // User defined options
      for (i in options) this.options[i] = options[i];
      
      TinyNav.prototype.__resize();

    };

  TinyNav.prototype = {
    pageIndex: 0,
    customEvents: [],

    next: function () {
    },

    prev: function () {
    },

    /** Pseudo private methods */
    __resize: function () {
    }
  };

  return TinyNav;
})(window, document);