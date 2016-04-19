//= require jquery2
//= require jquery_ujs
//= require underscore/underscore
//= require backbone/backbone
//= require slick-carousel/slick.js
//= require_self
//= require_tree ./core/
//= require ./views/footer_carousel_view
//= require ./views/header_lang_menu

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

  // Initializing common modules
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementsByClassName('js-footer-carousel').length > 0) {
      new App.View.FooterCarousel({ el: '.js-footer-carousel' });
    }
    if (document.getElementsByClassName('js-header-lang-menu').length > 0) {
      new App.View.HeaderLangMenu({ el: '.js-header-lang-menu' });
    }
  });

}).call(this);
