/// zot 0.1.0
/// Copyright 2012-13, Ian Gilman
/// https://github.com/iangilman/zot
/// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function(){
  /*globals zot */

  // ==========
  if ("zot" in window)
    throw new Error("There's already a zot defined!");
    
  // ==========
  window.zot = {
    // ----------
    assert: function(condition, message) {
      if (condition)
        return;

      /*globals console */
      if ("console" in window)
        console.error("ASSERT FAILED: " + message);
    }, 
    
    // ----------
    assertProperties: function(obj, properties) {
      if (typeof properties == "string")
        properties = properties.split(" ");
        
      for (var a = 0; a < properties.length; a++) {
        var property = properties[a];
        this.assert(property in obj, "must have " + property + " property");
      }
    }, 
    
    // ----------
    bounds: function($el) {
      var pos = ($el[0] != window ? $el.position() : null) || {left: 0, top: 0};
      return new this.rect(pos.left, pos.top, $el.width(), $el.height());
    },

    // ----------
    outerBounds: function($el) {
      var pos = ($el[0] != window ? $el.position() : null) || {left: 0, top: 0};
      return new this.rect(pos.left, pos.top, $el.outerWidth(), $el.outerHeight());
    },
    
    // ----------
    boundsInPage: function($el) {
      var pos = $el.offset() || {left: 0, top: 0};
      return new this.rect(pos.left, pos.top, $el.width(), $el.height());
    },

    // ----------
    outerBoundsInPage: function($el) {
      var pos = $el.offset() || {left: 0, top: 0};
      return new this.rect(pos.left, pos.top, $el.outerWidth(), $el.outerHeight());
    }
  };

  // ==========
  zot.range = function(start, end) {
    this.start = start || 0;
    this.end = end || 0;
  };
  
  zot.range.prototype = {
    // ----------
    extent: function(value) {
      if (value === undefined)
        return this.end - this.start;
        
      this.end = this.start + value;
    },
    
    // ----------
    proportion: function(value) {
      if (value <= this.start)
        return 0;
        
      if (value >= this.end)
        return 1;
        
      return (value - this.start) / (this.end - this.start);
    },
    
    // ----------
    scale: function(value) {
      if (value <= 0)
        return this.start;
        
      if (value >= 1)
        return this.end;
        
      return this.start + (value * (this.end - this.start));
    },
    
    // ----------
    proportionUnclipped: function(value) {
      return (value - this.start) / (this.end - this.start);
    },
    
    // ----------
    scaleUnclipped: function(value) {
      return this.start + (value * (this.end - this.start));
    },
    
    // ----------
    mid: function() {
      return this.scale(0.5);
    }
  };

  // ==========
  zot.point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };
  
  zot.point.prototype = {
    // ----------
    plus: function(point) {
      return new zot.point(this.x + point.x, this.y + point.y);
    }, 

    // ----------
    minus: function(point) {
      return new zot.point(this.x - point.x, this.y - point.y);
    }, 

    // ----------
    times: function(point) {
      return new zot.point(this.x * point.x, this.y * point.y);
    }, 

    // ----------
    dividedBy: function(point) {
      return new zot.point(this.x / point.x, this.y / point.y);
    },
    
    // ----------
    polar: function() {
      return new zot.polar(
        Math.atan2(this.y, this.x),
        Math.sqrt((this.x * this.x) + (this.y * this.y))
      );
    }
  };

  // ==========
  zot.polar = function(radians, distance) {
    this.radians = radians || 0;
    this.distance = distance || 0;
  };
  
  zot.polar.prototype = {
    // ----------
    point: function() {
      return new zot.point(
        Math.cos(this.radians) * this.distance,
        Math.sin(this.radians) * this.distance
      );
    }
  };

  // ==========
  zot.rect = function(left, top, width, height) {
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
  };
  
  zot.rect.prototype = {
    // ----------
    right: function(value) {
      if (value === undefined)
        return this.left + this.width;
        
      this.width = value - this.left;
    },
    
    // ----------
    bottom: function(value) {
      if (value === undefined)
        return this.top + this.height;
        
      this.height = value - this.top;
    },
    
    // ----------
    topLeft: function() {
      return new zot.point(this.left, this.top);
    },
    
    // ----------
    topRight: function() {
      return new zot.point(this.right(), this.top);
    },
    
    // ----------
    bottomLeft: function() {
      return new zot.point(this.left, this.bottom());
    },
    
    // ----------
    bottomRight: function() {
      return new zot.point(this.right(), this.bottom());
    },
    
    // ----------
    center: function() {
      return new zot.point(
        this.left + (this.width / 2), 
        this.top + (this.height / 2)
      );
    },
    
    // ----------
    centeredOn: function(point) {
      return new zot.rect(point.x - (this.width / 2), 
        point.y - (this.height / 2), 
        this.width, 
        this.height
      );
    },
    
    // ----------
    insetBy: function(x, y) {
      return new zot.rect(this.left + x, 
        this.top + y,
        this.width - (x * 2),
        this.height - (y * 2)
      );
    },
    
    // ----------
    union: function(rect) {
      var left = Math.min(this.left, rect.left);
      var top = Math.min(this.top, rect.top);
      var right = Math.max(this.right(), rect.right());
      var bottom = Math.max(this.bottom(), rect.bottom());
      return new zot.rect(left, top, right - left, bottom - top);
    }, 

    // ----------
    intersection: function(rect) {
      var left = Math.max(this.left, rect.left);
      var top = Math.max(this.top, rect.top);
      var right = Math.min(this.right(), rect.right());
      var bottom = Math.min(this.bottom(), rect.bottom());
      if (right > left && bottom > top) {
        return new zot.rect(left, top, right - left, bottom - top);
      }

      return new zot.rect(0, 0, 0, 0);
    }, 

    // ----------
    intersects: function(rect) {
      return (this.right() > rect.left
        && this.left < rect.right()
        && this.bottom() > rect.top
        && this.top < rect.bottom());
    },

    // ----------
    css: function() {
      return {
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height
      };
    }
  };

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  zot.arc = function(center, radius) {
    this.center = center;
    this.radius = radius;
  };

  // ========
  zot.arc.prototype = {
    contains: function(point) {
      var x = [this.center.x, point.x];
      var y = [this.center.y, point.y];
      var dx = Math.max(x[0], x[1]) - Math.min(x[0], x[1]);
      var dy = Math.max(y[0], y[1]) - Math.min(y[0], y[1]);
      var dist = Math.sqrt((dx * dx) + (dy * dy));
      return (dist < this.radius) ? true : false;
    },

    overlaps: function(rect) {
      // Not precise yet, just checks corners.1
      if ( this.contains(rect.center())
        || this.contains(rect.bottomLeft()) 
        || this.contains(rect.bottomRight())
        || this.contains(rect.topLeft())    
        || this.contains(rect.topLeft())
      ) { return true; }
    }
  };
  
})();
