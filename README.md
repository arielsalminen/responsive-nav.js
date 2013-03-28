# Responsive Nav

### Responsive navigation plugin without library dependencies and with fast touch screen support.

Responsive Nav is a tiny JavaScript plugin (weighs 1.5kb minified and gzipped) which helps you to create toggled navigation for smaller screens. It uses touchstart and CSS3 transitions for the best possible performance. It also uses a “clever” workaround which makes it possible to transition from height: 0 to height: auto which isn’t normally possible with CSS3 transitions.

#### Features:

* Weighs only 1.5kb minified and gzipped.
* Doesn’t require any external libraries.
* Uses CSS3 transitions, touch events and simple markup.
* Removes the 300ms delay between a physical tap and the click event.
* Makes it possible to use CSS3 transitions with height: auto.
* Built accessibility in mind, meaning that everything works on screen readers and JavaScript disabled too.
* Works in all major desktop and mobile browsers including IE6 and up.


# Demo

Better demos and site coming soon. In the meantime, try this: [viljamis.com/responsive-nav/](http://viljamis.com/responsive-nav/).


# Usage instructions

Following the steps below you will be able to get the plugin up and running. If you have any problems, please post them to GitHub issues.

1. Link files:
```html
	<!-- Put these into the <head> -->
	<script src="responsive-nav.js"></script>
	<link rel="stylesheet" href="responsive-nav.css">
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
		tabIndex: 1, // Integer: Specify the default toggle's tabindex
		openPos: "relative", // String: Position of the opened nav, relative or static
		jsClass: "js", // String: 'JS enabled' class which is added to <html> el
		debug: false // Boolean: Log debug messages to console, true or false
	});
```


# Public methods

`navigation.destroy();`

`navigation.toggle();`


# Tested on the following platforms

* iOS 4.2.1+
* Android 1.6+
* Windows Phone 7.5+
* Blackberry 7.0+
* Maemo 5.0+
* Meego 1.2+
* webOS 2.0+
* Symbian 3
* Windows XP
* Windows 7
* Mac OS X


# License

Licensed under the MIT license.

Copyright (c) 2013 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


# Changelog

`v1.04` (2013-03-28) - Bug fixes

`v1.03` (2013-03-28) - Adds option to disable CSS3 transitions

`v1.02` (2013-03-28) - Adds three new options: "tabIndex", "openPos" and "jsClass"

`v1.01` (2013-03-27) - Bug fixes

`v1.00` (2013-03-25) - Release. Big thank you’s for the help go out to [@cubiq](https://twitter.com/cubiq), [@stowball](https://twitter.com/stowball), [@jcxplorer](https://twitter.com/jcxplorer) and [@vesan](https://twitter.com/vesan)!


# Want to do a pull request?

Great! New ideas are more than welcome, but please check the [Pull Request Guidelines](CONTRIBUTING.md) first before doing so.
