(function(App) {

  'use strict';

  App.Collection.Datasets = App.Core.Collection.extend({

    url: App.globals.apiUrl + 'dataset?app=rw&includes=widget',

    model: App.Model.Dataset,

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
      var self = this;

      this.fetch().done(function() {
        self.filterDatasetsWithWidget();
        self.trigger('collection:gotDataset');
        self._getDatasetData();
      });
    },

    /*
      Remove datasets with no widget.
      TODO: move dataset filtering to backend
    */
    filterDatasetsWithWidget: function() {
      var filteredModels = [];
      this.models.forEach(function(model) {
        if (model.get('widget').length)
          filteredModels.push(model);
      });
      this.reset(filteredModels);
    },

    _getDatasetData: function() {

      var modelPromises = [];
      var self = this;

      this.models.forEach(function(model){
        var promise = $.get(model.get('connectorUrl')).then(function(data) {
          model.set('data', data);
        });
        modelPromises.push(promise);
      });

      App.Helpers.allPromises(modelPromises).done(function() {
        self.trigger('collection:gotDatasetData');
      });

    }
  });

}).call(this, this.App);
