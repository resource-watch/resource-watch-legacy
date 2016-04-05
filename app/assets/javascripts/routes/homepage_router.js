(function(App) {

  'use strict';

  App.Router.Homepage = App.Core.Router.extend({

    routes: {
      '(/)': 'default'
    },

    default: function() {
      new App.View.CountryDashboardSelector();
    }

  });

}).call(this, this.App);
