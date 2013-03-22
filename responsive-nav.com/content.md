# Responsive Nav.js

## Responsive Navigation plugin without library dependencies and with fast touch screen support. Try it out by resizing this window.

Responsive Nav is a tiny JavaScript plugin (weighs ~1kb) which helps you to create toggled navigation for smaller screens. It uses touchstart and CSS3 transitions for the best possible performance. It also uses a “clever” workaround which makes it possible to transition from max-height: 0 to max-height: auto which isn’t normally possible with CSS3 transitions.


Download & View on GitHub ->


## Features

* ~1kb minified and gzipped
* Doesn’t require any external libraries
* Simple markup using lists
* Uses CSS3 transitions and touchstart
* Removes the 300ms delay between a physical tap and the click event
* Makes it possible to use CSS3 transition with max-height: auto
* Works in all major desktop and mobile browsers including IE6 and up (tested in the Helsinki Device Lab)


## Usage instructions

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


## Customisable options

```javascript
	var navigation = new ResponsiveNav("#nav", {
		transition: 300, // Integer: Speed of the transition, in milliseconds, default is "300"
		label: "Menu", // String: Label for the navigation toggle, default is "Menu"
		insert: "after", // String: Insert the toggle before or after the navigation, default is "after"
		customToggle: "", // Selector: Specify the ID of a custom toggle, default is ""
		debug: true // Boolean: Log debug messages to console, true or false, default is "false"
	});
```


## Public methods

```javascript
	navigation.destroy();
	navigation.toggle();
```


## Support

If you have a question or a bug report, please post it to GitHub issues.


Download & View on GitHub ->

Brought to you by Viljami S. Follow @viljamis on Twitter to stay up to date. Check out also the previous version called TinyNav.js.

This site, its code and design, and Responsive Nav itself are licensed under the MIT license.