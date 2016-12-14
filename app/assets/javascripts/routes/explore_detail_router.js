(function(App) {

  'use strict';

  App.Router.ExploreDetail = App.Core.Router.extend({

    routes: {
      '(/)': 'exploreDetail',
    },

    props: {
      numSimilarDatasets: 3,
      mainContentId: 'mainContent',
      loadingClass: '_is-content-loading',
      elMapToggle: '#mapToggle',
      elExploreContent: '.rw-explore-content',
      mapToggleClass: '_map-mode',
      maxData: 40
    },

    /**
     * Router initializations
     * It stores the current url data
     * @param {String} url param
     */
    initialize: function(id) {
      this.id = id;
    },

    exploreDetail: function() {
      // Get data
      this._getData()
        .done(function() {
          this.datasetData = this.dataset.toJSON();
          this.startComponents();
          this.setListeners();
        }.bind(this))
        .fail(function(err){
          console.warn(err);
        }.bind(this))
        .always(function() {
          this._removeLoader();
        }.bind(this));
    },

    startComponents: function() {
      // Shared components
      this._sharedComponents();

      // Creating dashboard
      this._dashboardComponents();
    },

    setListeners: function() {
      $(this.props.elMapToggle).on('click', this._onMapToggle.bind(this));
    },

    _getData: function() {
      var defer = $.Deferred();
      this.dataset = new App.Model.Dataset({ id: this.id });

      this.dataset.fetch({data: 'includes=widget,layer'}).done(function() {
        this.dataset.getDatasetData().done(function() {
          defer.resolve();
        });
      }.bind(this));

      return defer.promise();
    },

    /**
     * Intializes shared components
     * and sets their events
     */
    _sharedComponents: function() {
      // Geo map
      this.geo = new App.View.Geo({});

      // Creating card detail
      this.cardDetail = new App.View.CardDetail({
        el: '#cardDetail',
        data: this.datasetData
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

      this.chartGroupBars = new App.View.ChartGroupBars({
        mainColor: '#FFFFFF',
        mainFillColor: '#89E7FF',
        secondaryColor: '#76C9DE',
        buckets: ['#25A2C3', '#1A8CAA', '#0F6F89', '#075469', '#C32D7B']
      });

      this.chartPie = new App.View.ChartPie({
        mainColor: '#FFFFFF',
        buckets: ['#25A2C3', '#1A8CAA', '#0F6F89', '#075469', '#C32D7B'],
      });

      this.chartLine = new App.View.ChartLine({
        mainColor: '#FFFFFF',
        buckets: ['#FFFFFF'],
        secondaryColor: '#76C9DE'
      });

      // Tooltip
      this.tooltip = new App.View.Tooltip({
        el: document.body,
        text: 'Coming soon'
      });

      // Events
      this.listenTo(this.cardDetail, 'card:chart:config', this._onChartConfig);
      this.listenTo(this.chartSelector, 'chart:update', this._onChartUpdate);
    },

    /**
     * Dashboard initialization
     */
    _dashboardComponents: function() {
      // Limiting collection (TO-DO, get recommended datasets)
      this.similarDatasets = new App.Collection.Datasets();

      // Update Chart selector
      if (this.datasetData.data && this.datasetData.data.length < this.props.maxData) {
        this.chartSelector.state.set({
          data: this.datasetData.data,
          data_attributes: this.datasetData.data_attributes
        });
      }

      // Events
      App.Core.Events.on('card:layer:add', this.geo.mapAddLayer.bind(this.geo));
      App.Core.Events.on('card:layer:remove', this.geo.mapRemoveLayer.bind(this.geo));

      this.listenTo(this.similarDatasets,'collection:gotDataset', this._onCollectionGotDataset.bind(this));
      this.listenTo(this.similarDatasets,'collection:gotDatasetData', this._onCollectionGotDatasetData.bind(this));
      this.similarDatasets.getWithDatasetData();
    },

    _onCollectionGotDataset: function() {
      this.similarDatasetsData = this.similarDatasets.toJSON();
      this.cards = new App.View.Cards({
        el: '#exploreDashboard',
        data: this.similarDatasetsData,
        props: {
          gridClasses: 'col -xs-12 -sm-12 -md-6 -lg-4'
        }
      });
    },

    _onCollectionGotDatasetData: function() {
      this.similarDatasetsData = this.similarDatasets.toJSON();
      this.cards.data.reset(this.similarDatasetsData);
    },

    _onChartUpdate: function(type, data) {
      if (this.chart) {
        this.chart.remove();
      }

      var chartData;

      switch(type) {
        case 'bar':
          chartData = this.chartBars.getData({
            values: data
          });
          break;
        case 'groupBar':
          chartData = this.chartGroupBars.getData({
            values: data
          });
          break;
        case 'pie':
          chartData = this.chartPie.getData({
            values: data
          });
          break;
        case 'line':
          chartData = this.chartLine.getData({
            values: data
          });
          break;
        default:
          chartData = [];
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
    },

    _onMapToggle: function() {
      var $exploreContent = document.querySelector(this.props.elExploreContent);
      $exploreContent.classList.toggle(this.props.mapToggleClass);

      this.geo.refresh();
    }
  });

}).call(this, this.App);
