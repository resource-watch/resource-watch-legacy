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

    urlRoot: App.Helpers.Globals.apiUrl + 'widgets',

    idAttribute: 'slug',

    default: {
      title: null,
      description: null,
      slug: null,
      chart: {},
      layers: [],
      dataSource: null
    },

    getWidgetData:function() {
      var url = this.attributes.query_url;
      var promise = null;
      if (url) {
        promise= $.get(url);
        promise.done(function(dataset) {
          this.attributes.data = dataset.data;
          this.attributes.data_attributes = dataset.data_attributes;
        }.bind(this));
      } else {
        this.attributes.data = [];
      }
      return promise;
    }

  });

}).call(this, this.App);
