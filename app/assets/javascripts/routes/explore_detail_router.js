(function(App) {

  'use strict';

  App.Router.ExploreDetail = App.Core.Router.extend({

    routes: {
      '(/)': 'exploreDetail',
    },

    props: {
      numSimilarDatasets: 3,
      mainContentId: 'mainContent',
      loadingClass: '_is-content-loading'
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

      this._removeLoader();
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

      // Creating card detail
      this.data = this.widgetsData.getBySlug(this.slug);
      this.cardDetail = new App.View.CardDetail({
        el: '#cardDetail',
        data: this.data
      });

      // Chart selector
      this.chartSelector = new App.View.ChartSelector({
        el: '#chartsSelector'
      });

      this.chartBars = new App.View.ChartBars({
        mainColor: '#FFFFFF',
        mainFillColor: '#89E7FF',
        secondaryColor: '#76C9DE'
      });
      this.chartPie = new App.View.ChartPie({});
      this.chartLine = new App.View.ChartLine({
        mainColor: '#FFFFFF',
        buckets: ['#FFFFFF'],
        secondaryColor: '#76C9DE'
      });

      // Events
      this.listenTo(this.cardDetail, 'card:chart:config', this._onChartConfig);
      this.listenTo(this.chartSelector, 'chart:update', this._onChartUpdate);
    },

    /**
     * Dashboard initialization
     */
    _dashboardComponents: function() {
      // Limiting collection (TO-DO, get recommended widgets)
      var widgetsData = this.widgetsData.models ?
        this.widgetsData.toJSON() : this.widgetsData;
      widgetsData = _.filter(widgetsData, _.bind(function(d) {
        return d.slug !== this.slug
      }, this));
      var data = widgetsData.slice(0, this.props.numSimilarDatasets);

      this.cards = new App.View.Cards({
        el: '#exploreDashboard',
        data: data
      });

      // Update Chart selector
      var chartData = this.data.data;
      this.chartSelector.state.set({
        data: chartData
      });

      // Events
      App.Core.Events.on('card:layer:add', this.geo.mapAddLayer.bind(this.geo));
      App.Core.Events.on('card:layer:remove', this.geo.mapRemoveLayer.bind(this.geo));
    },

    _onChartUpdate: function(type, data) {
      if (this.chart) {
        this.chart.remove();
      }

      var chartData;

      if (type === 'bar') {
        chartData = this.chartBars.getData({
          values: data
        });
      } else if (type === 'pie') {
        chartData = this.chartPie.getData({
          values: data
        });
      } else if (type === 'line') {
        chartData = this.chartLine.getData({
          values: data
        });
      }

      this.chart = new App.View.Chart({
        el: this.cardDetail.$('.chart'),
        data: chartData
      });
      this.chart.render();
    },

    _onChartConfig: function() {
      this.chartSelector.toggle();
    },

    _removeLoader: function() {
      $('#'+ this.props.mainContentId).removeClass(this.props.loadingClass);
    }
  });

}).call(this, this.App);
