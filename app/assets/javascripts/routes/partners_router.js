(function(App) {

  'use strict';

  App.Router.Partners = App.Core.Router.extend({

    routes: {
      '(/)': 'start',
    },

    start: function() {
      this.contactEl = document.getElementById('rw-contact');
      this._initContact();
      this._disableLinks();
    },

    _initContact: function() {
      this.contactForm = new App.View.ContactForm({
        el: this.contactEl
      });
    },

    _disableLinks: function() {
      var links = document.querySelectorAll('.partner-card.is-disabled a'),
        disableClick = function(e) {
          e.preventDefault();
        };

      if (!links) {
        return;
      }

      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', disableClick);
      }
    }

  });

}).call(this, this.App);
