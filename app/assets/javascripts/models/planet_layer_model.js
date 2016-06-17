(function(App) {

  'use strict';

  App.Model.PlanetLayer = App.Core.Model.extend({

    url: 'https://insights.cartodb.com/api/v2/sql',

    getDataParams: function(properties) {
      return {
        q: 'SELECT * FROM planetpulse WHERE slug=\'' + properties.slug + '\''
      };
    },

    parse: function(data) {
      return data.rows[0];
    }

  });

}).call(this, this.App);
