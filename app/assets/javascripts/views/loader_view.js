(function(App) {

  'use strict';

  App.View.Loader = App.Core.View.extend({

    props: {
      loaderClass: 'loader'
    },

    state: {
      loading: false
    },

    initialize: function(settings) {
      if (settings.loading){
        this.state.set({
          loading : settings.loading
        });
        this.render();
      }
    },

    render: function() {
      if (this.state.attributes.loading) {
        this._hide();
        this._show();
      } else {
        this._hide();
      }
    },

    _show: function() {
      var loader = document.createElement('div');
      loader.classList.add(this.props.loaderClass);

      this.$el.prepend(loader);
    },

    _hide: function() {
      var loader = this.el.querySelector('.' + this.props.loaderClass);
      if (loader) {
        loader.parentNode.removeChild(loader);
      }
    }
  });

}).call(this, this.App);
