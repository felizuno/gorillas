(function() {
  ////////////////////////////////////////////////////
  var GameView = Backbone.View.extend({
    initialize: function() {
      this.model = APP.currentGame;
      this.el = $('.game-view').empty()
      
      var windowProps = this.model.get('config').screenProps;
      $('<canvas>')
        .prop('width', windowProps.width)
        .prop('height', windowProps.height)
        .appendTo(this.el);
    },

    render: function() {
      console.log('view rendering', this);
      var self = this;
      var config = this.model.get('config');

      var ctx = this.el.find('canvas')[0].getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      var xOffset = 0;
      var wh = config.screenProps.height;
      var buildingWidth = config.buildingWidth;

      _.each(config.skyline, function(height) {
        var yOffset = wh - height;
        self._drawBuilding(height, buildingWidth, yOffset, xOffset, ctx);

        xOffset += buildingWidth;
      });
    },

    _drawBuilding: function(h, w, yo, xo, ctx) {
      // console.log('Drawing a building', arguments);
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(xo, yo, w, h);
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