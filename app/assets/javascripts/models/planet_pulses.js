(function(App) {

  'use strict';

  /**
   * Planet pulse model
   * @type {Object}
   * @example
   * {
   *   "category": "",
   *   "link": "",
   *   "slug": "",
   *   "source_1": "",
   *   "source_2": "",
   *   "source_3": "",
   *   "title_dataset": "",
   * }
   */
  App.Model.PlanetPulse = App.Core.Model.extend({

    default: {
      "category": null,
      "link": null,
      "slug": null,
      "source_1": null,
      "source_2": null,
      "source_3": null,
      "title_dataset": null,
    }

  });

}).call(this, this.App);
