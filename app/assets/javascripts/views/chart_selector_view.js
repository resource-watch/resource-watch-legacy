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

      var data = [
        { city: 'Madrid', country: 'Spain', population: 3141992 },
        { city: 'Barcelona', country: 'Spain', population: 1604555 },
        { city: 'Sevilla', country: 'Spain', population: 703021 },
        { city: 'Bilbao', country: 'Spain', population: 346574 },
        { city: 'Granada', country: 'Spain', population: 237540 },
        { city: 'Malaga', country: 'Spain', population: 568479 },
        { city: 'Montpellier', country: 'France', population: 268456 },
        { city: 'Rome', country: 'Italy', population: 2869461 }
      ];

    var chartConfig = [
      {
        name: 'bar',
        acceptedStatTypes: [
          [ 'nominal', 'quantitative' ],
          [ 'ordinal', 'quantitative' ]
        ]
      },
      {
        name: 'pie',
        acceptedStatTypes: [
          [ 'nominal' ],
          [ 'ordinal' ]
        ]
      }
    ];

    var jiminy = new Jiminy(data, chartConfig);
    var recomm = jiminy.recommendation();

    console.log(recomm);

  },

    render: function() {
      this.$el.html(this.template({}));
    }
  });

}).call(this, this.App);
