(function() {
  window.Physics = {
    gravity: .98,

    throwBanana: function(theta, velocity, origin) {
      var g = this.gravity;

      return {
        vX: (velocity * Math.cos(theta)),
        vY: (velocity * Math.sin(theta)),
        origin: origin,

        positionAt: function (time, left) {
          time = time / 60;
          
          if (left) {
            var x = origin[0] - (this.vX * time);
          } else {
            var x = origin[0] + (this.vX * time);
          }
          // debugger;
          var y = (this.vY * time) - (0.5 * g * (time * time)) - origin[1];
          y = Math.abs(y);

          return {
            x: Math.round(x),
            y: Math.round(y)
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
