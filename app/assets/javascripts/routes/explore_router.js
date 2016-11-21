(function(App) {

  'use strict';

  App.Router.Explore = App.Core.Router.extend({

    routes: {
      '(/)': 'exploreDashboard',
      '(page::page)(/)': 'exploreDashboard',
      '(q::q)/(page::page)(/)': 'exploreDashboard'
    },

    props: {
      itemsPerPage: 6,
      elMapToggle: '#mapToggle',
      elGoToMapToggle: '.js-go-to-map',
      elGoToExploreToggle: '.js-go-to-explore',
      elExploreContent: '.rw-explore-content',
      mapToggleClass: '_map-mode'
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

      // Settings events
      this.listenTo(this.params, 'change', this.updateParams);
      this.setListeners();
    },

    /**
     * Gets main data for the components
     */
    _getData: function() {
      this.datasets = new App.Collection.Datasets();
      this.listenTo(this.datasets,'collection:gotDataset', this.onCollectionGotDataset.bind(this));
      this.listenTo(this.datasets,'collection:gotDatasetData', this.onCollectionGotDatasetData.bind(this));
      this.datasets.getWithDatasetData();
    },

    onCollectionGotDataset: function() {
      this.datasetsData = this.datasets.toJSON();

      // Shared components
      this._sharedComponents();

      // Creating dashboard
      this._dashboardComponents();
    },

    onCollectionGotDatasetData: function() {
      this.datasetsData = this.datasets.toJSON();
      this.updateCards();
    },

    setListeners: function() {
      $(this.props.elMapToggle).on('click', this._onMapToggle.bind(this));
      $(this.props.elGoToExploreToggle).on('click', this._onMapToggle.bind(this));
      $(this.props.elGoToMapToggle).on('click', this._onMapToggle.bind(this));
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
        data: this.datasets.toJSON()
      });

      // Pagination
      this.pagination = new App.View.Pagination({
        el: '#pagination',
        props: {
          itemsPerPage: this.props.itemsPerPage,
          current: this.params.attributes.page,
          pages: Math.ceil(this.datasetsData.length / this.props.itemsPerPage)
        }
      });

      // Geo map
      this.geo = new App.View.Geo({});

      // Tooltip
      this.tooltip = new App.View.Tooltip({
        el: document.body,
        text: 'Coming soon'
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
      var datasetData = this.datasetsData.models ?
        this.datasetsData.toJSON() : this.datasetsData;
      var data = datasetData.slice(pageRange.startIndex,
        pageRange.endIndex);

      this.cards = new App.View.Cards({
        el: '#exploreDashboard',
        data: data,
        props: {
          gridClasses: 'col -xs-12 -sm-6 -md-6 -lg-4'
        }
      });

      // Events
      App.Core.Events.on('card:layer:add', this.geo.mapAddLayer.bind(this.geo));
      App.Core.Events.on('card:layer:remove', this.geo.mapRemoveLayer.bind(this.geo));
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
      var datasetData = this.datasets;
      var itemsPerPage = this.pagination.state.attributes.itemsPerPage;
      if (this.params.attributes.q && this.params.hasChanged('q')) {
        datasetData = datasetData.search(this.params.attributes.q);
        // Reseting to page 1 when user search by query
        this.pagination.state.set('current', 1);
        this.exploreNavigation.data.reset(datasetData);
      }
      if (itemsPerPage) {
        this.pagination.state
          .set('pages', Math.ceil(datasetData.length / itemsPerPage));
        datasetData = datasetData
          .slice(pageRange.startIndex, pageRange.endIndex);
        // Reseting cards collection and render it
        this.cards.data.reset(datasetData);
      }
    },

    _onMapToggle: function() {
      var $exploreContent = document.querySelector(this.props.elExploreContent);
      $exploreContent.classList.toggle(this.props.mapToggleClass);

      this.geo.refresh();
    }
  });

}).call(this, this.App);
