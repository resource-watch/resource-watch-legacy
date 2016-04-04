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
      'explore(/)': 'Explore',
      'explore/:slug': 'ExploreDetail',
      'countries(/)': 'Countries',
      'countries/:iso': 'CountryDashboard',
      'planet-pulse(/)': 'PlanetPulse'
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
      /* We want to pass to the second router the parameters of the first. To
       * do so, we extract the parameters from the object arguments.
       * All the params are contained inside the second element, in the form
       * of an array. Also, we need to remove the last value because it's
       * always "null".*/
      var params = arguments.length > 1 ?
        arguments[1].slice(0, arguments[1].length - 1) : [];
      /* Here we use some magic: to call the constructor with "apply", we use
       * "bind": the first param is the function itself and the second is an
       * array containing as first value the context and then the params. */
      this.router = new (Router.bind.apply(Router, [null].concat(params)))();

      Backbone.history.start({ pushState: false });
    }
  });

  // We need this to detect router pathname
  Backbone.history.start({ pushState: true });

}).call(this, this.App);
