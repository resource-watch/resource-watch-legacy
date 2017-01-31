(function(App) {

  'use strict';

  App.View.MapPreview = App.Core.View.extend({

    props: {
      loadingClassEl: '_is-content-loading'
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = settings.data;
      this.basemapId = settings.basemapId;
      this.setListeners();
    },

    setListeners: function() {
    },

    unsetListeners: function() {
    },

    /**
     *
     */
    render: function() {
      this.el.classList.remove(this.props.loadingClassEl);
      this.$el.css({
        backgroundImage: 'url('+ this.background +') , url('+ this.basemap +')'
      });

    },


    /**
     * Calculate width and height
     * @return {Object}
     */
    getSize: function() {
      return {
        width: this.el.clientWidth,
        height: this.el.clientHeight
      };
    },

    loadImage: function() {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://'+ this.data.account +'.carto.com/api/v1/map');
      xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.send(JSON.stringify(this.data.body));

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var dimensions = this.getSize();
            var options = {
              token: data.layergroupid,
              z: 1,
              lat: 0,
              lng: 0,
              width: dimensions.width,
              height: dimensions.height,
              format: 'png'
            };

            this.background = 'https://'+ this.data.account +'.carto.com/api/v1/map/static/center/'+ options.token +'/'+ options.z +'/'+ options.lat +'/'+ options.lng +'/'+ options.width +'/'+ options.height +'.'+ options.format;
            this.basemap = 'https://wri-01.carto.com/api/v1/map/static/center/'+ this.basemapId +'/'+ options.z +'/'+ options.lat +'/'+ options.lng +'/'+ options.width +'/'+ options.height +'.'+ options.format;
            // GET image
            this.render();
          } else {
            console.error('image could not be loaded');
            this.el.classList.remove(this.props.loadingClassEl);
          }
        }
      }.bind(this);
    },

    remove: function() {
      this.unsetListeners();
    }
  });

}).call(this, this.App);
