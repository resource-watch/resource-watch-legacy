(function(App) {

  'use strict';

  // var SQL = 'SELECT code as iso, name, ' +
  //   'ST_AsGeoJSON(st_removerepeatedpoints(the_geom, 0.001)) AS geometry ' +
  //   'FROM country_mask';

  App.Collection.Countries = App.Core.Collection.extend({

    comparator: 'name',

    model: App.Model.Country,

    // url: 'https://wri-01.cartodb.com/api/v2/sql?q=' + encodeURIComponent(SQL),
    url: '/data/countries.json',

    parse: function(data) {
      return _.map(data.features, function(m) {
        m.properties.geometry = JSON.stringify(m.geometry);
        m.properties.iso = m.id;
        return m.properties;
      });
    },

    /**
     * Method to search a string in name
     * @param  {String} value
     */
    search: function(value) {
      var regex = new RegExp(value, 'i');
      return this.filter(function(m) {
        return m.attributes.name.search(regex) !== -1;
      });
    }

  });

}).call(this, this.App);
