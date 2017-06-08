/*! RemusJS v0.1 by Liudas Dzisevicius (https://github.com/specro) */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
	  define([], factory);
	} else if (typeof exports === 'object') {
	  module.exports = factory();
	} else {
	  root.Remus = factory();
	}
}(this, function () {
  function Remus() {

		var defaults = {
			element: '.remus',
			height: null
		};

		if (arguments[0] && typeof arguments[0] === "object") {
      this.options = merge(defaults, arguments[0]);
    } else {
			this.options = defaults;
		}

		this.remus = document.querySelector(this.options.element);
		this.elements = Array.prototype.slice.call(this.remus.children);
		this.handles = [];
		this.activeHandle = null;
		this.width = null;

		window.onload = onWindowLoaded.bind(this);
		window.onresize = this.refresh.bind(this);
	}

	Remus.prototype.refresh = function () {
		this.width = this.remus.clientWidth;
		this.elements[this.elements.length - 1].style.width = (this.width / this.elements.length) * (this.elements.length) + 'px';
		this.elements[this.elements.length - 1].children[0].style.width = this.width + 'px';
		if (this.options.height) {
			this.elements[this.elements.length - 1].children[0].style.top = -this.elements[this.elements.length - 1].children[0].clientHeight/2 + this.options.height/2 + 'px';
		}
		for (var i = 0; i < this.elements.length - 1; i++) {
			if (this.options.height) {
				this.elements[i].children[0].style.top = -this.elements[i].children[0].clientHeight/2 + this.options.height/2 + 'px';
			}
			this.elements[i].style.width = (this.width / this.elements.length) * (i + 1) + 'px';
			this.elements[i].children[0].style.width = this.width + 'px';
			this.handles[i].style.left = (this.width / this.elements.length) * (i + 1) - this.handles[i].clientWidth/2 + 'px';
		}
	}

	function onWindowLoaded() {
		this.width = this.remus.clientWidth;

		// set height if not null
		// align items depending on height
		if (this.options.height) {
			this.remus.style.height = this.options.height + 'px';
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].children[0].style.top = -this.elements[i].children[0].clientHeight/2 + this.options.height/2 + 'px';
			}
		}

		createHandles.call(this);
		registerDocumentListeners.call(this);
	}

	function createHandles() {
		var placeholder = document.createElement('div');
		this.elements[0].style.zIndex = this.elements.length - 1 + 100;
		this.elements[this.elements.length - 1].children[0].style.width = this.width + 'px';

		for (var i = 0; i < this.elements.length - 1; i++) {
			placeholder.innerHTML = '<div class="remus-handle handle-' + i + '"></div>';
			this.handles[i] = placeholder.firstChild;
			this.remus.appendChild(placeholder.firstChild);

			// set z-indexes and initial view area and position
			this.elements[i + 1].style.zIndex = this.elements.length - (2 * i + 3) + 100;
			this.elements[i].style.width = (this.width / this.elements.length) * (i + 1) + 'px';
			this.elements[i].children[0].style.width = this.width + 'px';
			this.handles[i].style.zIndex = this.elements.length - 2*i + 100;
			this.handles[i].style.left = (this.width / this.elements.length) * (i + 1) - this.handles[i].clientWidth/2 + 'px';
			this.handles[i].element = this.elements[i];

			registerHandleListener.call(this, i);
		}
	}

	function registerHandleListener(id) {
		var handle = this.handles[id];

		handle.addEventListener('mousedown', function (e) {
			handle.offset = e.pageX - handle.offsetLeft;
			this.activeHandle = handle;
		}.bind(this));

		handle.addEventListener('touchstart', function (e) {
			e = e.targetTouches[0];
			handle.offset = e.pageX - handle.offsetLeft;
			this.activeHandle = handle;
		}.bind(this));
	}

	function registerDocumentListeners() {
		document.addEventListener('mousemove', changeViewArea.bind(this));

		document.addEventListener('mouseup', function (e) {
			this.activeHandle = null;
		}.bind(this));

		// touch listeners
		document.addEventListener('touchmove', changeViewArea.bind(this));

		document.addEventListener('touchend', function (e) {
			this.activeHandle = null;
		}.bind(this));
	}

	function changeViewArea(e) {
		if (e.changedTouches) {
			e = e.changedTouches[0];
		}
		if (this.activeHandle) {
			var handle = this.activeHandle;
			var handlePosition = Math.min(Math.max(e.clientX - handle.offset, 0 -  handle.clientWidth / 2), this.width - handle.clientWidth / 2);
			var elementPosition = handlePosition + handle.clientWidth / 2;

			handle.style.left = handlePosition + 'px';
			handle.element.style.width = elementPosition + 'px';
		}
	}

	function merge(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

	return Remus;
}));
