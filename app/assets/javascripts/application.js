// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery2
//= require jquery_ujs
//= require underscore/underscore
//= require backbone/backbone
//= require d3
//= require vega
//= require moment
//= require three.js/three
//= require globe/OrbitControls
//= require jiminy/datalib.min
//= require jiminy/jiminy.min
//= require handlebars.runtime
//= require_self
//= require helpers
//= require_tree ./core/
//= require_tree ./templates/
//= require_tree ./routes/
//= require_tree ./models/
//= require_tree ./collections/
//= require_tree ./views/
//= require dispatcher

(function() {

  'use strict';

  this.App = {
    Core: {},
    Model: {},
    Collection: {},
    View: {},
    Router: {},
    helpers: {}
  };

}).call(this);
