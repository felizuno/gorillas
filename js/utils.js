(function() {

  Window.Utils = {
    captureCanvasProps: function() {
      var $canvas = $('canvas');
      var w = $canvas.width();
      var h = $canvas.height();

      return {
        width: w,
        height: h
      };
    }
  };

})();