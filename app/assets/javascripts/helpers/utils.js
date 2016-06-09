'use strict';

(function(root) {

  root.App.Helpers = root.App.Helpers || {};

  /**
   * Returns new promise with an array of the promises results
   * @param {Array} array of promises
   * @returns {Promise}
   */
  root.App.Helpers.allPromises = function(promisesArray) {

    var defer = $.Deferred();
    var results = [];
    var finished = 0;

    var length = promisesArray.length;
    if (length === 0) {
      defer.resolve(results);
    } else {
      promisesArray.forEach(function(promise, i) {
        $.when(promise).then(function(value) {
          results[i] = value;
          finished++;
          if (finished === length) {
            defer.resolve(results);
          }
        });
      });
    }

    return defer.promise();
  };


})(window);
