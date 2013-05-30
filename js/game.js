(function() {

  window.Models = window.Models || {};

  Models.Game = Backbone.Model.extend({
    initialize: function(howMany) {
      if (howMany < 3) {
        return; // Gotta at least have 3
      }

      var screenContext = APP.utils.captureCanvasProps();
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

          building.windows = [];
          var xInc = ((buildingWidth / 5) - 5);
          var yInc = 22; // (h / 8);
          var xStop = (left + buildingWidth - xInc);
          var yStop = (top + height - yInc);

          for (var yPos = (top + yInc); yPos < yStop; yPos += yInc) {
            for (var xPos = (left + xInc); xPos < xStop; xPos += xInc) {
              w = new zot.rect(xPos, yPos, 5, 10);
              building.windows.push(w);
            }
          }

        if (howMany > 3) {
          if (i === 1) {
            building.gorilla = 'img/gorilla-left.png';
          } else if (i === (howMany - 2)) {
            building.gorilla = 'img/gorilla-right.png';
          }
        } else { // howMany = 3 (< 3 not allowed up top)
          if (i === 0) {
            building.gorilla = 'img/gorilla-left.png';
          } else if (i === 2) {
            building.gorilla = 'img/gorilla-right.png';
          }
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