(function() {

  window.Utils = {
    captureCanvasProps: function() {
      var $canvas = $('canvas');
      var w = $canvas.width();
      var h = $canvas.height();

      return {
        width: w,
        height: h
      };
    },

    convertToRadian: function(degrees) {
      var rad = degrees * (Math.PI / 180);
      return rad;
    },

    ironSights: {
      down: function(e, $canvas) {
        var x = e.clientX - $canvas.offset().left;
        var y = e.clientY - $canvas.offset().top;
        console.log('Down is at: ', x, y);
        this.x0 = x;
        this.y0 = y;
        this.t0 = Date.now();
      },

      up: function(e, $canvas) {
        var x = e.clientX - $canvas.offset().left;
        var y = e.clientY - $canvas.offset().top;
        console.log('Up is at: ', x, y);
        this.x1 = x;
        this.y1 = y;
        this.t1 = Date.now();

        var deltaX = this.x1 - this.x0;
        var deltaY = this.y1 - this.y0;
        var deltaT = (this.t1 - this.t0) * 0.001;

        var theta = Math.atan(deltaY / deltaX);
        var velocity = (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) / 5);

        return {
          theta: theta,
          velocity: velocity,
          origin: [this.x0, this.y0]
        };
      }
    }
  };

})();