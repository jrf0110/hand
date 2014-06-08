# Hand - Element Grabber

> No dependencies. Super performant. A micro lib for attaching elements to mouse movement.

![http://storage.j0.hn/hand.gif](http://storage.j0.hn/hand.gif)

__Install:__

```
npm install hand
```

or:

```
bower install hand
```

## Usage

Works with AMD loaders or browserify with `require('hand')` or simply `window.hand` without a loader.

```javascript
document.addEventListener( 'DOMContentLoaded', function(){
  var el = document.getElementById('my-element');

  // Drag and drop for `el`
  el.addEventListener( 'mousedown', function( e ){
    // Tell hand what to grab and where to grab it from
    hand.grab( el, e.offsetX, e.offsetY );
  });

  el.addEventListener( 'mousedown', function( e ){
    hand.drop( el );
  });
});
```

## API

### `hand.grab( element, [offsetX], [offsetY] )`

Grab an element

__Parameters:__

* element - The element to attach to mouse movement
* offsetX - X coordinate on the element to grab from
* offsetY - Y coordinate on the element to grab from

### `hand.drop( element )`

Drops an element

__Parameters:__

* element - The element to drop

## Browser support

1. If your browser doesn't support CSS transforms/translate3d, then this will not work at all.
2. If your browser doesn't support [CSS ClassList](http://caniuse.com/classlist), then install [this polyfill](https://github.com/eligrey/classList.js)