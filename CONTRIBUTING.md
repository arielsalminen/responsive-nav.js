# Pull Request Guidelines

Please follow these conventions below if you want to do a pull request.

## General

* Each pull request for a single feature or bug fix
* If you are planning on doing something big, please discuss first with [@viljamis](http://twitter.com/viljamis) about it
* Does it fit into the current design?

## Code formatting

* Don’t use tabs to indent, instead use Soft Tabs (spaces) with tab size of 2.
* Don’t leave trailing whitespaces.
* Use JShint with the following settings to check and format your JavaScript:

```
/* jshint strict:false, forin:false, noarg:true, noempty:true, eqeqeq:true,
boss:true, bitwise:true, browser:true, devel:true, indent:2 */
/* exported responsiveNav */
```

* When there is minified JavaScript, please use Google’s [Closure Compiler](http://closure-compiler.appspot.com/home) to minify the code.
