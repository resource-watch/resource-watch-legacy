(function(App) {

  'use strict';

  App.View.ChartSelector = App.Core.View.extend({

    tagName: 'div',

    className: 'chart-selector',

    template: this.HandlebarsTemplates.chart_selector,

    props: {
      chartConfig: [
        {
          name: 'bar',
          acceptedStatTypes: [
            [ 'quantitative', 'quantitative' ],
            [ 'ordinal', 'quantitative' ],
            [ 'nominal', 'ordinal' ]
          ]
        },
        {
          name: 'line',
          acceptedStatTypes: [
            [ 'quantitative', 'quantitative' ],
            [ 'ordinal', 'quantitative' ],
            [ 'nominal', 'ordinal' ]
          ]
        },
        {
          name: 'pie',
          acceptedStatTypes: [
            [ 'nominal' ],
            [ 'ordinal' ]
          ]
        }
      ]
    },

    state: {
      data: null
    },

    initialize: function(settings) {
      if (settings.data) {
        this.state.set({
          data: settings.data
        }, { silent: true });
        this.render();
      }
    },

    render: function() {
      var data = this._getChartsSuggestions();
      this.$el.html(this.template(data));
    },

    _getChartsSuggestions: function() {
      var jiminy = new Jiminy(this.state.attributes.data,
        this.props.chartConfig);
      var recomm = jiminy.recommendation();
      var columns = jiminy.columns('bar');

      return {
        recomms: recomm,
        columns: columns
      };
    }
  });

}).call(this, this.App);
