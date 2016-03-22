(function(App) {

  'use strict';

  App.View.Chart = App.Core.View.extend({

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Model.ChartSpec(settings.data);
      this.setListeners();
    },

    setListeners: function() {
      $(window).on('resize', _.debounce(_.bind(this.update, this), 30));
    },

    /**
     * Vega wrapper to build charts
     * See: https://github.com/vega/vega/wiki
     */
    render: function() {
      var _this = this;
      var vegaSpec = this.getVegaSpec();
      vg.parse.spec(vegaSpec, function(err, chart) {
        if (err) {
          throw err;
        }
        _this.chart = chart({ el:  _this.el });
        _this.chart.update();
      });
    },

    /**
     * Method to redraw chart
     */
    update: function() {
      if (this.chart) {
        var size = this.getSize();
        this.chart.width(size.width).height(size.height).update();
      }
    },

    /**
     * Method to override and parese vega JSON parameterization
     * @return {Object}
     */
    getVegaSpec: function() {
      var size = this.getSize();
      this.data.set({
        width: size.width,
        height: size.height
      });
      return this.data.attributes;
    },

    /**
     * Calculate width and height
     * @return {Object}
     */
    getSize: function() {
      var vegaSpec = this.data.attributes;
      var widthSpace = vegaSpec.padding ?
        vegaSpec.padding.left + vegaSpec.padding.right : 0;
      var heightSpace = vegaSpec.padding ?
        vegaSpec.padding.top + vegaSpec.padding.bottom : 0;
      return {
        width: this.el.clientWidth - widthSpace,
        height: this.el.clientHeight - heightSpace
      };
    }

  });

}).call(this, this.App);
