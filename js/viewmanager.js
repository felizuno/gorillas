(function() {
  ////////////////////////////////////////////////////
  ////// GAME VIEW (Foreground)
  ////////////////////////////////////////////////////
  var GameView = Backbone.View.extend({
    initialize: function() {
      this.el = $('.game-view');

      $('<canvas>')
        .prop('width', $(window).width())
        .prop('height', $(window).height() - 100)
        .appendTo(this.el);
    },

    setModel: function(model) {
      this.model = APP.currentGame;
      this.render();
    },

    render: function() {
      this.ctx = this.el.find('canvas')[0].getContext('2d');
      this.ctx.canvas.width = this.ctx.canvas.width;
      
      this.gorillas = [];

      var skyline = APP.currentGame.get('config').skyline;
      this.renderForeground(skyline);
    },

    renderForeground: function(skyline) {
      var self = this;

      _.each(skyline, function(building, index) {
        self._drawBuilding(building);
        building.gorilla ? self._placeGorillaOnTop(building) : '';
      });
    },

    _drawBuilding: function(building) {
      this.ctx.fillStyle = building.color;
      this.ctx.fillRect(building.left, building.top, building.width, building.height);
      this._addWindowsToBuilding(building);
    },

    _addWindowsToBuilding: function(building) {
      this.ctx.fillStyle = 'yellow';
      for (var i = 0; i < building.windows.length; i++) {
          var w = building.windows[i];
          this.ctx.fillRect(w.left, w.top, w.width, w.height);
      }
    },

    _placeGorillaOnTop: function(building) {
      var self = this;
      var x = building.left + ((building.width - 28) / 2);
      var y = building.top - 28;
      
      var gorilla = new Image();
      gorilla.src = building.gorilla;
      gorilla.onload = function(){
        self.ctx.drawImage(gorilla, x, y);
        self.gorillas.push(new zot.rect(x, y, 28, 28));
      }
    }
  });


  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  APP.viewManager = _.extend({
    init: function() {
      this.gameView = new GameView();
      // instead of binding this to render, make a setModel function that
      // will re-set the model to the new game and trigger the render
      this.listenTo(APP, 'newGame', _.bind(this.gameView.setModel, this.gameView));

      $('.start').click(function() {
        APP.newGame();
        // $('.welcome').hide();
      });

    },
  }, Backbone.Events);

})();