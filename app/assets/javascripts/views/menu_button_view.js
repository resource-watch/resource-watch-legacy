(function(App) {

  'use strict';

  App.View.MenuButton = App.Core.View.extend({

    template: this.HandlebarsTemplates.menu_button,

    events: {
      'click button':'_onMenuClick',
    },

    state: {
      open: false
    },

    initialize: function(props) {
      if (props) {
        this.props = _.extend(this.props, props);
      }
      this.header = document.getElementById('header');
      this.render();
    },

    render: function() {
      this.$el
        .html(this.template({
          status: this.state.attributes.open? 'Close':'Menu'
        }));
      return this;
    },

    _onMenuClick: function() {
      this.header.classList.toggle('is-menu-open');
      this.state.set({
        open: !this.state.attributes.open
      });
    }
  });

}).call(this, this.App);
