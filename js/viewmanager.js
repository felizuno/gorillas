(function() {
  ////////////////////////////////////////////////////
  ////// GAME VIEW (Foreground)
  ////////////////////////////////////////////////////
  var GameView = Backbone.View.extend({
    // events: function() {
    //   return {
    //     'click canvas': 'reportClick'
    //   };
    // },

    initialize: function() {
      var self = this;
      this.el = $('.game-view');
      
      var $canvas = $('<canvas>')
        .prop('width', $(window).width())
        .prop('height', $(window).height() - 100)
        .appendTo(this.el)
        .mousedown(function(e) {
          // these cause reflow!
          var x = e.clientX - $canvas.offset().left;
          var y = e.clientY - $canvas.offset().top;
          console.log('Click is at: ', x, y);

          var click = new zot.rect(x, y, 40, 40);
          _.each(self.gorillas, function(gorilla) {
            // debugger;
            if (click.intersects(gorilla)) {
              console.log('Gorilla!!!', gorilla);
              Utils.ironSights.down(e, $canvas);
            }
          });
        })
        .mouseup(function(e) {
          var aim = Utils.ironSights.up(e, $canvas);
          var toss = Physics.throwBanana(aim.theta, aim.velocity, aim.origin);
          self.renderThrow(toss);
        });

      var requestAnimationFrame = 
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

        window.requestAnimationFrame = requestAnimationFrame;
    },

    // reportClick: function(event) {

    // },

    setModel: function(model) {
      this.model = APP.currentGame;
      this.renderCity();
    },

    renderCity: function() {
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

    renderThrow: function(toss) {
      var self = this;
      var start = Date.now();  // Look this up and get seconds
      var hangTime = toss.hangTime();
      console.log('throw from', toss.origin, hangTime);

      var step = function(timestamp) {
        var progress = timestamp - start;
        var pos = toss.positionAt(progress, true);
        ctx.fillRect(pos.x, pos.y, 10, 10);
        console.log('progress',progress,'x', pos.x, 'y', pos.y);
        // debugger;
        if (progress < hangTime * 1000) { // should cut this off at the edges of the canvas
          requestAnimationFrame(step);
        }
      };
      
      var ctx = this.ctx || this.el.find('canvas')[0].getContext('2d');
      ctx.fillStyle = 'green';

      requestAnimationFrame(step);
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
      var x = Math.round(building.left + ((building.width - 28) / 2));
      var y = Math.round(building.top - 28);
      
      self.gorillas = [];
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