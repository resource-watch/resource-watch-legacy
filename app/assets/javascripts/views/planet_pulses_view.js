(function(App) {

  'use strict';

  App.View.PlanetPulses = App.Core.View.extend({

    tagName: 'div',

    className: 'rw-categories',

    events: {
      'click .planet-pulse-nav-link a.category-selector':'_onCategoryClick',
      'click .planet-pulse-content a.layer-selector':'_onLayerClick',
      'click .planet-pulse-toolbar a':'_onBackClick',
      'click .modal-link':'_onModalClick'
    },

    template: this.HandlebarsTemplates.planet_pulses,

    state: {
      categorySelected: null,
      layerSelected: null
    },

    initialize: function(settings) {
      this.state.set({
        categorySelected:settings.category,
        layerSelected:settings.layer
      },{silent:true});
      this.data = new App.Collection.PlanetPulses();
      this.data.fetch()
        .done(function(data){
          this.data = data.rows;
          this.categories = this._parsePulses(this.data);
          this.render();
          this.trigger('pulses:loaded', data.rows);
        }.bind(this))
        .error(function(error){
          console.warn('Error getting pulses: '+ error);
        }.bind(this));
    },

    render: function() {
      this.$el
        .html(this.template({
          categorySelected: this.state.attributes.categorySelected,
          categories: this.categories
        }));
      return this;
    },

    _onCategoryClick: function(e) {
      e.preventDefault();
      this.setCategorySelected(e.currentTarget.id);
      this.setLayerSelected(null);
    },

    _onLayerClick: function(e) {
      e.preventDefault();
      this.setLayerSelected(e.currentTarget.id);
    },

    _onBackClick: function(e) {
      e.preventDefault();
      this.setLayerSelected(null);
      this.setCategorySelected(null);
    },

    _onModalClick: function(e) {
      var slug = e.currentTarget.parentNode.id;
      var layer = _.findWhere(this.data, {'slug':slug});
      var html = '<h2 class="title">' + layer.title_dataset +
                    '<span>' + layer.source_1 + '</span>'+
                  '</h2>'+
                    '<p class="content">' + layer.source_description + '</p>'+
                    '<p class="footnote">' + layer.source_citation + '</p>';
      new App.View.Modal({ html: html });
    },

    _parsePulses: function(data){
      var categories = {};
      var pulses = _.groupBy(data,'category');
      _.each(pulses, function(pulse, key) {
        categories[key] = {};
        categories[key].category = key;
        categories[key].description = pulse[0].description;
        categories[key].isActive = this.state.attributes.categorySelected === key;
        categories[key].layers = [];
        _.each(pulse, function(layer) {
          layer.isActive = this.state.attributes.layerSelected === layer.slug;
          categories[key].layers.push(layer);
        }.bind(this));
      }.bind(this));
      return categories;
    },

    setCategorySelected: function(cat){
      _.each(this.categories, function(category) {
        category.isActive = category.category === cat;
      });
      this.state.set({categorySelected:cat});
    },

    setLayerSelected: function(layer){
      _.each(this.categories, function(category) {
        _.each(category.layers, function(pulse) {
          pulse.isActive = pulse.slug === layer;
        }.bind(this));
      }.bind(this));
      this.state.set({layerSelected:layer});
    }

  });

}).call(this, this.App);
