(function(App) {

  'use strict';

  /**
   * Widget model
   * @type {Object}
   * @example
   * {
   *   "title": "",
   *   "description": "",
   *   "slug": "",
   *   "data": [],
   *   "chart": {}, // Vega parametrization (https://github.com/vega/vega/wiki)
   *   "layers": [{
   *     "provider": "cartodb", // cartodb or arcgis
   *     "options": {
   *       "sql": "SELECT...",
   *       "cartocss": "..."
   *       "interactivity": ""
   *     }
   *   }],
   *   "dataSource": "",
   *   "verified": false
   * }
   */
  App.Model.Widget = App.Core.Model.extend({

    urlRoot: App.Helpers.Globals.apiUrl+'widgets',

    idAttribute: 'slug',

    default: {
      title: null,
      description: null,
      slug: null,
      chart: {},
      layers: [],
      dataSource: null
    }

  });

}).call(this, this.App);
