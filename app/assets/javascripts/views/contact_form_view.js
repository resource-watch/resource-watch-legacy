(function(App) {

  'use strict';

  App.View.ContactForm = App.Core.View.extend({

    tagName: 'div',

    className: 'rw-categories',

    events: {
      'click .modal-signup':'_onContactClick'
    },

    template: this.HandlebarsTemplates.contact_popup,

    _onContactClick: function(e) {
      e.preventDefault();
      console.log('clicked');
      var html = this.template();
      new App.View.Modal({ html: html });
    }

  });

}).call(this, this.App);
