(function(App) {

  'use strict';

  App.View.Card = App.Core.View.extend({

    tagName: 'div',

    className: 'card',

    template: this.HandlebarsTemplates.card,

    events: {
      'click .action': '_addToMap'
    },

    state: {
      mode: 'grid'
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Model.Widget(settings.data);
      this.state.set({ mode: settings.mode });

      this.listenTo(this, 'render', this.drawChart);
    },

    render: function() {
      this.$el.html(this.template(this.data.attributes));
      this.el.classList.add(this.state.attributes.mode);
      return this;
    },

    /**
     * Create charts and render it
     */
    drawChart: function() {
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
    },

    _addToMap: function() {
      var layer = this.data.attributes.layer;
      App.Core.Events.trigger('card:layer', layer);
    }

  });

}).call(this, this.App);
