(function() {

  window.Models = window.Models || {};

  Models.Game = Backbone.Model.extend({
    initialize: function() {
      var screenContext = APP.utils.captureScreenProps();
      this.makeSkyline(screenContext, 14);
    },

    makeSkyline: function(screenProps, howMany) {
      var buildingWidth = screenProps.width / howMany;

      var heights = [];
      for(var i =0; i <= 13; i++) {
        heights.push(Math.floor(Math.random() * 300) + 100);
      }

      this.set('config', {
        buildingWidth: buildingWidth,
        skyline: heights,
        screenProps: screenProps
      });
    }
  });

})();