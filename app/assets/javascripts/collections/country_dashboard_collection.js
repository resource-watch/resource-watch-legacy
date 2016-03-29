(function(App) {

  'use strict';

  var URL = 'https://insights.cartodb.com/api/v2/sql?q=';
  var BASE_QUERY     = 'SELECT s.* FROM table_spec s',
      DEFAULT_CLAUSE = 'WHERE s.visible = true';

  App.Collection.CountryDashboard = App.Core.Collection.extend({

    url: URL + BASE_QUERY + ' ' + DEFAULT_CLAUSE,

    model: App.Model.CountryDashboard,

    parse: function(data) {
      return _.map(data.rows, function(row) {
        var o = {};
        o.title = row.graph_name;
        o.slug = row.graph_name.replace(/\s'_/gi, '-');
        o.category = row.category_name;

        /* We parse the configuration of the old API */
        o.configuration = JSON.parse(row.configuration);

        if(row.fetch_method === 'query') {
          o.data = new (App.Core.Collection.extend({
            url: URL +
              encodeURIComponent(row.endpoint.replace(/{{iso}}/i, this.iso)),
            parse: function(data) { return data.rows; },
            fetchMethod: 'query'
          }))();
        } else {
          o.data = new (App.Core.Collection.extend({
            url: row.endpoint.replace(/{{iso}}/i, this.iso),
            fetchMethod: 'api'
          }))();
        }

        return o;
      }.bind(this));
    },

  });

}).call(this, this.App);
