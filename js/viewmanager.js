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

    render: function(config) {
      var self = this;

      var config = APP.currentGame.get('config');
      var xOffset = 0;
      var wh = config.screenProps.height;
      var buildingWidth = config.buildingWidth;

      var ctx = this.el.find('canvas')[0].getContext('2d');
      ctx.canvas.width = ctx.canvas.width;


      _.each(config.skyline, function(height, index) {
        var yOffset = wh - height;
        self._drawBuilding(height, buildingWidth, yOffset, xOffset, ctx, index);

        if (index === 1 || index === 12) {
         self._placeGorillaOnTop(xOffset, yOffset, buildingWidth, ctx);
        }

        xOffset += buildingWidth;
      });
    },

    _drawBuilding: function(h, w, yo, xo, ctx, index) {
      // console.log('Drawing a building', arguments);
      if (index % 3 === 0) {
        ctx.fillStyle = 'maroon';
      } else if (index % 5 === 0) {
        ctx.fillStyle = 'darkgrey';
      } else {
        ctx.fillStyle = 'lightblue';
      }
      ctx.fillRect(xo, yo, w, h);
      // should add windows
      this._addWindowsToBuilding(xo, yo, w, h, ctx);
    },

    _addWindowsToBuilding: function(xo, yo, w, h, ctx) {
      var xIncrement = ((w / 5) - 5);
      var yIncrement = 22; // (h / 8);
      for (var yPos = (yo + yIncrement); yPos < (yo + h - yIncrement); yPos += yIncrement) {
        for (var xPos = (xo + xIncrement); xPos < (xo + w - xIncrement); xPos += xIncrement) {
          ctx.fillStyle = 'yellow';
          ctx.fillRect(xPos, yPos, 5, 10);
        }
      }
      /*
        The window should be the maximum that will fit evenly
        in a row (modulo will be involved)

      */
    },

    _placeGorillaOnTop: function(x, y, bw, ctx) {
      x += ((bw - 28) / 2);
      y -= 28;
      
      var gorilla = new Image();
      gorilla.src = 'img/gorilla-left.png';
      gorilla.onload = function(){
        ctx.drawImage(gorilla, x, y);
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
      this.listenTo(APP, 'newGame', _.bind(this.gameView.render, this.gameView));

      $('.start').click(function() {
        APP.newGame();
        // $('.welcome').hide();
      });

    },
  }, Backbone.Events);

})();