(function() {

  window.Models = window.Models || {};

  Models.Game = Backbone.Model.extend({
    initialize: function() {
      var screenContext = APP.utils.captureScreenProps();
      this.makeSkyline(screenContext, 14);
    },

    makeSkyline: function(screenProps, howMany) {
      var buildingWidth = screenProps.width / howMany;
      // var heights = [];
      // for(var i =0; i <= 13; i++) {
      //   heights.push(Math.floor(Math.random() * 300) + 100);
      // }

      var buildings = [];
      for(var i =0; i <= howMany; i++) {
        var height = (Math.floor(Math.random() * 300) + 100);
        var top = screenProps.height - height;
        var left = buildingWidth * i;

        var building = new zot.rect(left, top, buildingWidth, height);
        
        if (i % 3 === 0) {
          building.color = 'maroon';
        } else if (i % 5 === 0) {
          building.color = 'darkgrey';
        } else {
          building.color = 'lightblue';
        }

        if (i === 1 || i === (howMany - 2)) {
          building.gorilla = true;
        }

        buildings.push(building);
      }

      this.set('config', {
        buildingWidth: buildingWidth,
        skyline: buildings,
        screenProps: screenProps
      });
    }
  });

})();