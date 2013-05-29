(function() {
  window.APP = _.extend({
    init: function() {
      this.newGame();
      this.viewManager.init();
      this.on('change:currentGame', function() {
        console.log('Game changing');
      });
    },

    newGame: function() {
      this.currentGame = this.gameFactory.makeNewGame();
    }
  }, Backbone.Events);

  $(document).ready(function() {
    APP.init();
  });
})();