(function(App) {

  'use strict';

  App.View.Legend = App.Core.View.extend({

    tagName: 'div',

    className: 'legend',

    template: this.HandlebarsTemplates.legend,

    events: {
    },

    state: {
    },

    props: {

    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.state.set({
        data: settings.data
      });

      this.render();
    },

    render: function() {
      this.$el.html(this.template({ 
        data: this.state.attributes.data 
      }));
    }
  });

}).call(this, this.App);
