(function() {

  var Game = Backbone.Model.extend({
    initialize: function(config) {
      this.config = config || {}; // Config should contain buildingWidth, [heights], {screenProps}
      console.log('New game', config);
    }
  });

  APP.gameFactory = {
    makeNewGame: function(config) {
      var skyline = this.makeSkyline();
      return new Game(skyline);
    },

    // this should move to a utils object
    captureScreenProps: function() {
      var w = $(window).width();
      var h = $(window).height();

      return {
        width: w,
        height: h,
        margin: (w % 14) / 2
      };
    },

    makeSkyline: function() {
      console.log('Making skyline!');
      var screenProps = this.captureScreenProps();
      var buildingWidth = screenProps.width / 14;

      var heights = [];
      for(var i =0; i <= 13; i++) {
        heights.push(Math.floor(Math.random() * 300) + 100);
      }

      return {
        buildingWidth: buildingWidth,
        heights: heights,
        screenProps: screenProps
      };
    }
  };

})();