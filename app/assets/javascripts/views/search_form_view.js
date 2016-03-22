(function(App) {

  'use strict';

  App.View.SearchForm = App.Core.View.extend({

    events: {
      'submit': 'cancelSubmit',
      'input input[type="search"]': 'setCurrentValue'
    },

    state: {
      value: null
    },

    initialize: function(settings) {
      this.state.set('value', settings.props.value);
      if (this.state.attributes.value) {
        this.$('input[type="search"]').val(this.state.attributes.value);
      }
    },

    cancelSubmit: function(e) {
      e.preventDefault();
    },

    setCurrentValue: _.debounce(function(e) {
      this.state.set('value', e.currentTarget.value, { validate: true });
    }, 100)

  });

}).call(this, this.App);
