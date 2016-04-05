(function(App) {

  'use strict';

  App.View.Geo = App.Core.View.extend({

    tagName: 'div',

    className: 'geo',

    props: {
      elMap: '#map',
      elLegend: '#legend',
      basemap: 'dark',
      legend: true,
      disableZoomControls: false
    },

    initialize: function() {
      this._start();
    },

    render: function() {
    },

    /**
     * Initializes the map and
     * related components
     */
    _start: function() {
      // Creating map
      this.map = new App.View.Map({
        el: this.props.elMap,
        props: {
          disableZoomControls: this.props.disableZoomControls,
          basemap: this.props.basemap
        }
      });

      // Create map popup
      this.mapPopup = new App.View.MapPopup({});

      // Legend
      if (this.props.legend) {
        this._createLegend();
      }

      // Providers*/
      this._mapProviders();

      // Events
      App.Core.Events.on('mapPopup:update', this.mapPopup.update.bind(this.mapPopup));
    },

    /**
     * Initializes or not the legend depending
     * on the props
     */
    _createLegend: function() {
      // Legend
      this.legend = new App.View.Legend({
        el: this.props.elLegend
      });

      // Events
      this.listenTo(this.legend, 'legend:order', this.map.setOrder.bind(this.map));
      this.listenTo(this.legend, 'legend:active', this.map.setActive.bind(this.map));
      this.listenTo(this.map, 'map:layers', this.legend.update.bind(this.legend));
    },

    /**
     * Initializes the layers
     * providers for initializations
     */
    _mapProviders: function() {
      this.mapCartoDB = new App.View.MapCartoDB({});

      // Events
      this.listenTo(this.mapCartoDB, 'cartodb:addLayer', this.map.addLayer.bind(this.map));
    },

    /**
     * Show popup
     */
    _showPopup: function(data) {
      this.popup.state.set({
        data: data
      });
    },

    /**
     * Creates a layer and adds it to
     * the map after checking its type
     */
    mapAddLayer: function(layer) {
      if (layer.type === 'cartodb') {
        this.mapCartoDB.createLayer(this.map.getMap(), layer);
      }
    },

    /**
     * Removes the layer from the map
     */
    mapRemoveLayer: function(layer) {
      this.map.removeLayer(layer);
    }

  });

}).call(this, this.App);
