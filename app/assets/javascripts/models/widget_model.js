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
    },

    getData:function() {
      var defer = $.Deferred();

      this.fetch()
        .done(function(data) {
          if (data.query_url){
            this._getDataSet(data.query_url)
              .done(function(dataset) {
                this.attributes.data = dataset.data;
                defer.resolve();
              }.bind(this))
              .fail(function(err) {
                defer.reject(err);
              }.bind(this));
          } else {
            this.attributes.data = [];
            defer.resolve();
          }
        }.bind(this))
        .fail(function(err) {
          defer.reject(err);
        }.bind(this));

      return defer.promise();
    },

    _getDataSet: function(url) {
      return $.get(url);
    },

  });

}).call(this, this.App);
