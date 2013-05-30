(function() {

  window.Models = window.Models || {};

  Models.Game = Backbone.Model.extend({
    initialize: function(howMany) {
      if (howMany < 3) {
        return; // Gotta at least have 3
      }

      var screenContext = APP.utils.captureScreenProps();
      this.makeSkyline(screenContext, howMany);
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

        if (howMany > 3 && (i === 1 || i === (howMany - 2))) {
          building.gorilla = true;
        } else if (i === 0 || i === 2) { // howMany = 3 (< 3 not allowed up top)
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