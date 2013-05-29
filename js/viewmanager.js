(function() {
  ////////////////////////////////////////////////////
  var GameView = Backbone.View.extend({
    initialize: function() {
      this.model = APP.currentGame;
      console.log('gameView initialized with this model: ', this.model);
      this.el = $('.game-view').empty()
      $('<canvas>')
        .prop('width', this.model.get('screenProps').width)
        .prop('height', this.model.get('screenProps').height)
        .appendTo(this.el);
    },

    render: function() {
      var self = this;
      
      var width = this.model.get('buildingWidth');
      var xOffset = this.model.get('screenProps').margin;
      var wh = this.model.get('screenProps').height;
      
      _.each(this.model.get('heights'), function(height) {
        var yOffset = wh - height;
        self._drawBuilding(height, width, yOffset, xOffset);
        xOffset += width;
      });
    },

    _drawBuilding: function(h, w, yo, xo) {
      var ctx = this.el.find('canvas')[0].getContext('2d');
      console.log('Drawing a building', arguments);

      ctx.fillStyle = 'red';
      ctx.fillRect(xo, yo, w, h);
    },

    _addPadding: function() {
      // use this.model.get('screenProps').margin
    }
  });

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  APP.viewManager = _.extend({
    init: function() {
      this.gameView = new GameView();
      this.listenTo(APP, 'change:currentGame', this.gameView.render());

      $('.start').click(function() {
        APP.newGame();
        $('.welcome').hide();
      });

    },
  }, Backbone.Events);

})();