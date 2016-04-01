(function(App) {

  'use strict';

  App.Router.PlanetPulse = App.Core.Router.extend({

    routes: {
      '': 'start',
      '(:category)/(:layer)': 'start'
    },

    start: function(category, layer) {

      if (!this.globe){
        this.globe = new App.View.Globe({
          el: '#globeView'
        });
      }

      if (!this.pulses ) {
        this.pulses = new App.View.PlanetPulses({
          el: '#planetPulsesView',
          category: category,
          layer: layer
        });

        this.listenTo(this.pulses.state, 'change', this.setPulse);
      }

    },

    setPulse: function() {
      var route = this.pulses.state.attributes.layerSelected ?
        this.pulses.state.attributes.categorySelected + '/' + this.pulses.state.attributes.layerSelected
        : this.pulses.state.attributes.categorySelected;
      this.navigate( route , { trigger: false });
    }

  });

}).call(this, this.App);
