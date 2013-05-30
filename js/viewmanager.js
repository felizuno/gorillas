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

    _placeGorillaOnTop: function(building) {
      var self = this;
      var x = building.left + ((building.width - 28) / 2);
      var y = building.top - 28;
      
      var gorilla = new Image();
      gorilla.src = 'img/gorilla-left.png';
      gorilla.onload = function(){
        self.ctx.drawImage(gorilla, x, y);
        self.gorillas.push([x, y]);
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