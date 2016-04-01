(function(App) {

  'use strict';

  App.View.ChartSelector = App.Core.View.extend({

    tagName: 'div',

    className: 'chart-selector',

    events: {
      'change .type': '_onTypeChange'
    },

    template: this.HandlebarsTemplates.chart_selector,

    props: {
      elSelectsValues: '.value',
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
            [ 'quantitative' ]
          ]
        }
      ],
      chartsTypes: {
        bar: [{
          label: 'X axis',
          name: 'x'
        },
        {
          label: 'Y axis',
          name: 'y'
        }],
        line: [{
          label: 'X axis',
          name: 'x'
        },
        {
          label: 'Y axis',
          name: 'y'
        }],
        pie: [{
          label: 'Value',
          name: 'value'
        }]
      }
    },

    state: {
      data: null,
      type: null
    },

    initialize: function(settings) {
      if (settings.data) {
        this.state.set({
          data: settings.data
        }, { silent: true });
        this._getChartsSuggestions();
      }
    },

    render: function() {
      var recomms = [];
      var columns = this._getColumns();

      _.each(this.data.recomms, _.bind(function(d) {
        recomms.push({
          type: d,
          selected: this.state.attributes.type === d
        })
      }, this));

      this.$el.html(this.template({
        recomms: recomms,
        columns: columns
      }));
      this._generateGraph();
    },

    _getChartsSuggestions: function() {
      this.jiminy = new Jiminy(this.state.attributes.data,
        this.props.chartConfig);
      var columns = [];
      var recomm = this.jiminy.recommendation();

      if (recomm) {
        columns = this.jiminy.columns(recomm[0]);
        this.state.set({
          type: recomm[0]
        });
      }

      this.data = {
        recomms: recomm,
        columns: columns
      };
      this.render();
    },

    _generateGraph: function() {
      var $values = this.el.querySelectorAll(this.props.elSelectsValues);
      var selectedColumns = [];
      for (var i = 0; i < $values.length; i++) {
        var current = $values[i];
        var selected = current.querySelector('option:checked');
        selectedColumns.push(selected.value);
      }

      var newDataSet = _.pluck(this.state.attributes, selectedColumns);
      console.log(selectedColumns, newDataSet);
    },

    _getColumns: function() {
      var chartTypes = this.props.chartsTypes[this.state.attributes.type];
      var chartColumns = [];

      _.each(chartTypes, _.bind(function(d, i) {
        var column = {
          label: d,
          options: _.map(this.data.columns, function(c, e) {
            return {
              column: c,
              selected: i === e
            };
          })
        };
        chartColumns.push(column);
      }, this));
      return chartColumns;
    },

    _onTypeChange: function(ev) {
      var current = ev.currentTarget;
      var type = current.value;

      this.state.set({
        type: type
      });
    }
  });

}).call(this, this.App);
