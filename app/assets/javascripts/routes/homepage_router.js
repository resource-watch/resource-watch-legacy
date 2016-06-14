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

      this.widgets = new App.Collection.Widgets();
      this.listenTo(this.widgets,'collection:gotWidget', this._renderExploreDashboard.bind(this));
      this.listenTo(this.widgets,'collection:gotWidgetData', this._updateExploreDashboard.bind(this));
      this.widgets.getWithWidgetData();
    },

    _getWidgetData: function(){
      return this.widgets.toJSON().slice(0, this.props.exploreCards);
    },

    _renderExploreDashboard:function(){
      this.cards = new App.View.Cards({
        el: this.dashboardEl,
        data: this._getWidgetData(),
        actions: false
      });
      this.dashboardEl.removeClass(this.props.loadingClass);
    },

    _updateExploreDashboard:function(){
      this.cards.data.reset(this._getWidgetData());
    }

  });

}).call(this, this.App);
