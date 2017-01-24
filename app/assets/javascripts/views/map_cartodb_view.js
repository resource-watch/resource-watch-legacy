(function(App) {

  'use strict';

  App.View.MapCartoDB = App.Core.View.extend({

    props: {
      user_name: '',
      type: 'cartodb',
      cartodb_logo: false,
      sublayers: []
    },

    createLayer: function(map, layerSpecs) {
      var data = layerSpecs.layerConfig;
      var layers = data.body.layers;
      var layerOptions = layers[0].options;
      var _this = this;
      var opts = _.clone(this.props);
      var subLayer = {
        sql: layerOptions.sql,
        cartocss: layerOptions.cartocss,
        interactivity: layerOptions.interactivity
      };
      opts['user_name'] = data.account;
      opts['sublayers'] = [];
      opts['sublayers'].push(subLayer);
      opts['maps_api_template'] = 'https://{user}.cartodb.com';

      var sqlBounds = new cartodb.SQL({
        user: data.account,
        sql_api_template: 'https://{user}.cartodb.com'
      });
      sqlBounds.getBounds(subLayer.sql).done(function(bounds) {
        map.fitBounds(bounds);
        cartodb.createLayer(map, opts, {https: true})
          .addTo(map)
          .done(function(layer) {
            if (data.interactivity) {
              _this._activateInteractivity(map, layer);
            }
            _this.trigger('cartodb:addLayer', layerSpecs, layer);
          });
      });
    },

    _activateInteractivity: function(map, layer) {
      var _this = this;
      var sublayer = layer.getSubLayer(0);

      sublayer.setInteraction(true);
      sublayer.on('featureClick', function(event, latlng, pos, data) {
        _this._renderInfoWindow(map, data, latlng);
      });
    },

    _renderInfoWindow: function(map, data, latlng) {
      App.Core.Events.trigger('mapPopup:update',
        data, latlng, map);
    }

  });

}).call(this, this.App);
