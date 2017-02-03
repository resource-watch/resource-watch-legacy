(function(App) {

  'use strict';

  App.View.Dropdown = App.Core.View.extend({

    events: {
      'click .js-dropdown': '_handleClick'
    },

    initialize: function(settings) {
    },

    _handleClick: function(e) {
      if (this.element != e.currentTarget) {
        this.element && this.element.getElementsByClassName('dropdown')[0].classList.toggle('-active');
        this.element = e.currentTarget;
        this.element.getElementsByClassName('dropdown')[0].classList.toggle('-active');
      } else {
        this.element && this.element.getElementsByClassName('dropdown')[0].classList.toggle('-active');
        this.element = null;
      }
    }

  });

}).call(this, this.App);
