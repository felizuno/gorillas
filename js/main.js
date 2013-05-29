(function() {
  window.APP = _.extend({
    init: function() {
      this.newGame();
      this.viewManager.init();
    },

    newGame: function() {
      this.currentGame = new Models.Game();
      console.log(this.currentGame.get('config').skyline);
      this.trigger('newGame');
    }
  }, Backbone.Events);

  $(document).ready(function() {
    APP.init();
  });
})();