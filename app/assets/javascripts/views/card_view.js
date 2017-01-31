(function(App) {

  'use strict';

  App.View.Card = App.Core.View.extend({

    tagName: 'div',

    className: 'card',

    template: this.HandlebarsTemplates.card,

    events: {
      'click .js-toggle-layer': '_addToMap'
    },

    props: {
      activeClass: '-active'
    },

    state: {
      mode: 'grid',
      actions: true
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.chartEl = this.$('.chart');
      this.data = settings.data;
      this.state.set({
        mode: settings.mode,
        actions: settings.actions
      });
    },

    render: function() {
      this.$el.html(this.template({
        data: this.data,
        widget: this.getWidgetAttributes(),
        state: this.state.attributes
      }));
      this.el.classList.add(this.state.attributes.mode);
      return this;
    },

    /**
     * Create charts and render it
     */
    drawChart: function() {
      var chart_data = typeof this.data !== 'undefined' ? (this.data.widgetConfig ||
        this.data.widget[0].attributes.widgetConfig) : null;

      if (chart_data) {
        chart_data.data = chart_data.data || this.data.data || this.data.widgetConfig.data;
      }

      if (this.state.attributes.mode === 'grid' && chart_data) {
        _.each(chart_data.data, function(d) {
          if (d.name === 'table') {
            d.values = this.data.data;
          }
        }.bind(this));

        this.chart = new App.View.Chart({
          el: this.$('.chart'),
          data: chart_data
        });
        this.chart.render();
      }
    },

    /**
     * Create static map and render it
     */
    drawMapPreview: function() {
      var layer_data = typeof this.data !== 'undefined' ? this.data.layer[0].attributes.layerConfig: null;

      // Load basemap
      var basemapBody = {
        "maxzoom":18,
        "minzoom":3,
        "layers":[{
          "type": "mapnik",
          "options": {
            "sql": "SELECT * FROM gadm28_countries",
            "cartocss": "#gadm28_countries{ polygon-fill: #bbbbbb; polygon-opacity: 1; line-color: #FFFFFF; line-width: 0.5; line-opacity: 0.5;}",
            "cartocss_version":"2.3.0"
          }
        }]
      };


      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://wri-01.carto.com/api/v1/map');
      xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.send(JSON.stringify(basemapBody));

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);

            this.mapPreview = new App.View.MapPreview({
              el: this.$('.chart'),
              data: layer_data,
              basemapId: data.layergroupid
            });

            this.mapPreview.loadImage();
          } else {
            console.error('error');
          }
        }
      }.bind(this);
    },

    /**
     * Method to update chart
     */
    updateChart: function() {
      if (this.chart) {
        this.chart.update();
      }
    },

    getWidgetAttributes: function() {
      if (this.data.widget && this.data.widget.length)
        return this.data.widget[0].attributes;

      if (this.data.layer && this.data.layer.length)
        return this.data.layer[0].attributes;

      return {};
    },

    /**
     * Add to map if the card has a layer_name
     * @param {Object} element event
     */
    _addToMap: function(ev) {
      var el = ev.currentTarget;
      var layer = _.clone(this.data.layer[0].attributes);

      if (!el.classList.contains(this.props.activeClass)) {
        App.Core.Events.trigger('card:layer:add', layer, el);
        el.classList.add(this.props.activeClass);
        el.innerHTML = el.dataset.i18active;
      } else {
        App.Core.Events.trigger('card:layer:remove', layer);
        el.classList.remove(this.props.activeClass);
        el.innerHTML = el.dataset.i18default;
      }
    }

  });

}).call(this, this.App);
