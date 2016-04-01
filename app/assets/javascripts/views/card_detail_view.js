(function(App) {

  'use strict';

  App.View.CardDetail = App.Core.View.extend({

    tagName: 'div',

    className: 'card-detail',

    events: {
      'click .js-toggle-layer': '_addToMap'
    },

    props: {
      activeClass: '-active'
    },

    template: this.HandlebarsTemplates.card_detail,

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Model.Widget(settings.data);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.data.attributes));
      return this;
    },

    /**
     * Add to map if the card has a layer_name
     * @param {Object} element event
     */
    _addToMap: function(ev) {
      var el = ev.currentTarget;
      var layer = _.clone(this.data.attributes.layer);

      if (!el.classList.contains(this.props.activeClass)) {
        App.Core.Events.trigger('card:layer:add', layer);
        el.classList.add(this.props.activeClass);
      } else {
        App.Core.Events.trigger('card:layer:remove', layer);
        el.classList.remove(this.props.activeClass);
      }
    }

  });

}).call(this, this.App);
