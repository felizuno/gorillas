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
    }
  };

})();