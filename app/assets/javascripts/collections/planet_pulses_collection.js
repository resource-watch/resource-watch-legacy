(function(App) {

  'use strict';

  var SQL = 'SELECT * FROM planetpulse';

  App.Collection.PlanetPulses = App.Core.Collection.extend({

    model: App.Model.PlanetPulse,

    url: 'https://insights.cartodb.com/api/v2/sql?q=' + encodeURIComponent(SQL),

    parse: function(data) {
      return data.rows;
    }

  });

}).call(this, this.App);
