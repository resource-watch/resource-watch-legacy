(function(App) {

  'use strict';

  App.View.PlanetPulses = App.Core.View.extend({

    tagName: 'div',

    className: 'rw-categories',

    events: {
      'click .planet-pulse-nav-link a':'_onCategoryClick',
      'click .planet-pulse-toolbar a':'_onBackClick'
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
          this.categories = this._parsePulses(data.rows);
          console.log(this.categories);
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
          categories: this.categories
        }));
      this.initFullScreen();
      return this;
    },

    _onCategoryClick: function(e) {
      e.preventDefault();
      this.setCategorySelected(e.currentTarget.id);
    },

    _onBackClick: function(e) {
      e.preventDefault();
      this.setCategorySelected(null);
    },

    _parsePulses: function(data){
      var categories = {};
      var pulses = _.groupBy(data,'category');
      _.each(pulses, function(pulse, key) {
        categories[key] = {};
        categories[key].category = key;
        categories[key].description = this.getCatDescription(key);
        categories[key].isActive = this.state.attributes.pulseSelected === key;
        categories[key].layers = [];
        _.each(pulse, function(pulse) {
          categories[key].layers.push(pulse);
        }.bind(this));
      }.bind(this));
      return categories;
    },

    getCatDescription: function(key){
      return key + ' category description';
    },

    setCategorySelected: function(cat){
      _.each(this.categories, function(category, key) {
        category.isActive = key === cat;
      });
      this.state.set({pulseSelected:cat});
    },

    initFullScreen: function(){
      this.fullScreen = new App.View.FullScreen({
        fullscreenBtn: 'fullscreenBtn',
        container: 'content'
      });
    }

  });

}).call(this, this.App);
