# TinyNav2.js
### Responsive navigation plugin without library dependencies and with fast touch screen support.

TinyNav2 is a tiny JavaScript plugin (weighs under 1kb) which helps you to create toggled navigation for smaller screens. It uses touchstart and CSS transitions for best possible performance. It also uses a "clever" workaround which makes it possible to transition from `height: 0` to `height: auto` which isn't normally possible with CSS transitions.

Please note that this is still a work-in-progress, so there are some bugs in certain browsers like Opera Mobile. Anyway, I will deal with them soon, so don't worry. Usage instructions and better demos are also coming.

Check out also the previous version: [TinyNav 1](http://tinynav.viljamis.com)

#### Features:
 * Under 1kb minified and gzipped
 * Uses CSS3 transitions and touchstart
 * Automatically calculates needed height for the navigation so you don't have to
 * Simple markup using an unordered list
 * Custom settings for the toggle label and nav selectors
 * 1.0 version will work in all major desktop and mobile browsers



Demo
======

For a demo go to [http://tinynav2.viljamis.com](http://tinynav2.viljamis.com). 



License
======

Licensed under the MIT license.

Copyright (c) 2011-2012 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Changelog
======

v0.6 (2013-03-07) - TinyNav2 now automatically creates a toggle link for the menu so you don't have to.

v0.52 (2013-03-07) - Adds new option called "debug".

v0.51 (2013-03-07) - Fixes errors in the console.

v0.5 (2013-03-06) - TinyNav2 now calculates the needed height for the navigation so you don't have to. Includes also bug fixes.

v0.3 (2013-03-06) - Adds styles for the demo. You can now also [view the demo online](http://tinynav2.viljamis.com)

v0.2 (2013-03-06) - Added aria-hidden on resize and toggle, thank you [@stowball](https://github.com/stowball)!

v0.1 (2013-03-05) - Release
