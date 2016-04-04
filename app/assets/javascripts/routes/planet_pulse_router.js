(function(App) {

  'use strict';

  App.Router.PlanetPulse = App.Core.Router.extend({

    routes: {
      '(/)': 'start',
      '(:category)(/)(:layer)(/)': 'start'
    },

    start: function(category, layer) {
      this.initCategory = category;
      this.initLayerSlug = layer;

      if (!this.pulsesView ) {
        this.pulsesView = new App.View.PlanetPulses({
          el: '#planetPulsesView',
          category: category,
          layer: layer
        });

        this.listenTo(this.pulsesView.state, 'change', this.setPulse);
        this.listenTo(this.pulsesView.state, 'change:layerSelected', this.setPlanetLayer);
        this.listenTo(this.pulsesView, 'pulses:loaded', this.initGlobe);
      }

    },

    initGlobe: function(pulses) {
      this.pulses=pulses;
      this.currentLayer = this.getPulseLayer(this.initLayerSlug);
      if (!this.globe){
        this.globe = new App.View.Globe({
          el: '#globeView',
          layer: this.currentLayer
        });
      }
    },

    setPulse: function() {
      var route = this.pulsesView.state.attributes.layerSelected ?
        this.pulsesView.state.attributes.categorySelected + '/' + this.pulsesView.state.attributes.layerSelected
        : this.pulsesView.state.attributes.categorySelected;
      this.navigate( route , { trigger: false });
    },

    setPlanetLayer: function() {
      this.currentLayer = this.getPulseLayer(this.pulsesView.state.attributes.layerSelected);
      this.globe.updateLayer(this.currentLayer);
    },

    getPulseLayer: function(slug) {
      return _.findWhere(this.pulses, {slug:slug});
    }

  });

}).call(this, this.App);
