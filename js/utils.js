(function() {

  APP.utils = {
    captureScreenProps: function() {
      var w = $(window).width();
      var h = $(window).height();

      return {
        width: w,
        height: h
      };
    }
  };

})();