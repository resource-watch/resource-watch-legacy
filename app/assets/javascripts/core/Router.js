(function(App) {

  'use strict';

  var ParamsModel = Backbone.Model.extend({});

  App.Core.Router = Backbone.Router.extend({

    constructor: function() {
      this.params = new ParamsModel();
      Backbone.Router.apply(this, arguments);
    }

  });

}).call(this, this.App);
