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
        this.listenTo(this.pulsesView, 'pulses:loaded', this.onPulsesLoaded);
      }

    },

    onPulsesLoaded: function(pulses) {
      this.pulses=pulses;
      this.initFullScreen();
      this.initGlobe(pulses);
    },

    initFullScreen: function() {
      this.fullScreenView = new App.View.FullScreen({
        fullscreenBtn: 'fullscreenBtn',
        container: 'content'
      });
    },

    initGlobe: function() {
      this.currentLayer = this.getPulseLayer(this.initLayerSlug);
      if (!this.globe){
        this.globe = new App.View.Globe({
          el: '#globeView',
          layer: this.currentLayer
        });
        this.listenTo(this.fullScreenView.state, 'change', this.onFullscreenChanged);
      }
      this.updateGlobeAspect();
    },

    onFullscreenChanged: function() {
      var size = {};
      if (this.fullScreenView.state.attributes.isFullscreen) {
        size.width = screen.width;
        size.height = screen.height;
      } else {
        size = App.helpers.calcSize(this.globe.el);
      }

      this.globe.changeSceneSize(size.width,size.height);
    },

    setPulse: function() {
      var route = this.pulsesView.state.attributes.layerSelected ?
        this.pulsesView.state.attributes.categorySelected + '/' + this.pulsesView.state.attributes.layerSelected
        : this.pulsesView.state.attributes.categorySelected;
      this.navigate( route , { trigger: false });
      this.updateGlobeAspect();
    },

    setPlanetLayer: function() {
      this.currentLayer = this.getPulseLayer(this.pulsesView.state.attributes.layerSelected);
      this.globe.updateLayer(this.currentLayer);
    },

    updateGlobeAspect: function() {
      if (this.pulsesView.state.attributes.categorySelected) {
        this.globe.changePosition(15, 0);
      } else {
        this.globe.changeSceneZoom();
        this.globe.changePosition();
      }
    },

    getPulseLayer: function(slug) {
      return _.findWhere(this.pulses, {slug:slug});
    }

  });

}).call(this, this.App);
