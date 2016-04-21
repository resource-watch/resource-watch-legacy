(function(App) {

  'use strict';

  App.View.FooterCarousel = App.Core.View.extend({

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

      this.$el.removeClass('-invisible');
    }

  });

}).call(this, this.App);
