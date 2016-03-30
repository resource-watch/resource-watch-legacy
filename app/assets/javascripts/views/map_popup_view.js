(function(App) {

  'use strict';

  App.View.MapPopup = App.Core.View.extend({

    props: {
      mapPopupClass: 'map-popup'
    },

    state: {
      data: null
    },

    template: HandlebarsTemplates.map_popup,

    initialize: function(settings) {
      this._initPopup();
      this.listenTo(this.state, 'change', this._show);
    },

    _initPopup: function() {
      this.popup = L.popup({
          zoomAnimation: false,
        className: this.props.mapPopupClass
      })
      .setContent('');
    },

    _show: function() {
      this.popup.setLatLng(this.state.attributes.latlng)
        .setContent(this.template(this.state.attributes.data))
        .openOn(this.state.attributes.map);
    },

    update: function(data, latlng, map) {
      this.state.set({
        data: data,
        latlng: latlng,
        map: map
      });
    }
  });

}).call(this, this.App);
