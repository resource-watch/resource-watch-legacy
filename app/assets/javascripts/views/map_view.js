(function(App) {

  'use strict';

  App.View.Map = App.Core.View.extend({

    tagName: 'div',

    className: 'map',

    props: {
      map: {
        center: [40, -3],
        zoom: 8,
        maxZoom: 19
      },
      basemap: {
        url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        options: {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }
      }
    },

    initialize: function() {
      // At beginning create map
      this.createMap();
    },

    createMap: function() {
      this.map = L.map(this.el, this.props.map);
      this.setBasemap();
    },

    setBasemap: function() {
      var basemap = this.props.basemap;
      this.basemap = L.tileLayer(basemap.url, basemap.options);
      this.basemap.addTo(this.map);
    },

    setOrder: function() {

    },

    setActive: function() {
      
    }

  });

}).call(this, this.App);
