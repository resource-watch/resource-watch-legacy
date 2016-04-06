(function(App) {

  'use strict';

  App.View.FullScreen = App.Core.View.extend({

    state: {
      isFullscreen: false
    },

    initialize: function(settings) {
      this.container = document.getElementById(settings.container);
      this.fullscreenCount = 0;
      this.setListeners();
    },

    render: function() {
      return this;
    },

    setListeners: function() {
      App.Core.Events.on('fullscreen:clicked', this.toggleFullscreen.bind(this));
      var fullscreenEvents = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange';
      $(document).on(fullscreenEvents, _.bind(this.fullscreenWatcher, this));
    },

    fullscreenWatcher: function() {
      var isEnteringFullscreen = this.fullscreenCount % 2 === 0;
      this.fullscreenCount++;
      if(isEnteringFullscreen && !this.state.attributes.isFullscreen) {
        this.enableFullscreen();
      } else if(!isEnteringFullscreen && this.state.attributes.isFullscreen) {
        this.disableFullscreen();
      }
    },

    enableFullscreen: function() {
      this.setFullscreen(true);
      this.container.classList.add('is-fullscreen');

      App.Core.Events.trigger('fullscreen:change', true);
    },

    disableFullscreen: function() {
      this.setFullscreen(false);
      this.container.classList.remove('is-fullscreen');

      App.Core.Events.trigger('fullscreen:change', false);
    },


    toggleFullscreen: function() {
      if (!this.container.fullscreenElement && !this.container.mozFullScreenElement && !this.container.webkitFullscreenElement && !this.container.msFullscreenElement && !document.webkitIsFullScreen) {

        if (this.container.requestFullscreen) {
          this.container.requestFullscreen();
        } else if (this.container.msRequestFullscreen) {
          this.container.msRequestFullscreen();
        } else if (this.container.mozRequestFullScreen) {
          this.container.mozRequestFullScreen();
        } else if (this.container.webkitRequestFullscreen) {
          this.container.webkitRequestFullscreen();
        }
        this.enableFullscreen();

      } else {

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        this.disableFullscreen();

      }
    },

    setFullscreen: function(bool) {
      this.state.set({
        isFullscreen: bool
      });
    }

  });

}).call(this, this.App);
