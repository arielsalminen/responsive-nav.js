var computed = !!window.getComputedStyle;

/**
 * getComputedStyle polyfill for old browsers
 */
if (!computed) {
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
