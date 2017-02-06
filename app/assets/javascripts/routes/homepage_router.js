(function(App) {

  'use strict';

  App.Router.Homepage = App.Core.Router.extend({

    routes: {
      '(/)': 'default'
    },

    props: {
      exploreCards: 3,
      loadingClass: '_is-content-loading'
    },

    default: function() {
      new App.View.CountryDashboardSelector();

      this._initExploreDashboard();
    },

    _initExploreDashboard:function(){
      this.latestEl = $('#latestDashboard');
      this.latestEl.addClass(this.props.loadingClass);

      this.popularEl = $('#popularDashboard');
      this.popularEl.addClass(this.props.loadingClass);

      this.datasets = new App.Collection.Datasets();
      this.listenTo(this.datasets,'collection:gotDataset', this._renderExploreDashboard.bind(this));
      this.listenTo(this.datasets,'collection:gotDatasetData', this._updateExploreDashboard.bind(this));
      this.datasets.getWithDatasetData();
    },

    _getDatasetData: function(start){
      return this.datasets.toJSON().slice(start, this.props.exploreCards + start);
    },

    _renderExploreDashboard:function(){
      this.cards = new App.View.Cards({
        el: this.latestEl,
        data: this._getDatasetData(1),
        actions: false
      });
      this.latestEl.removeClass(this.props.loadingClass);

      this.popular = new App.View.Cards({
        el: this.popularEl,
        data: this._getDatasetData(4),
        actions: false
      });
      this.popularEl.removeClass(this.props.loadingClass);
    },

    _updateExploreDashboard:function(){
      this.cards.data.reset(this._getDatasetData());
    }

  });

}).call(this, this.App);
