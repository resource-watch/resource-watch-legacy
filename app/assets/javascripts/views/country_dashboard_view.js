(function(App) {

  'use strict';

  App.View.CountryDashboard = App.Core.View.extend({

    tagName: 'div',

    className: 'dashboard',

    template: this.HandlebarsTemplates.country_dashboard,

    state: {
      /* Index of the card currently rendering */
      renderIndex: null,
      rendered: false
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = settings.data;
      this.collection = new App.Collection.CountryDashboard();

      this.listenTo(this.state, 'change:renderIndex', this.renderCard);
      // First render
      this.render();
    },

    render: function() {
      /* We don't want to render the view again if we update the renderIndex
       * attribute */
      if(this.state.get('rendered')) return this;

      this.state.set('rendered', true);

      this.$el
        .html(this.template({ country: this.data.toJSON() }));

      this.$cardsContainer = this.$el.find('.js-cards');
      this.$cardsContainer.html('Loading');

      /* We need to pass the ISO to the collection so it can return for each
       * card the associated model with the data for the selected country */
      this.collection.iso = this.data.toJSON().iso;

      this.collection.fetch().done(function() {

        this.$el.html(this.template({
          country: this.data.toJSON(),
          cards: this.collection.toJSON().map(function(card) {
            return {
              class: card.configuration.importance ?
                (card.configuration.importance === 1 ? '-red': '-blue') : ''
            };
          })
        }));

        this.$cards = this.$el.find('.js-card');

        this.$cards.each(function(i, el) {
          $(el).html('Loading');
          // var card = new App.View.ChartCard({
          //   data: this.collection.models[i].toJSON()
          // });
          // $(el).html(card.render().el);
        }.bind(this));

        this.state.set({ renderIndex: 0 });

      }.bind(this));
    },

    /* Fetch the card number renderIndex and render it */
    renderCard: function() {
      var cardNb = this.state.get('renderIndex');
      var cardModel = this.collection.models[cardNb].toJSON();
      var cardTypes = _.pluck(cardModel.configuration.y, 'type');

      if(_.contains(cardTypes, 'map')) {
        this.$cards[cardNb].innerHTML = 'MAP';
        this.renderNextCard();
      } else {
        cardModel.data.fetch()
          .done(function() {
            cardModel.chart = this.collection.models[cardNb].getChartConfiguration(this.data.toJSON());
            var card = new App.View.ChartCard({ data: cardModel });
            $(this.$cards[cardNb]).html(card.render().el);
          }.bind(this))
          .fail(function() {
            var configuration = this.collection.models[cardNb].get('configuration');
            cardModel.chart = this.collection.models[cardNb].noneParser([], configuration);
            var card = new App.View.ChartCard({ data: cardModel });
            $(this.$cards[cardNb]).html(card.render().el);
          }.bind(this))
          .always(function() { this.renderNextCard(); }.bind(this));
      }
    },

    /* Check if renderIndex doesn't point to the last card number and if don't,
     * update renderIndex to renderIndex + 1 to trigger the rendering of the
     * next card */
    renderNextCard: function() {
      var cardNb = this.state.get('renderIndex');
      if(cardNb < this.collection.models.length - 1) {
        this.state.set({
          renderIndex: cardNb + 1
        });
      }
    }

  });

}).call(this, this.App);
