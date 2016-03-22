(function(App) {

  'use strict';

  /**
   * Object useful to work with multiple routes
   * @type {Object}
   */
  var Dispatcher = Backbone.Router.extend({

    /**
     * Routes namespaces
     * @type {Object}
     */
    routes: {
      'explore': 'Explore',
      'explore(/:slug)': 'ExploreDetail',
      'countries': 'Countries'
    }

  });

  /**
   * At begining intance dispatcher and listen changes on location
   * @type {Dispatcher}
   */
  var dispatcher = new Dispatcher();

  dispatcher.on('route', function(routeName) {
    Backbone.history.stop();
    var Router = App.Router[routeName];
    if (Router) {
      this.router = new Router();
      Backbone.history.start({ pushState: false });
    }
  });

  // We need this to detect router pathname
  Backbone.history.start({ pushState: true });

}).call(this, this.App);
