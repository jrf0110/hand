/**
 * Hand - for element grabbin'
 */

;(function(){
  'use strict';

  var hand = {
    options: {
      translatePrefixes: [ '', 'webkit', 'ie', 'moz' ]
    }

  , utils: {
      mixin: function( a, b ){
        for ( var key in b ) a[ key ] = b[ key ];
      }
    , translate: function( x, y ){
        return 'translate3d(' + x + 'px,' + y + 'px, 0)';
      }
    }

  , cid:  0   // id for next element added
  , size: 0   // Size of object pool
  , els:  {}  // Object pool

    /**
     * Kicks off the observation. Called when we go from size 0 to 1
     */
  , start: function(){
      window.addEventListener( 'mousemove', hand.onMouseMove );
      document.body.classList.add('dragging');
    }
    /**
     * Stop observation
     */
  , stop: function(){
      document.body.classList.remove('dragging');
      window.removeEventListener( 'mousemove', hand.onMouseMove );

      hand.els   = {};
      hand.size  = 0;
    }
    /**
     * Grabs an element at specific location
     * @param  {Element} el Element to pick up
     * @param  {Number}  x  (Default: 0) X coordinate 
     * @param  {Number}  y  (Default: 0) Y coordinate 
     * @return {Number}     Internal ID of element
     */
  , grab: function( el, x, y ){
      x = x || 0;
      y = y || 0;

      if ( hand.size === 0 ) hand.start();

      hand.els[ hand.cid ] = { el: el, offsetX: x, offsetY: y };
      hand.size++;

      return hand.cid++;
    }
    /**
     * Drops the specified element
     * @param  {Element} el The element to be dropped
     */
  , drop: function( el ){
      for ( var i in hand.els ){
        if ( hand.els[ i ].el === el ){
          delete hand.els[ i ];
          hand.size--;
          break;
        }
      }

      if ( hand.size === 0 ) hand.stop();
    }
  , translateElements: function( x, y ){
      var TRANSFORM = 'Transform';
      var i, ii, l, tresult, el, styles = {};

      for ( i in hand.els ){
        el = hand.els[ i ];
        tresult = hand.utils.translate(
          x - el.offsetX - el.el.offsetLeft
        , y - el.offsetY - el.el.offsetTop
        );

        for ( ii = 0, l = hand.options.translatePrefixes.length; ii < l; ++ii ){
          styles[ hand.options.translatePrefixes[ ii ] + TRANSFORM ] = tresult;
        }

        hand.utils.mixin( el.el.style, styles );
      }
    }
  , onMouseMove: function( e ){
      hand.translateElements( e.clientX, e.clientY );
    }
  };
  
  if ( typeof module !== "undefined" ) module.exports = hand;
  else if ( typeof define !== "undefined" ) define( 'hand', function(){ return hand; } );
  else window.hand = hand;
})();