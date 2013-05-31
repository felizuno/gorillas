(function() {
  window.Physics = {
    g: 9.8,

    throwBanana: function(theta, velocity) {
      var grav = this.g;

      return {
        vX: (velocity * Math.cos(theta)),
        vY: Math.abs((velocity * Math.sin(theta))),

        positionAt: function (time) {
          return {
            y: (this.vY * time) - (0.5 * grav * (time * time)),
            x: (this.vX * time)
          };
        },

        xMax: function() {
          var ht = this.hangTime();
          return (vX * ht);
        },

        yMax: function() {
          var pt = this.peakTime();
          var ymax = ((this.vY * pt) - (0.49 * pt * 2));
          return ymax;
        },

        peakTime: function() {
          var ht = this.hangTime();
          return (ht / 2);
        },

        hangTime: function() {
          var ht = (0.204 * this.vY);
          return ht;
        },

        peakPosition: function() {
          var pt = this.peakTime();
          return {
            x: this.positionAt(pt).x,
            y: this.yMax(),
            time: pt
          };
        }
      }
    }
  };

})();
