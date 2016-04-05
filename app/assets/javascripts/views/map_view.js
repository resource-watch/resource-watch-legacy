(function(App) {

  'use strict';

  App.View.Map = App.Core.View.extend({

    tagName: 'div',

    className: 'map',

    props: {
      map: {
        center: [40, -3],
        zoom: 2,
        maxZoom: 19,
        minZoom: 2,
        scrollWheelZoom: false
      },
      basemap: 'dark',
      disableZoomControls: false,
      basemapsList: {
        light: {
          url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          options: {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }
        },
        dark: {
          url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
          options: {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }
        }
      }
    },

    state: {
      layers: {},
      lastZIndex: 0
    },

    initialize: function() {
      // At beginning create map
      this.createMap();
      this.listenTo(this.state, 'change', this._onLayersChange);
    },

    render: function() {
    },

    /**
     * Creates the leaflet map
     */
    createMap: function() {
      var mapProps = this.props.map;
      if (this.props.disableZoomControls) {
        mapProps.zoomControl = false;
        mapProps.doubleClickZoom = false;
      }
      this.map = L.map(this.el, mapProps);
      this.setBasemap();
    },

    /**
     * Sets the map's basemap
     */
    setBasemap: function() {
      var basemap = this.props.basemapsList[this.props.basemap];
      this.basemap = L.tileLayer(basemap.url, basemap.options);
      this.basemap.addTo(this.map);
    },

    /**
     * Returns the map's instance
     */
    getMap: function() {
      return this.map;
    },

    /**
     * Adds a previously instanced layer
     * in a list to manage it from the map
     */
    addLayer: function(data, layer) {
      var layers = this.state.attributes.layers;

      if (!layers[data.name]) {
        if (data.zIndex === 0) {
          var newIndex = this.state.attributes.lastZIndex + 1;
          data.zIndex = newIndex;
          this.state.set({
            lastZIndex: newIndex
          }, { silent: true });
        }

        layers[data.name] = {
          data: data,
          layer: layer
        };
      }
      this.state.set({
        layers: layers
      }, { silent: true });
      this.state.trigger('change');
    },

    /**
     * Re-sets the zIndex for all of the layers
     */
    setOrder: function(data) {
      var layers = this.state.attributes.layers;
      _.each(data, function(d) {
        var currentLayer = layers[d.name];
        currentLayer.data.zIndex = d.zIndex;
        if (currentLayer) {
          currentLayer.layer.setZIndex(d.zIndex);
        }
      });
    },

    /**
     * Sets the active status of a layer
     */
    setActive: function(layer) {
      var layers = this.state.attributes.layers;
      var selectedLayer = layers[layer.name];

      if (selectedLayer) {
        selectedLayer.data.active = layer.active;
        if (layer.active) {
          selectedLayer.layer.setOpacity(1);
        } else {
          selectedLayer.layer.setOpacity(0);
        }
      }
    },

    /**
     * When a layer changes it triggers
     * a list of layers with the new data
     */
    _onLayersChange: function() {
      this.trigger('map:layers', this.state.attributes.layers);
    },

    /**
     * Removes a layer from the map and local list
     */
    removeLayer: function(layer) {
      var layers = this.state.attributes.layers;
      var selectedLayer = layers[layer.name];

      if (selectedLayer) {
        var newsList = {};
        this.map.removeLayer(selectedLayer.layer);

        _.each(layers, function(lay) {
          if (lay.data.name !== layer.name) {
            newsList[lay.data.name] = lay;
          }
        });
        this.state.set({
          layers: newsList
        }, { silent: true });
        this.state.trigger('change');
      }
    }
  });

}).call(this, this.App);
