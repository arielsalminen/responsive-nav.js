
# Responsive Nav

### Responsive navigation plugin without library dependencies and with fast touch screen support.

[Responsive Nav](http://responsive-nav.com) is a tiny JavaScript plugin which weighs only 1.7 KB minified and Gzip’ed, and helps you to create a toggled navigation for small screens. It uses touch events and CSS3 transitions for the best possible performance. It also contains a “clever” workaround that makes it possible to transition from `height: 0` to `height: auto`, which isn’t normally possible with CSS3 transitions.


#### Features:

* Simple, semantic markup.
* Weighs only 1.7 KB minified and Gzip’ed.
* Doesn’t require any external library.
* Uses CSS3 transitions and touch events.
* Removes the 300 ms delay between a physical tap and the click event.
* Makes it possible to use CSS3 transitions with height: auto.
* Built with accessibility in mind, meaning that everything works on screen readers and with JavaScript disabled, too.
* Works in all major desktop and mobile browsers, including IE 6 and up.
* Free to use under the MIT license.


# Demo

* [Simple demo with IE support](http://responsive-nav.com/demo-respondjs/) (View the [source code](https://github.com/viljamis/responsive-nav.js/tree/master/demos/ie-support-using-respondjs))
* [Advanced demo](http://responsive-nav.com/demo/) (View the [source code](https://github.com/viljamis/responsive-nav.js/tree/master/demos/advanced-left-navigation))
* [Official website](http://responsive-nav.com) (works as a demo, too!)
* Seven additional examples included in this repository's [demos](https://github.com/viljamis/responsive-nav.js/tree/master/demos) folder.


# Usage instructions

Following the steps below you will be able to get the plugin up and running. If you notice any bugs, please post them to [GitHub issues](https://github.com/viljamis/responsive-nav.js/issues).

1. Link files:
```html
	<!-- Put these into the <head> -->
	<link rel="stylesheet" href="responsive-nav.css">
	<script src="responsive-nav.js"></script>
```

2. Add markup:
```html
	<div id="nav">
		<ul>
			<li><a href="#">Home</a></li>
			<li><a href="#">About</a></li>
			<li><a href="#">Projects</a></li>
			<li><a href="#">Contact</a></li>
	 	</ul>
	</div>
```

3. Hook up the plugin:
```html
<!-- Put this right before the </body> closing tag -->
	<script>
		var navigation = responsiveNav("#nav");
	</script>
```

4. Customizable options:
```javascript
	var navigation = responsiveNav("#nav", { // Selector: The ID of the wrapper
		animate: true, // Boolean: Use CSS3 transitions, true or false
		transition: 400, // Integer: Speed of the transition, in milliseconds
		label: "Menu", // String: Label for the navigation toggle
		insert: "after", // String: Insert the toggle before or after the navigation
		customToggle: "", // Selector: Specify the ID of a custom toggle
		openPos: "relative", // String: Position of the opened nav, relative or static
		jsClass: "js", // String: 'JS enabled' class which is added to <html> el
		init: function(){}, // Function: Init callback
		open: function(){}, // Function: Open callback
		close: function(){} // Function: Close callback
	});
```


# Public methods

`navigation.destroy();`

`navigation.toggle();`


# Tested on the following platforms

* iOS 4.2.1+
* Android 1.6+
* Windows Phone 7.5 & 7.8
* Blackberry 7.0+
* Blackberry Tablet 2.0+
* Kindle 3.3+	
* Maemo 5.0+
* Meego 1.2+
* Symbian 3
* Symbian Belle
* Symbian S40 Asha
* webOS 2.0+
* Windows XP
* Windows 7
* Mac OS X


# Roadmap

* Start using Grunt and add needed config to the repository
* Allow multiple instances of the navigation (get rid of the Singleton pattern)
* Better support for multiple navigation levels
* Investigate if it would be smoother using translateY or translate3d
* Better window.resize handling


# Special thanks

In random order:

* [Matteo Spinelli](https://twitter.com/cubiq)
* [Matt Stow](https://twitter.com/stowball)
* [Joao Carlos](https://twitter.com/jcxplorer)
* [Vesa Vänskä](https://twitter.com/vesan)


# License

Licensed under the MIT license.

Copyright (c) 2013 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


# Changelog

`1.0.14` (2013-04-13) - Adds touchend listener and stopProganation + prevents ghost click from happening on some Android browsers. "tabIndex" and "debug" settings are being removed.

`v1.11` (2013-04-09) - Performance optimization, bug fixes and 6 additional usage examples

`v1.07` (2013-04-03) - Simplifies the codebase and fixes few bugs

`v1.05` (2013-03-31) - Adds callback functionality and removes unnecessary CSS.

`v1.03` (2013-03-28) - Adds option to disable CSS3 transitions + three other options called "tabIndex", "openPos" and "jsClass".

`v1.00` (2013-03-25) - Release. Big thank you’s for the help go out to [@cubiq](https://twitter.com/cubiq), [@stowball](https://twitter.com/stowball), [@jcxplorer](https://twitter.com/jcxplorer) and [@vesan](https://twitter.com/vesan)!


# Want to do a pull request?

Great! New ideas are more than welcome, but please check the [Pull Request Guidelines](CONTRIBUTING.md) first before doing so.
