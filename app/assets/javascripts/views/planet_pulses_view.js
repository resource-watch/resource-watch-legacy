(function(App) {

  'use strict';

  App.View.PlanetPulses = App.Core.View.extend({

    tagName: 'div',

    className: 'rw-categories',

    events: {
      'click .planet-pulse-nav-link a':'_onCategoryClick'
    },

    template: this.HandlebarsTemplates.planet_pulses,

    state: {
      pulseSelected: null,
      layerSelected: null
    },

    initialize: function(settings) {
      this.state.set({pulseSelected:settings.pulse},{silent:true});
      this.data = new App.Collection.PlanetPulses();
      this.data.fetch()
        .done(function(data){
          this.categories = _.groupBy(data.rows,'category');
          this.navigation = _.map(Object.keys(this.categories), function(category) {
            var isActive = this.state.attributes.pulseSelected === category ? true:false;
            return {
              category:category,
              isActive:isActive
            };
          }.bind(this));
          this.render();
        }.bind(this))
        .error(function(error){
          console.log(error);
        }.bind(this));
    },

    render: function() {
      this.$el
        .html(this.template({
          pulseSelected: this.state.attributes.pulseSelected,
          layerSelected: this.state.attributes.layerSelected,
          categories: this.navigation
        }));
      return this;
    },

    _onCategoryClick: function(e) {
      e.preventDefault();
      var cat = e.currentTarget.id;
      _.each(this.navigation, function(category) {
        category.isActive = category.category === cat;
      });
      this.state.set({pulseSelected:cat});
    }

  });

}).call(this, this.App);
