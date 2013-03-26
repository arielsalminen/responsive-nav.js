# Responsive Nav

### Responsive navigation plugin without library dependencies and with fast touch screen support.

Responsive Nav is a tiny JavaScript plugin (weighs 1.5kb minified and gzipped) which helps you to create toggled navigation for smaller screens. It uses touchstart and CSS3 transitions for the best possible performance. It also uses a “clever” workaround which makes it possible to transition from max-height: 0 to max-height: auto which isn’t normally possible with CSS3 transitions.

#### Features:

* Weighs only 1.5kb minified and gzipped.
* Doesn’t require any external libraries.
* Uses CSS3 transitions, touch events and simple markup.
* Removes the 300ms delay between a physical tap and the click&nbsp;event.
* Makes it possible to use CSS3 transitions with max-height:&nbsp;auto.
* Built accessibility in mind, <del>meaning that everything will work on the screen readers&nbsp;too.</del> Needs more testing, want to help me?
* Works in all major desktop and mobile browsers including IE6 and&nbsp;up.
* Navigation is accessible even when JavaScript is disabled.


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
			<li class="active"><a href="#">Home</a></li>
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
		transition: 400, // Integer: Speed of the transition, in milliseconds
		label: "Menu", // String: Label for the navigation toggle
		insert: "after", // String: Insert the toggle before or after the navigation
		customToggle: "", // Selector: Specify the ID of a custom toggle
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

`v1.00` (2013-03-25) - Release. Big thank you's for the help go out to [@cubiq](https://twitter.com/cubiq), [@stowball](https://twitter.com/stowball), [jcxplorer](https://twitter.com/jcxplorer) and [vesan](https://twitter.com/vesan)!


# Want to do a pull request?

Great! New ideas are more than welcome, but please check the [Pull Request Guidelines](https://github.com/viljamis/responsive-nav.js/wiki/Pull-Request-Guidelines/) first before doing so.
