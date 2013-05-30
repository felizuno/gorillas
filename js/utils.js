(function() {

  APP.utils = {
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