(function(App) {

  'use strict';

  App.View.MapCartoDB = App.Core.View.extend({

    props: {
      user_name: '',
      type: 'cartodb',
      cartodb_logo: false,
      sublayers: []
    },

    createLayer: function(map, layerSpecs, el) {
      this.button = el;
      var dataOptions = {};
      dataOptions.data = layerSpecs.layerConfig;
      dataOptions.layerOptions = dataOptions.data.body.layers[0].options;
      dataOptions.opts = _.clone(this.props);
      dataOptions.subLayer = _.extend({}, dataOptions.layerOptions);

      var raster = dataOptions.subLayer.geom_type && dataOptions.subLayer.geom_type == 'raster';

      if (raster)
        dataOptions.subLayer.raster = true;

      dataOptions.opts['user_name'] = dataOptions.data.account;
      dataOptions.opts['sublayers'] = [dataOptions.subLayer];
      dataOptions.opts['maps_api_template'] = 'https://{user}.cartodb.com';

      dataOptions.sqlBounds = new cartodb.SQL({
        user: dataOptions.data.account,
        sql_api_template: 'https://{user}.cartodb.com'
      });

      if (raster) {
        this.handleRasterLayer(map, layerSpecs, dataOptions);
      } else {
        this.handleLayer(map, layerSpecs, dataOptions);
      }
    },

    handleRasterLayer: function(map, layerSpecs, data) {
      data.sqlBounds.execute(data.subLayer.sql).done(function() {
          this.createAddLayer(map, layerSpecs, data);
        }.bind(this))
        .error(function(msg) {
          console.error('Error adding layer');
          this.disableButton(this.button);
        }.bind(this));
    },

    handleLayer: function(map, layerSpecs, data) {
      data.sqlBounds.getBounds(data.subLayer.sql).done(function(bounds) {
          map.fitBounds(bounds);
          this.createAddLayer(map, layerSpecs, data);
        }.bind(this))
        .error(function(msg) {
          console.error('Error adding layer');
          this.disableButton(this.button);
        }.bind(this));
    },

    createAddLayer: function(map, layerSpecs, data) {
      cartodb.createLayer(map, data.opts, {https: true})
        .addTo(map)
        .done(function(layer) {
          if (data.data.interactivity) {
            this._activateInteractivity(map, layer);
          }
          this.trigger('cartodb:addLayer', layerSpecs, layer);
        }.bind(this))
        .error(function(msg) {
          console.error('Error adding layer');
          this.disableButton(this.el);
        });
    },

    disableButton: function(el) {
      el.classList.remove('-active');
      el.innerHTML = el.dataset.i18default;
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
