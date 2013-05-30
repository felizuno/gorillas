(function() {
  ////////////////////////////////////////////////////
  ////// GAME VIEW (Buildings)
  ////////////////////////////////////////////////////
  var GameView = Backbone.View.extend({
    initialize: function() {
      this.el = $('.game-view').empty();

      $('<canvas>')
        .prop('width', $(window).width())
        .prop('height', $(window).height())
        .appendTo(this.el);
    },

    // render: function(config) {
    //   var self = this;

    //   var config = APP.currentGame.get('config');
    //   var xOffset = 0;
    //   var wh = config.screenProps.height;
    //   var buildingWidth = config.buildingWidth;

    //   var ctx = this.el.find('canvas')[0].getContext('2d');
    //   ctx.canvas.width = ctx.canvas.width;


    //   _.each(config.skyline, function(height, index) {
    //     var yOffset = wh - height;
    //     self._drawBuilding(height, buildingWidth, yOffset, xOffset, ctx, index);

    //     if (index === 1 || index === 12) {
    //      self._placeGorillaOnTop(xOffset, yOffset, buildingWidth, ctx);
    //     }

    //     xOffset += buildingWidth;
    //   });
    // },

    render: function() {
      var self = this;
      var skyline = APP.currentGame.get('config').skyline;
      this.ctx = this.el.find('canvas')[0].getContext('2d');
      this.ctx.canvas.width = this.ctx.canvas.width;


      _.each(skyline, function(building, index) {
        self._drawBuilding(building, index);
        if (index === 1 || index === 12) {
         self._placeGorillaOnTop(building.left, building.top, building.width, this.ctx);
        }
      });
    },

    _drawBuilding: function(building, index) {
      // console.log('Drawing a building', arguments);
      if (index % 3 === 0) {
        this.ctx.fillStyle = 'maroon';
      } else if (index % 5 === 0) {
        this.ctx.fillStyle = 'darkgrey';
      } else {
        this.ctx.fillStyle = 'lightblue';
      }

      this.ctx.fillRect(building.left, building.top, building.width, building.height);
      this._addWindowsToBuilding(building);
    },

    _addWindowsToBuilding: function(building) {
      var xInc = ((building.width / 5) - 5);
      var yInc = 22; // (h / 8);
      var xStop = (building.left + building.width - xInc);
      var yStop = (building.top + building.height - yInc);

      for (var yPos = (building.top + yInc); yPos < yStop; yPos += yInc) {
        for (var xPos = (building.left + xInc); xPos < xStop; xPos += xInc) {
          this.ctx.fillStyle = 'yellow';
          this.ctx.fillRect(xPos, yPos, 5, 10);
        }
      }
      /*
        The window should be the maximum that will fit evenly
        in a row (modulo will be involved)

      */
    },

    _placeGorillaOnTop: function(x, y, bw) {
      var self = this;
      x += ((bw - 28) / 2);
      y -= 28;
      
      var gorilla = new Image();
      gorilla.src = 'img/gorilla-left.png';
      gorilla.onload = function(){
        self.ctx.drawImage(gorilla, x, y);
      }

      $('<div>').css({
          'position': 'absolute',
          'top': y,
          'left': x,
          'height': '30px',
          'width': '30px'
        })
        .addClass('gorilla')
        .appendTo('.game-view');
    }
  });


  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  APP.viewManager = _.extend({
    init: function() {
      this.gameView = new GameView();
      // instead of binding this to render, make a setModel function that
      // will re-set the model to the new game and trigger the render
      this.listenTo(APP, 'newGame', _.bind(this.gameView.render, this.gameView));

      $('.start').click(function() {
        APP.newGame();
        // $('.welcome').hide();
      });

    },
  }, Backbone.Events);

})();