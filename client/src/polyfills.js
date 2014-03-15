var computed = !!window.getComputedStyle;
var elemsByClassName = !!document.getElementsByClassName;

/**
 * getComputedStyle polyfill for old browsers
 */
if (!computed) {
  window.getComputedStyle = function (el) {
    this.el = el;
    this.getPropertyValue = function (prop) {
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

/**
 * GetElementsByClassName polyfill for old browsers
 */
if (!elemsByClassName) {
  document.getElementsByClassName = function (match) {
    var result = [],
      elements = document.getElementsByTagName("*"),
      i, elem;
    match = " " + match + " ";
    for (i = 0; i < elements.length; i++) {
      elem = elements[i];
      if ((" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1) {
        result.push(elem);
      }
    }
    return result;
  };
}
