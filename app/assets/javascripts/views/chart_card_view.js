(function(App) {

  'use strict';

  var CARTODB_USER = 'insights';

  App.View.ChartCard = App.Core.View.extend({

    tagName: 'div',

    template: this.HandlebarsTemplates.chart_card,

    state: {
      mode: 'grid'
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Model.Widget(settings.data);

      this.listenTo(this, 'render', function() {
        if(!this.data.attributes.map) this.drawChart();
        else this.drawMap();
      }.bind(this));
    },

    render: function() {
      this.$el.html(this.template(this.data.attributes));
      return this;
    },

    /**
     * Create charts and render it
     */
    drawChart: function() {
      if(!this.data.attributes.chart) return;

      if (this.state.attributes.mode === 'grid') {
        this.chart = new App.View.Chart({
          el: this.$('.chart'),
          data: this.data.attributes.chart
        });
        this.chart.render();
      }
    },

    /* Create a map and render it */
    drawMap: function() {
      var $mapContainer = this.$el.find('.chart');
      $mapContainer.addClass('-map');

      var view = new App.View.Geo({
        props: {
          elMap: $mapContainer,
          basemap: 'light',
          legend: false
        }
      });

      view.mapAddLayer({
        type: 'cartodb',
        user: 'insights',
        sql: this.data.get('data').query,
        cartocss: this.data.get('configuration').y[0].cartocss
      });
    },

    /**
     * Method to update chart
     */
    updateChart: function() {
      if (this.chart) {
        this.chart.update();
      }
    }

  });

}).call(this, this.App);
