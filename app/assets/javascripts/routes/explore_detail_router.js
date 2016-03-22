(function(App) {

  'use strict';

  App.Router.ExploreDetail = App.Core.Router.extend({

    routes: {
      '(/)': 'exploreDetail',
      'page:page(/)': 'exploreDetail'
    },

    /**
     * Render cards and charts
     * @param {Number} page
     */
    exploreDetail: function(page) {
      var ITEMS_PER_PAGE = 3;

      this.params.set({ page: Number(page || 1) });

      // Creating card detail
      this.cardDetail =new App.View.CardDetail({ 
        el: '#cardDetail',
        data: {}
      });

      // Creating map
      this.map = new App.View.Map({ el: '#map' });

      // Complete widgets collection
      // TODO: fetch data instead fixtures data
      var widgetsData = this.widgets = new App.Collection.Widgets();
      // Generating fixtures
      widgetsData.fixtures();

      // Creating pagination
      this.pagination = new App.View.Pagination({
        el: '#pagination',
        props: {
          itemsPerPage: ITEMS_PER_PAGE,
          current: this.params.attributes.page,
          pages: Math.ceil(widgetsData.length / ITEMS_PER_PAGE)
        }
      });

      // Creating dashboard
      var pageRange = this.pagination.getPageRange();
      // Slicing collection by current page
      widgetsData = widgetsData
        .slice(pageRange.startIndex, pageRange.endIndex);
      this.cards = new App.View.Cards({
        el: '#exploreDashboard',
        data: widgetsData
      });

      // Settings events
      this.listenTo(this.pagination.state, 'change:current', this.setPage);
      this.listenTo(this.params, 'change', this.updateParams);
    },

    /**
     * Update router params, this action doesn't trigger
     */
    updateParams: function() {
      var route = '';
      var page = this.params.attributes.page;
      if (page) {
        route = 'page:' + page;
      }
      this.navigate(route, { trigger: false });
      this.updateCards();
    },

    /**
     * Set page param in model
     */
    setPage: function() {
      this.params.set('page', this.pagination.state.attributes.current);
    },

    /**
     * Update and render cards
     */
    updateCards: function() {
      var pageRange = this.pagination.getPageRange();
      var widgetsData = this.widgets;
      var itemsPerPage = this.pagination.state.attributes.itemsPerPage;
      this.pagination.state
          .set('pages', Math.ceil(widgetsData.length / itemsPerPage));
      widgetsData= widgetsData
        .slice(pageRange.startIndex, pageRange.endIndex);
      // Reseting cards collection and render it
      this.cards.collection.reset(widgetsData);
    }

  });

}).call(this, this.App);
