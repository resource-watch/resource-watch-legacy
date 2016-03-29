(function(App) {

  'use strict';

  App.Router.Explore = App.Core.Router.extend({

    routes: {
      '(/)': 'exploreDashboard',
      '(page::page)(/)': 'exploreDashboard',
      '(q::q)/(page::page)(/)': 'exploreDashboard'
    },

    props: {
      itemsPerPage: 6
    },

    /**
     * Sets main parameters and starts
     * the explore section
     * @param {String} query search
     * @param {Number} page number
     */
    exploreDashboard: function(q, page) {
      // Converting q and page param
      if (!page && q) {
        page = q;
        q = null;
      }
      this.params.set({
        page: Number(page || 1),
        q: q
      });

      // Get data
      this._getData();

      // Shared components
      this._sharedComponents();

      // Creating dashboard
      this._dashboardComponents();

      // Create map components
      this._mapComponents();

      // Settings events
      this.listenTo(this.params, 'change', this.updateParams);
    },

    /**
     * Gets main data for the components
     */
    _getData() {
      // Complete widgets collection
      // TODO: fetch data instead fixtures data
      this.widgets = new App.Collection.Widgets();
      // Generating fixtures
      this.widgets.fixtures();
      this.widgetsData = this.widgets;

      if (this.params.attributes.q) {
        this.widgetsData = this.widgets.search(this.params.attributes.q);
      }
    },

    /**
     * Intializes shared components
     * and sets their events
     */
    _sharedComponents: function() {
      // Search form
      this.searchForm = new App.View.SearchForm({
        el: '#searchForm',
        props: {
          value: this.params.attributes.q
        }
      });

      // Filters navigation
      this.exploreNavigation = new App.View.ExploreNavigation({
        el: '#exploreNavigation',
        data: this.widgets.toJSON()
      });

      // Pagination
      this.pagination = new App.View.Pagination({
        el: '#pagination',
        props: {
          itemsPerPage: this.props.itemsPerPage,
          current: this.params.attributes.page,
          pages: Math.ceil(this.widgetsData.length / this.props.itemsPerPage)
        }
      });

      // Setting events
      this.listenTo(this.searchForm.state, 'change:value', this.setQuery);
      this.listenTo(this.exploreNavigation.state, 'change:mode', this.setMode);
      this.listenTo(this.pagination.state, 'change:current', this.setPage);
    },

    /**
     * Dashboard initialization
     */
    _dashboardComponents: function() {
      // Slicing collection by current page
      var pageRange = this.pagination.getPageRange();
      var widgetsData = this.widgetsData.models ?
        this.widgetsData.toJSON() : this.widgetsData;
      widgetsData.slice(pageRange.startIndex,
        pageRange.endIndex);

      this.cards = new App.View.Cards({
        el: '#exploreDashboard',
        data: widgetsData
      });
    },

    /**
     * Initializes the map and
     * related components
     */
    _mapComponents: function() {
      // Creating map
      this.map = new App.View.Map({
        el: '#map'
      });

      // Create map popup
      this.mapPopup = new App.View.MapPopup({});

      // Providers
      this._mapProviders();

      // TESTNG
      this.mapCartoDB.createLayer(this.map.getMap(), {
        user: 'geriux',
        sql: 'SELECT * FROM ny_policeprecints',
        cartocss: '#ny_policeprecints{ polygon-fill: #FFFFCC; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.5; line-opacity: 1;}#ny_policeprecints [ precinct <= 123] { polygon-fill: #0C2C84;}#ny_policeprecints [ precinct <= 108.5] { polygon-fill: #225EA8;}#ny_policeprecints [ precinct <= 89] { polygon-fill: #1D91C0;}#ny_policeprecints [ precinct <= 71.5] { polygon-fill: #41B6C4;}#ny_policeprecints [ precinct <= 51] { polygon-fill: #7FCDBB;}#ny_policeprecints [ precinct <= 37] { polygon-fill: #C7E9B4;}#ny_policeprecints [ precinct <= 19.5] { polygon-fill: #FFFFCC;}',
        interactivity: 'precinct'
      });

      // Events
      App.Core.Events.on('mapPopup:update', this.mapPopup.update.bind(this.mapPopup));
      this.listenTo(this.mapCartoDB, 'cartodb:addLayer', this.map.addLayer.bind(this.map));
    },

    /**
     * Initializes the layers
     * providers for initializations
     */
    _mapProviders: function() {
      this.mapCartoDB = new App.View.MapCartoDB({});

      var legendData = [
        {
          name: 'Layer 1',
          color: '#AA2ECC'
        },
        {
          name: 'Layer 2',
          color: '#CC2E2E'
        },
        {
          name: 'Layer 3',
          color: '#2E66CC'
        },
        {
          name: 'Layer 4',
          color: '#92CC2E'
        }
      ];
      // Legend
      this.legend = new App.View.Legend({
        el: '#legend',
        data: legendData
      });

      // Events
      this.listenTo(this.legend, 'legend:order', this.map.setOrder.bind(this.map));
      this.listenTo(this.legend, 'legend:active', this.map.setActive.bind(this.map));
    },

    /**
     * Update router params, this action doesn't trigger
     */
    updateParams: function() {
      var route = '';
      var q = this.params.attributes.q;
      var page = this.params.attributes.page;
      if (q && page) {
        route = ['q:' + q, 'page:' + page].join('/');
      }
      if (q && !page) {
        route = 'q:' + q;
      }
      if (!q && page) {
        route = 'page:' + page;
      }
      this.navigate(route, {
        trigger: false
      });
      this.updateCards();
    },

    /**
     * Set query param in model
     */
    setQuery: function() {
      this.params.set('q', this.searchForm.state.attributes.value);
    },

    /**
     * Set page param in model
     */
    setPage: function() {
      this.params.set('page', this.pagination.state.attributes.current);
    },

    /**
     * Set mode param in model
     */
    setMode: function(state) {
      this.cards.state.set('mode', state.attributes.mode);
    },

    /**
     * Update and render cards
     */
    updateCards: function() {
      var pageRange = this.pagination.getPageRange();
      var widgetsData = this.widgets;
      var itemsPerPage = this.pagination.state.attributes.itemsPerPage;
      if (this.params.attributes.q && this.params.hasChanged('q')) {
        widgetsData = widgetsData.search(this.params.attributes.q);
        // Reseting to page 1 when user search by query
        this.pagination.state.set('current', 1);
        this.exploreNavigation.data.reset(widgetsData);
      }
      if (itemsPerPage) {
        this.pagination.state
          .set('pages', Math.ceil(widgetsData.length / itemsPerPage));
        widgetsData = widgetsData
          .slice(pageRange.startIndex, pageRange.endIndex);
        // Reseting cards collection and render it
        this.cards.data.reset(widgetsData);
      }
    },

    /**
     * Show popup
     */
    _showPopup: function(data) {
      this.popup.state.set({
        data: data
      });
    }
  });

}).call(this, this.App);
