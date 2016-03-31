(function(App) {

  'use strict';

  App.View.ChartSelector = App.Core.View.extend({

    tagName: 'div',

    className: 'chart-selector',

    template: this.HandlebarsTemplates.chart_selector,

    state: {
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template({}));
    }
  });

}).call(this, this.App);
