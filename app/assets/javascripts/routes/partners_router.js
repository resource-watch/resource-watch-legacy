(function(App) {

  'use strict';

  App.Router.Partners = App.Core.Router.extend({

    routes: {
      '(/)': 'start',
    },

    start: function() {
      this.contactEl = document.getElementById('rw-contact');
      this._initContact();
    },

    _initContact: function() {
      this.contactForm = new App.View.ContactForm({
        el: this.contactEl
      });
    }

  });

}).call(this, this.App);
