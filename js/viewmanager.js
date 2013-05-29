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
        self._drawBuilding(height, buildingWidth, yOffset, xOffset, ctx);

        if (index === 1 || index === 12) {
         self._placeGorillaOnTop(xOffset, yOffset, buildingWidth, ctx);
        }

        xOffset += buildingWidth;
      });

      // place Gorillas
    },

    _drawBuilding: function(h, w, yo, xo, ctx) {
      // console.log('Drawing a building', arguments);
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(xo, yo, w, h);
    },

    _placeGorillaOnTop: function(x, y, bw, ctx) {
      x += ((bw - 28) / 2);
      y -= 28;
      var gorilla = new Image();
      gorilla.src = 'img/gorilla-left.png';
      gorilla.onload = function(){
        ctx.drawImage(gorilla, x, y);
      }

    }
  });

  ////////////////////////////////////////////////////
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