(function(App) {

  'use strict';

  App.Router.Countries = App.Core.Router.extend({

    routes: {
      '(/)': 'countriesDashboard',
      'q::q(/)': 'countriesDashboard'
    },

    countriesDashboard: function(q) {
      this.countriesData = new App.Collection.Countries();

      if (q) {
        this.params.set('q', q);
      }

      // Creating search form
      this.searchForm = new App.View.SearchForm({
        el: '#searchForm',
        props: {
          value: this.params.attributes.q
        }
      });

      // Init the full screen with trigger button
      this.fullScreenView = new App.View.FullScreen({
        container: 'content',
        triggerId: 'fullscreenBtn'
      });

      this.countriesData.fetch().done(_.bind(function() {
        var countriesData;
        if (this.params.attributes.q) {
          countriesData = this.countriesData.search(this.params.attributes.q);
        }
        // When countries are fetched render all
        this.countries = new App.View.Countries({
          el: '#countries',
          data: countriesData || this.countriesData.models
        });
      }, this));

      this.listenTo(this.searchForm.state, 'change:value', this.setQuery);
      this.listenTo(this.params, 'change', this.updateParams);
    },

    /**
     * Update router params, this action doesn't trigger
     */
    updateParams: function() {
      var route = '';
      var q = this.params.attributes.q;
      if (q) {
        route = 'q:' + q;
      }
      this.navigate(route, { trigger: false });
      this.updateCountries();
    },

    /**
     * Set query param in model
     */
    setQuery: function() {
      this.params.set('q', this.searchForm.state.attributes.value);
    },

    /**
     * Update and render cards
     */
    updateCountries: function() {
      var countriesData = this.countriesData.search(this.params.attributes.q);
      this.countries.data.reset(countriesData);
    }

  });

}).call(this, this.App);
