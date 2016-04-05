(function(App) {

  'use strict';

  App.Router.Homepage = App.Core.Router.extend({

    routes: {
      '(/)': 'default'
    },

    props: {
      exploreCards: 6
    },

    default: function() {
      new App.View.CountryDashboardSelector();

      this._renderExploreDashboard();
    },

    _renderExploreDashboard: function() {
      var exploreWidgets = new App.Collection.Widgets();
      exploreWidgets.fixtures();

      exploreWidgets = exploreWidgets.toJSON();
      var data = exploreWidgets.slice(0,
        this.props.exploreCards);

      this.cards = new App.View.Cards({
        el: '#exploreDashboard',
        data: data,
        actions: false
      });
    }

  });

}).call(this, this.App);
