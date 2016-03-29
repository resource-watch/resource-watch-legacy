(function(App) {

  'use strict';

  App.Router.PlanetPulse = App.Core.Router.extend({

    routes: {
      '(/)': 'start'
    },

    start: function() {
      this.globe = new App.View.Globe({
        el: '#globeView'
      });
    }

  });

}).call(this, this.App);
