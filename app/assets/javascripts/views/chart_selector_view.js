(function(App) {

  'use strict';

  App.View.ChartSelector = App.Core.View.extend({

    tagName: 'div',

    className: 'chart-selector',

    events: {
      'change .type': '_onTypeChange',
      'change .action .value': '_onValueChange'
    },

    template: this.HandlebarsTemplates.chart_selector,

    props: {
      elSelectsValues: '.value',
      activeClass: '_visible',
      chartConfig: [
        {
          name: 'bar',
          acceptedStatTypes: [
            [ 'nominal' ],
            [ 'ordinal' ],
            [ 'quantitative' ],
            [ 'temporal' ]
          ]
        },
        {
          name: 'line',
          acceptedStatTypes: [
            [ 'quantitative', 'temporal' ]
          ]
        },
        {
          name: 'pie',
          acceptedStatTypes: [
            [ 'nominal' ],
            [ 'ordinal' ]
          ]
        }
      ],
      chartsTypes: {
        bar: [{
          label: 'X axis',
          name: 'x',
          type: 'date'
        },
        {
          label: 'Y axis',
          name: 'y',
          type: 'number'
        }],
        groupBar: [{
          label: 'X axis',
          name: 'x',
          type: 'string'
        },
        {
          label: 'Y axis',
          name: 'y',
          type: 'number'
        }],
        line: [{
          label: 'X axis',
          name: 'x',
          type: 'date'
        },
        {
          label: 'Y axis',
          name: 'y',
          type: 'number'
        }],
        pie: [{
          label: 'Value',
          name: 'value',
          type: 'number'
        },
        {
          label: 'Category',
          name: 'category',
          type: 'string'
        }]
      }
    },

    state: {
      data: null,
      type: null
    },

    initialize: function() {
      this.listenTo(this.state, 'change:data', this._getChartsSuggestions);
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

    /**
     * Uses jiminy library to get charts
     * suggestions depending on the data
     */
    _getChartsSuggestions: function() {
      var data = this.state.attributes.data;

      this.jiminy = new Jiminy(this.state.attributes.data,
        this.props.chartConfig);
      var columns = [];
      var recomm = this.jiminy.recommendation();

      if (recomm) {
        columns = this.jiminy.columns(recomm[0]);
        recomm = this._checkRecommWithAttributes(recomm);
        this.state.set({
          type: recomm[0]
        });
      }

      this.data = {
        recomms: recomm,
        columns: columns
      };
    },

    /**
     * Checks the chart types recommended by
     * jiminy and and customizes it depending
     * on the avaialble data types
     * @param {Object} chart recommendation list
     */
    _checkRecommWithAttributes: function(recommList) {
      var dataAttributes = this.state.attributes.data_attributes;
      var hasDate = _.findWhere(dataAttributes, { type: 'date' });

      if (recommList.indexOf('bar') !== -1 && !hasDate) {
        recommList = this._removeRecommendation(recommList, 'bar');
        recommList.unshift('groupBar');
      }

      return recommList;
    },

    /**
     * Removes a recommendation from the list
     * @param {Object} available chart types
     * @param {String} chart type
     */
    _removeRecommendation: function(list, chartType) {
      var index = list.indexOf(chartType);

      if (index > -1) {
        list.splice(index, 1);
      }

      return list;
    },

    /**
     * Gets the available columns for the
     * chart and also sets th default values
     */
    _getColumns: function() {
      var chartTypes = this.props.chartsTypes[this.state.attributes.type];
      var chartColumns = [];
      var selected = [];

      _.each(chartTypes, _.bind(function(d, i) {
        var column = {
          label: d.label,
          name: d.name,
          options: this._getColumnsByType(this.data.columns, d.type)
        };
        chartColumns.push(column);
      }, this));

      return chartColumns;
    },

    /**
     * Checks the data type of each column
     * to prioritize them depending on the
     * chart type and setting them as default
     * values for the render
     * @param {Object} available columns
     * @param {String} data type
     */
    _getColumnsByType: function(columns, type) {
      var dataAttributes = this.state.attributes.data_attributes;
      var columnsList = _.clone(columns);
      var resultList = [];

      _.each(columnsList, function(d) {
        var attrs = dataAttributes[d];
        var item = {
          column: d,
          selected: false
        };

        if (attrs && attrs.type === type) {
          item.selected = true
        }
        resultList.push(item);
      });

      return resultList;
    },

    /**
     * Gets the configuration for the chart,
     * and triggers a chart update with the
     * new data
     */
    _generateGraph: function() {
      var $values = this.el.querySelectorAll(this.props.elSelectsValues);
      var newData = [];
      for (var i = 0; i < $values.length; i++) {
        var current = $values[i];
        var selected = current.querySelector('option:checked');
        var data = _.pluck(this.state.attributes.data, selected.value);

        _.each(data, function(d, e){
          if (i === 0) {
            var nData = {};
            nData[current.dataset.name] = d;
            newData.push(nData);
          } else {
            newData[e][current.dataset.name] = d;
          }
        });
      }

      this.trigger('chart:update', this.state.attributes.type, newData);
      this._hide();
    },

    /**
     * When the user changes the chart
     * type, it saves the new data
     * @param {Object} event
     */
    _onTypeChange: function(ev) {
      var current = ev.currentTarget;
      var type = current.value;

      this.state.set({
        type: type
      });
    },

    /**
     * When the user changes the chart
     * axis, it saves the new data and
     * it renders it again
     * @param {Object} event
     */
    _onValueChange: function(ev) {
      var current = ev.currentTarget;
      var value = current.value;

      this._generateGraph();
    },

    _hide: function() {
      this.el.classList.remove(this.props.activeClass);
    },

    toggle: function() {
      if (!this.el.classList.contains(this.props.activeClass)) {
        this.el.classList.add(this.props.activeClass);
      } else {
        this.el.classList.remove(this.props.activeClass);
      }
    }
  });

}).call(this, this.App);
