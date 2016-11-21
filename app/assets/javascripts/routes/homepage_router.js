(function(App) {

  'use strict';

  App.Router.Homepage = App.Core.Router.extend({

    routes: {
      '(/)': 'default'
    },

    props: {
      exploreCards: 6,
      loadingClass: '_is-content-loading'
    },

    default: function() {
      new App.View.CountryDashboardSelector();

      this._initExploreDashboard();
    },

    _initExploreDashboard:function(){
      this.dashboardEl = $('#exploreDashboard');
      this.dashboardEl.addClass(this.props.loadingClass);

      this.datasets = new App.Collection.Datasets();
      this.listenTo(this.datasets,'collection:gotDataset', this._renderExploreDashboard.bind(this));
      this.listenTo(this.datasets,'collection:gotDatasetData', this._updateExploreDashboard.bind(this));
      this.datasets.getWithDatasetData();
    },

    _getDatasetData: function(){
      return this.datasets.toJSON().slice(0, this.props.exploreCards);
    },

    _renderExploreDashboard:function(){
      this.cards = new App.View.Cards({
        el: this.dashboardEl,
        data: this._getDatasetData(),
        actions: false
      });
      this.dashboardEl.removeClass(this.props.loadingClass);
    },

    _updateExploreDashboard:function(){
      this.cards.data.reset(this._getDatasetData());
    }

  });

}).call(this, this.App);
