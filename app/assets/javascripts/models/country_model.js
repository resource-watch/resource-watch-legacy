(function(App) {

  'use strict';

  App.Model.Country = App.Core.Model.extend({

    defaults: {
      iso: null,
      name: null,
      geometry: null
    },

    validate: function(attrs) {
      if (!attrs.iso) {
        return '"iso" param is required.';
      }
      if (!attrs.name) {
        return '"name" param is required.';
      }
      if (!attrs.geometry) {
        return '"geometry" param is required.';
      }
      if (attrs.iso && typeof attrs.iso !== 'string') {
        return '"iso" params should be a string.';
      }
      if (attrs.name && typeof attrs.name !== 'string') {
        return '"name" params should be a string.';
      }
      if (attrs.geometry && typeof attrs.geometry !== 'string') {
        return '"geometry" params should be a string.';
      }
    }

  });

}).call(this, this.App);
