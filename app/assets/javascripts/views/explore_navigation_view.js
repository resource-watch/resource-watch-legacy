(function(App) {

  'use strict';

  App.View.ExploreNavigation = App.Core.View.extend({

    events: {
      'click .action': 'setMode'
    },

    tagName: 'div',

    className: 'filters',

    template: this.HandlebarsTemplates.explore_navigation,

    state: {
      mode: 'grid'
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Collection.Widgets(settings.data);

      this.listenTo(this.data, 'reset', this.render);

      // First render
      this.render();
    },

    render: function() {
      var resultsNum = this.data.length;

      this.$el.html(this.template({results: resultsNum}));
      this._setSelected();
      return this;
    },

    _setSelected: function() {
      var actions = this.el.querySelectorAll('.action');
      var mode = this.state.attributes.mode;

      for (var action in actions) {
        var current = actions[action];
        var value = current.dataset.value;
        if (current && value && (value === mode)) {
          current.classList.add('selected');
          break;
        }
      }
    },

    setMode: function(ev) {
      this.state.set('mode', ev.currentTarget.dataset.value);
    }

  });

}).call(this, this.App);
