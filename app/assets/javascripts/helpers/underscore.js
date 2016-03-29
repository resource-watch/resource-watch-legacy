(function(App) {

  'use strict';

  _.mixin({

    /* Return the sum of the passed values */
    sum: function(values) {
      return _.reduce(values, function(sum, val) { return sum + val; }, 0);
    },

    /* Return a capitalized version of the string */
    capitalize: function(string) {
      return string.replace(/(^|\s)([a-zA-Z])/g, function(char) {
        return char.toUpperCase();
      });
    },

    /* Return the median of the values */
    median: function(originalValues) {
      var values = originalValues.slice();
      values.sort(function(a,b) { return a - b; });
      return (values[(values.length - 1) >> 1] + values[values.length >> 1]) / 2;
    },

    /* Return a string with the number formated in the US format */
    formatNumber: (function(number) {
      var format = d3.format(',');
      return function(number) {
        return format(number);
      };
    })()

  });

}).call(this, this.App);
