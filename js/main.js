(function() {
  window.APP = _.extend({
    init: function() {
      this.viewManager.init();
    },

    newGame: function() {
      this.currentGame = new Models.Game(14);
      console.log(this.currentGame.get('config').skyline);
      this.trigger('newGame');
    }
  }, Backbone.Events);

  $(document).ready(function() {
    APP.init();
  });
})();