/*global describe: false, it: false */
describe("polyfills", function () {

  /**
   * computed
   */
  describe("computed", function () {

    it("checks if getComputedStyles is supported and polyfills it if not", function () {
      var el = document.createElement("div");
      el.style.display = "inline";
      document.getElementsByTagName("body")[0].appendChild(el);
      var test = window.getComputedStyle(el);
      expect(test.display).toEqual("inline");
    });

  });

});
