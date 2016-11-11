(function(App) {

  'use strict';

  App.Collection.Datasets = App.Core.Collection.extend({

    url: App.globals.apiUrl + 'dataset?app=rw',

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
        self.trigger('collection:gotDataset');
        self.trigger('collection:gotDatasetData');
      });
    }

    // _getDatasetData: function() {
    //   var modelPromises = [];
    //   this.models.forEach(function(model){
    //     modelPromises.push(model.fetch());
    //   });
    //
    //   App.Helpers.allPromises(modelPromises).done(function() {
    //     this.trigger('collection:gotDataset');
    //     modelPromises = [];
    //     this.models.forEach(function(model){
    //       modelPromises.push(model.getDatasetData());
    //     });
    //     App.Helpers.allPromises(modelPromises).done(function() {
    //       this.trigger('collection:gotDatasetData');
    //
    //     }.bind(this));
    //   }.bind(this));
    //
    // }
  });

}).call(this, this.App);
