(function(App) {

  'use strict';

  App.View.FullScreen = App.Core.View.extend({

    state: {
      isFullscreen: false
    },

    initialize: function(settings) {
      this.container = document.getElementById(settings.container);
      // we can pass the trigger element id if the content is static
      // if not we need to use the events like is done in the planet pulse example
      this.trigger = settings.triggerId ? document.getElementById(settings.triggerId) : false;
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
      if(this.trigger) {
        this.trigger.addEventListener('click', function(e){
          e.preventDefault();
          this.toggleFullscreen();
          this.toggleTriggerText();
        }.bind(this));
      }
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


    isFullScreen: function() {
      return !this.container.fullscreenElement && !this.container.mozFullScreenElement && !this.container.webkitFullscreenElement && !this.container.msFullscreenElement && !document.webkitIsFullScreen;
    },

    toggleTriggerText: function() {
      if (this.state.attributes.isFullscreen) {
        this.trigger.innerHTML = 'Exit full screen';
      } else {
        this.trigger.innerHTML = 'Full screen';
      }
    },

    toggleFullscreen: function() {
      if (this.isFullScreen()) {

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
