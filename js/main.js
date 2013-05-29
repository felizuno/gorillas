(function() {
  window.APP = _.extend({
    init: function() {
      this.newGame();
      this.viewManager.init();
    },

    newGame: function() {
      this.currentGame = new Models.Game();
      this.trigger('newGame');
    }
  }, Backbone.Events);

  $(document).ready(function() {
    APP.init();
  });
})();