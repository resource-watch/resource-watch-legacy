(function(App) {

  'use strict';

  App.Router.PlanetPulse = App.Core.Router.extend({

    routes: {
      '(:pulse)': 'start'
    },

    start: function(pulse) {

      if (!this.globe){
        this.globe = new App.View.Globe({
          el: '#globeView'
        });
      }
      
      if (!this.pulses ) {
        this.pulses = new App.View.PlanetPulses({
          el: '#planetPulsesView',
          pulse: pulse
        });

        this.listenTo(this.pulses.state, 'change:pulseSelected', this.setPulse);
      }

    },

    setPulse: function() {
      this.navigate(this.pulses.state.attributes.pulseSelected, { trigger: false });
    }

  });

}).call(this, this.App);
