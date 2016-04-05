(function(App) {

  'use strict';

  App.View.HeaderLangMenu = App.Core.View.extend({

    events: {
      'click': 'onToggleMenu'
    },

    initialize: function() {
      if (!this.$el.length) {
        return;
      }

      this.$nav = this.$el.find('.js-nav');

      this.setListeners();
    },

    setListeners: function() {
      $(document).on('click', function() {
        this.$nav.addClass('-hidden');
      }.bind(this));
    },

    onToggleMenu: function(e) {
      if(!e.target.classList.contains('js-header-lang-menu')) return;
      e.preventDefault();
      e.stopPropagation();
      this.$nav.toggleClass('-hidden');
    }

  });

}).call(this, this.App);
