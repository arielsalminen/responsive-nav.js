/*!
InfiniWall v0.1.0 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

(function (window, document) {

var dummyStyle = document.createElement('i').style,
	vendor = (function () {
		var vendors = 't,webkitT,MozT,msT,OT'.split(','),
			t,
			i = 0,
			l = vendors.length;
		
		for ( ; i < l; i++ ) {
			t = vendors[i] + 'ransform';
			if ( t in dummyStyle )
				return vendors[i].substr(0, vendors[i].length - 1);
		}
		
		return false;
	})(),
	cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',

	// Style properties
	transform = prefixStyle('transform'),
	transitionProperty = prefixStyle('transitionProperty'),
	transitionDuration = prefixStyle('transitionDuration'),
	transitionTimingFunction = prefixStyle('transitionTimingFunction'),
	transitionDelay = prefixStyle('transitionDelay'),

    // Browser capabilities
	has3d = prefixStyle('perspective') in dummyStyle,
	hasTouch = 'ontouchstart' in window,
	hasTransitionEnd = prefixStyle('transition') in dummyStyle,

	// Device detect
	isAndroid = (/android/i).test(navigator.appVersion),

	resizeEv = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	startEv = hasTouch ? 'touchstart' : 'mousedown',
	moveEv = hasTouch ? 'touchmove' : 'mousemove',
	endEv = hasTouch ? 'touchend' : 'mouseup',
	cancelEv = hasTouch ? 'touchcancel' : 'mouseup',
	transitionEndEv = (function () {
		if ( vendor === false ) return false;

		var transitionEnd = {
				''			: 'transitionend',
				'webkit'	: 'webkitTransitionEnd',
				'Moz'		: 'transitionend',
				'O'			: 'otransitionend',
				'ms'		: 'MSTransitionEnd'
			};

		return transitionEnd[vendor];
	})(),
	
	// Helpers
	requestFrame =	window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					function (callback) { return setTimeout(callback, 1); },
	translateZ = has3d ? ' translateZ(0)' : '';

function InfiniWall (el, options) {
	var x = 0,
		y = 0,
		pos,
		i,
		tag;
	
	this.container = typeof el == 'string' ? document.querySelector(el) : el;
	this.wall = this.container.children[0];

	this.wallWidth = this.wall.offsetWidth;
	this.wallHeight = this.wall.offsetHeight;
	this.cellWidth = this.wall.children[0].offsetWidth;
	this.cellHeight = this.wall.children[0].offsetHeight;

	pos = this._getPosition();
	this.x = pos.x;
	this.y = pos.y;
	
	this.gridWidth = 5;
	this.gridHeight = 5;
	this.virtualGridWidth = 10;
	this.virtualGridHeight = 10;

	this.cells = [];
	for ( ; x < this.gridWidth; x++ ) {
		this.cells[x] = [];

		for ( y = 0; y < this.gridHeight; y++ ) {
			this.cells[x][y] = {
				el: this.wall.children[y * this.gridWidth + x],
				slot: y * this.virtualGridWidth + x,
				x: 0,
				y: 0
			};
			this.cells[x][y].prevSlot = this.cells[x][y].slot;
			this.cells[x][y].el.className = 'loading';

			tag = document.createElement('img');
			tag.width = 170;
			tag.height = 140;
			tag.onload = imgLoaded;
			tag.onerror = imgLoaded;
			tag.src = 'images/img' + this.cells[x][y].slot + '.jpg';
			this.cells[x][y].el.appendChild(tag);

			tag = document.createElement('span');
			tag.innerHTML = 'Image No. ' + this.cells[x][y].slot;
			this.cells[x][y].el.appendChild(tag);

			tag = document.createElement('span');
			tag.className = 'spinner';
			this.cells[x][y].el.appendChild(tag);
		}
	}

	this.options = {
	};
	for ( i in options ) this.options[i] = options[i];

	this._bind(startEv, this.container);
}

InfiniWall.prototype = {
	handleEvent: function (e) {
		switch ( e.type ) {
			case startEv:
				if ( !hasTouch && e.button !== 0 ) return;
				this._start(e);
				break;
			case moveEv:
				this._move(e);
				break;
			case endEv:
			case cancelEv:
				this._end(e);
				break;
			case resizeEv:
				this._resize();
				break;
			case transitionEndEv:
				this._transitionEnd(e);
				break;
		}
	},

	_bind: function (type, el, bubble) {
		(el || this.scroller).addEventListener(type, this, !!bubble);
	},

	_unbind: function (type, el, bubble) {
		(el || this.scroller).removeEventListener(type, this, !!bubble);
	},

	_setPosition: function (x, y) {
		this.wall.style[transform] = 'translate(' + x + 'px,' + y + 'px)' + translateZ;

		this.x = x;
		this.y = y;
	},

	_rearrangeCells: function () {
		var screenX = Math.ceil(this.x / this.wallWidth),
			screenY = Math.ceil(this.y / this.wallHeight),
			virtualScreenX = Math.abs(screenX - Math.ceil(screenX / 2) * 2),
			virtualScreenY = Math.abs(screenY - Math.ceil(screenY / 2) * 2),
			posX = Math.ceil(this.x / this.cellWidth) * this.cellWidth / this.cellWidth,
			posY = Math.ceil(this.y / this.cellHeight) * this.cellHeight / this.cellHeight,
			x2 = Math.abs(posY - Math.ceil(posY / this.gridHeight) * this.gridHeight),
			y2 = Math.abs(posX - Math.ceil(posX / this.gridWidth) * this.gridWidth),
			phaseX = Math.abs((posX) - Math.ceil((posX) / this.virtualGridWidth) * this.virtualGridWidth),
			phaseY = Math.abs((posY) - Math.ceil((posY) / this.virtualGridHeight) * this.virtualGridHeight),
			i, l,
			x, y,
			slot,
			cells = [],
			that = this;

		if ( this.prevDirX === this.dirX && this.prevDirY === this.dirY && this.cellX === posX && this.cellY === posY ) return;

		this.cellX = posX;
		this.cellY = posY;
		this.prevDirX = this.dirX;
		this.prevDirY = this.dirY;

		for ( i = 0; i < this.gridWidth; i++ ) {
			if ( this.dirX < 0 ) {
				for ( l = 0; l < y2 + 1; l++ ) {
					this.cells[l][i].x = this.wallWidth * -screenX + this.wallWidth;
				}
			} else {
				for ( l = this.gridWidth - 1; l > y2 - 1; l-- ) {
					this.cells[l][i].x = -(this.wallWidth * screenX);
				}
			}
		}

		for ( i = 0; i < this.gridHeight; i++ ) {
			if ( this.dirY < 0 ) {
				for ( l = 0; l < x2 + 1; l++ ) {
					this.cells[i][l].y = this.wallHeight * -screenY + this.wallHeight;
				}
			} else {
				for ( l = this.gridHeight - 1; l > x2 - 1; l-- ) {
					this.cells[i][l].y = -(this.wallHeight * screenY);
				}
			}
		}

		for ( i = 0; i < this.gridWidth; i++ ) {
			if ( phaseX <= this.gridWidth ) {
				x = phaseX > i ? this.gridWidth + i : i;
			} else {
				x = phaseX - this.gridWidth > i ? i : this.gridWidth + i;
			}

			for ( l = 0; l < this.gridHeight; l++ ) {
				if ( phaseY <= this.gridHeight ) {
					y = phaseY > l ? this.gridHeight + l : l;
				} else {
					y = phaseY - this.gridHeight > l ? l : this.gridHeight + l;
				}

				slot = x + y * this.virtualGridWidth;
				
				if ( slot != this.cells[i][l].slot ) {
					this.cells[i][l].slot = slot;
					this.cells[i][l].el.className = 'loading';
					//this.cells[i][l].el.children[0].src = 'images/img' + this.cells[i][l].slot + '.jpg';
					this.cells[i][l].el.children[1].innerHTML = 'Image No. ' + this.cells[i][l].slot;
				}

				this.cells[i][l].el.style[transform] = 'translate(' + this.cells[i][l].x + 'px,' + this.cells[i][l].y + 'px)' + translateZ;
			}
		}

		this._loadTimeout = setTimeout(function () { that._loadImages(); }, 100);
	},

	_loadImages: function () {
		var x, y;

		for ( x = 0; x < this.gridWidth; x++ ) {
			for ( y = 0; y < this.gridHeight; y++ ) {
				if ( this.cells[x][y].slot === this.cells[x][y].prevSlot ) {
					this.cells[x][y].el.className = '';
				} else {
					this.cells[x][y].el.children[0].src = 'images/img' + this.cells[x][y].slot + '.jpg';
					this.cells[x][y].prevSlot = this.cells[x][y].slot;
				}
			}
		}
	},

	_getPosition: function () {
		// Lame alternative to CSSMatrix
		var matrix = window.getComputedStyle(this.wall, null)[transform].replace(/[^0-9\-.,]/g, '').split(','),
			x = +matrix[4],
			y = +matrix[5];
		
		return { x: x, y: y };
	},

	_setDuration: function (d) {
		d = d || 0;
		
		this.wall.style[transitionDuration] = d + 'ms';
	},

	_start: function (e) {
		var point = hasTouch ? e.touches[0] : e,
			pos;

		if ( this.initiated ) return;

		e.preventDefault();

		clearTimeout(this._loadTimeout);
		this._loadTimeout = null;

		if ( this.isDecelerating ) {
			this.isDecelerating = false;
			pos = this._getPosition();

			if ( pos.x != this.x || pos.y != this.y ) {
				this._setPosition(pos.x, pos.y);
			}
		}

		this.initiated = true;
		this._setDuration(0);

		this.dirX = 0;
		this.dirY = 0;
		this.distX = 0;
		this.distY = 0;
		this.originX = this.x;
		this.originY = this.y;
		this.startX = point.pageX;
		this.startY = point.pageY;
		this.startTime = e.timeStamp || Date.now();
		
		this._bind(moveEv, document);
		this._bind(endEv, document);
		this._bind(cancelEv, document);
	},
	
	_move: function (e) {
		var point = hasTouch ? e.touches[0] : e,
			deltaX = point.pageX - this.startX,
			deltaY = point.pageY - this.startY,
			newX = this.x + deltaX,
			newY = this.y + deltaY,
			timestamp = e.timeStamp || Date.now(),
			that = this;

		if ( hasTouch && e.changedTouches.length > 1 ) return;

		clearTimeout(this._loadTimeout);
		this._loadTimeout = null;

		this.distX += Math.abs(deltaX);
		this.distY += Math.abs(deltaY);

		this.dirX = deltaX < 0 ? -1 : deltaX > 0 ? 1 : 0;
		this.dirY = deltaY < 0 ? -1 : deltaY > 0 ? 1 : 0;

		// 10 px actuation point
		if ( this.distX < 10 && this.distY < 10 ) {
			return;
		}

		this.startX = point.pageX;
		this.startY = point.pageY;

		this._setPosition(newX, newY);

		this._rearrangeCells();

		if ( timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.originX = this.x;
			this.originY = this.y;
			this._loadTimeout = setTimeout(function () { that._loadImages(); }, 100);
		}
	},

	_end: function (e) {
		if ( hasTouch && e.changedTouches.length > 1 ) return;

		clearTimeout(this._loadTimeout);
		this._loadTimeout = null;

		var point = hasTouch ? e.touches[0] : e,
			duration = ( e.timeStamp || Date.now() ) - this.startTime,
			newX, newY,
			that = this;

		this._rearrangeCells();

		if ( duration < 300 ) {
			newX = destination(this.x - this.originX, duration);
			newY = destination(this.y - this.originY, duration);
			this._momentum(this.x + newX.distance, this.y + newY.distance, Math.max(newX.duration, newY.duration));
		} else {
			that._loadImages();
		}

		this.initiated = false;

		this._unbind(moveEv, document);
		this._unbind(endEv, document);
		this._unbind(cancelEv, document);
	},

	_momentum: function (destX, destY, duration) {
		var startTime = Date.now(),
			startX = this.x,
			startY = this.y,
			that = this;

		function frame () {
			var now = Date.now(),
				newX, newY,
				easeOut;

			if ( now >= startTime + duration ) {
				that.isDecelerating = false;
				that._setPosition(destX, destY);
				that._loadImages();
				return;
			}

			now = (now - startTime) / duration;
			easeOut = Math.sqrt(1 - ( --now * now ));
			newX = (destX - startX) * easeOut + startX;
			newY = (destY - startY) * easeOut + startY;

			that._setPosition(newX, newY);
			that._rearrangeCells();

			if ( that.isDecelerating ) requestFrame(frame);
		}

		this.isDecelerating = true;
		frame();
	}
};

function destination (distance, time) {
	var speed = Math.abs(distance) / time,
		friction = 0.0025;

	distance = ( speed * speed ) / ( 2 * friction ) * ( distance < 0 ? -1 : 1 );
	time = speed / friction;

	return { distance: Math.round(distance), duration: Math.round(time) };
}

function prefixStyle (style) {
	if ( vendor === '' ) return style;

	style = style.charAt(0).toUpperCase() + style.substr(1);
	return vendor + style;
}

function imgLoaded () {
	var el = this.parentNode;
	el.className = '';
}


window.InfiniWall = InfiniWall;

})(window, document);