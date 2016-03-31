(function(App) {

  'use strict';

  App.helpers = {

    /**
     * Calc size from element, by default is window
     * @param  {Object} element DOM Element
     * @return {Object}
     */
    calcSize: function(element) {
      if (!element) {
        element = window;
      }
      return {
        width: element.clientWidth,
        height: element.clientHeight
      }
    }

  };

}).call(this, this.App);
