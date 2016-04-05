(function(App) {

  'use strict';

  App.View.FooterCarousel = App.Core.View.extend({

    el: '.js-footer-carousel',

    initialize: function() {
      if (!this.$el.length) {
        return;
      }

      this.$el.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slide: 'li'
      });
    }

  });

}).call(this, this.App);
