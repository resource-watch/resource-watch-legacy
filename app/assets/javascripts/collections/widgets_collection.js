(function(App) {

  'use strict';

  App.Collection.Widgets = App.Core.Collection.extend({

    url: App.globals.apiUrl + 'widget?app=rw&includes=layer',

    model: App.Model.Widget,

    parse: function(res) {
      return res.data;
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
    },

    getWithDatasetData: function() {
      this.fetch().done(this._getDatasetData.bind(this));
    },

    _getDatasetData: function() {
      var modelPromises = [];
      this.models.forEach(function(model){
        modelPromises.push(model.fetch());
      });

      App.Helpers.allPromises(modelPromises).done(function() {
        this.trigger('collection:gotWidget');
        modelPromises = [];
        this.models.forEach(function(model){
          modelPromises.push(model.getWidgetData());
        });
        App.Helpers.allPromises(modelPromises).done(function() {
          this.trigger('collection:gotWidgetData');
        }.bind(this));
      }.bind(this));
    }
  });

}).call(this, this.App);
