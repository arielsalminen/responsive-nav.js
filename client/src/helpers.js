/* exported addEvent, removeEvent, getChildren, setAttributes, addClass, removeClass, forEach */
// fn arg can be an object or a function, thanks to handleEvent
// read more at: http://www.thecssninja.com/javascript/handleevent
var addEvent = function (el, evt, fn, bubble) {
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

  getChildren = function (e) {
    if (e.children.length < 1) {
      throw new Error("The Nav container has no containing elements");
    }
    // Store all children in array
    var children = [];
    // Loop through children and store in array if child != TextNode
    for (var i = 0; i < e.children.length; i++) {
      if (e.children[i].nodeType === 1) {
        children.push(e.children[i]);
      }
    }
    return children;
  },

  setAttributes = function (el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  },

  addClass = function (el, cls) {
    if (el.className.indexOf(cls) !== 0) {
      el.className += " " + cls;
      el.className = el.className.replace(/(^\s*)|(\s*$)/g,"");
    }
  },

  removeClass = function (el, cls) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
  },

  // forEach method that passes back the stuff we need
  forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  };
