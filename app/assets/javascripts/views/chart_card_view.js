(function(App) {

  'use strict';

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

      this.listenTo(this, 'render', this.drawChart);
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
      // console.trace(this.data.attributes.chart);
      if (this.state.attributes.mode === 'grid') {
        this.chart = new App.View.Chart({
          el: this.$('.chart'),
          data: this.data.attributes.chart
        });
        this.chart.render();
      }
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
