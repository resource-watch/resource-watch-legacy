(function(App) {

  'use strict';

  App.View.MapCartoDB = App.Core.View.extend({

    props: {
      user_name: '',
      type: 'cartodb',
      cartodb_logo: false,
      sublayers: []
    },

    createLayer: function(map, data) {
      var _this = this;
      var opts = _.clone(this.props);
      var subLayer = {
        sql: data.sql,
        cartocss: data.cartocss,
        interactivity: data.interactivity
      };
      opts['user_name'] = data.user;
      opts['sublayers'] = [];
      opts['sublayers'].push(subLayer);

      var sqlBounds = new cartodb.SQL({
        user: data.user
      });

      sqlBounds.getBounds(subLayer.sql).done(function(bounds) {
        map.fitBounds(bounds);
        cartodb.createLayer(map, opts)
          .addTo(map)
          .done(function(layer) {
            if (data.interactivity) {
              _this._activateInteractivity(map, layer);
            }
            _this.trigger('cartodb:addLayer', layer);
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
