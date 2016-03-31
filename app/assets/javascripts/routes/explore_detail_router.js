(function(App) {

  'use strict';

  App.Router.ExploreDetail = App.Core.Router.extend({

    routes: {
      '(/)': 'exploreDetail',
    },

    props: {
      numSimilarDatasets: 3
    },

    /**
     * Router initializations
     * It stores the current url data
     * @param {String} url param
     */
    initialize: function(slug) {
      this.slug = slug;
    },

    exploreDetail: function() {
      // Get data
      this._getData();

      // Shared components
      this._sharedComponents();

      // Creating dashboard
      this._dashboardComponents();
    },

    _getData: function() {
      // Complete widgets collection
      // TODO: fetch data instead fixtures data
      this.widgets = new App.Collection.Widgets();
      // Generating fixtures
      this.widgets.fixtures();
      this.widgetsData = this.widgets;
    },

    /**
     * Intializes shared components
     * and sets their events
     */
    _sharedComponents: function() {
      // Geo map
      this.geo = new App.View.Geo({});
    },

    /**
     * Dashboard initialization
     */
    _dashboardComponents: function() {
      // Creating card detail
      var data = this.widgetsData.getBySlug(this.slug);
      this.cardDetail = new App.View.CardDetail({
        el: '#cardDetail',
        data: data
      });

      // Limiting collection (TO-DO, get recommended widgets)
      var widgetsData = this.widgetsData.models ?
        this.widgetsData.toJSON() : this.widgetsData;
      widgetsData.slice(0, this.props.numSimilarDatasets);

      this.cards = new App.View.Cards({
        el: '#exploreDashboard',
        data: widgetsData
      });

      // Events
      App.Core.Events.on('card:layer:add', this.geo.mapAddLayer.bind(this.geo));
      App.Core.Events.on('card:layer:remove', this.geo.mapRemoveLayer.bind(this.geo));
    }
  });

}).call(this, this.App);
