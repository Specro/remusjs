# RemusJS v0.1
:heavy_check_mark: 5kb minified!   
:heavy_check_mark: Responsive!  
:heavy_check_mark: Custom content!  
:heavy_check_mark: Multiple views!  
:heavy_check_mark: Vanilla JS!

## About
Remus works by manipulating element container's width to show or hide a part of the content. It takes up 100% of its container's width and assumes that your content has enough width to fill. It resizes content dynamically by applying main container's width to content.

## Installation
Just download minified sources and add them to your HTML:

```HTML
<link rel="stylesheet" href="remus.min.css">
<script src="remus.min.js"></script>
```
## Usage
Wrap the images or other content you want to compare in a `remus-element` class:
```HTML
<div class="remus">
	<div class="remus-element">
		<img src="" alt="">
	</div>
	<div class="remus-element">
		<img src="" alt="">
	</div>
</div>
```
...and initialize Remus:
```JavaScript
var remus = new Remus({
	element: '.remus', // selector for main Remus container
	height: null // height value in pixels if you want it to be fixed - optional
});
```

## License
Remus is licensed under MIT license.