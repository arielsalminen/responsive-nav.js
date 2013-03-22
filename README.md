# Responsive Nav.js

### Responsive Navigation plugin without library dependencies and with fast touch screen support.

Responsive Nav is a tiny JavaScript plugin (weighs ~1kb) which helps you to create toggled navigation for smaller screens. It uses touchstart and CSS3 transitions for the best possible performance. It also uses a “clever” workaround which makes it possible to transition from max-height: 0 to max-height: auto which isn’t normally possible with CSS3 transitions.

#### Features:

* ~1kb minified and gzipped
* Doesn’t require any external libraries
* Simple markup using lists
* Uses CSS3 transitions and touchstart
* Removes the 300ms delay between a physical tap and the click event
* Makes it possible to use CSS3 transition with max-height: auto
* Works in all major desktop and mobile browsers including IE6 and up (tested in the Helsinki Device Lab)


# Demo

For a demo, go to [responsive-nav.com](http://responsive-nav.com).


# Usage instructions

1. Link files:
```html
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
```javascript
var navigation = new ResponsiveNav("#nav");
```


# Customizable options

```javascript
var navigation = new ResponsiveNav("#nav", { // Selector: The ID of the outer wrapper, default is "#nav"
	transition: 300, // Integer: Speed of the transition, in milliseconds, default is "300"
	label: "Menu", // String: Label for the navigation toggle, default is "Menu"
	insert: "after", // String: Insert the toggle before or after the navigation, default is "after"
	customToggle: "", // Selector: Specify the ID of a custom toggle, default is ""
	debug: true // Boolean: Log debug messages to console, true or false, default is "false"
});
```


# Public methods

```javascript
navigation.destroy();
navigation.toggle();
```



# License

Licensed under the MIT license.

Copyright (c) 2013 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


# Changelog

v1.00 (2013-04-XX) - Release


# Want to do a pull request?

Great! New ideas are more than welcome, but please check the [Pull Request Guidelines](https://github.com/viljamis/responsive-nav.js/wiki/Pull-Request-Guidelines/) first before doing so.
