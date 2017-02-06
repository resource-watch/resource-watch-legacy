(function(App) {

  'use strict';

  App.View.Cards = App.Core.View.extend({

    tagName: 'div',

    className: 'cards',

    template: this.HandlebarsTemplates.cards,

    state: {
      layers: [],
      mode: 'grid',
      actions: true
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Collection.Widgets(settings.data);
      if (typeof settings.actions !== 'undefined') {
        this.state.set({
          actions: settings.actions
        }, { silent: true });
      }

      // Setting events
      this.listenTo(this.data, 'reset', this.render);
      // First render
      this.render();
    },

    render: function() {
      var _this = this;
      var grid = this.state.attributes.mode === 'grid';
      var layers = this.state.attributes.layers || [];

      this.$el
        .html(this.template({
          cards: this.data.toJSON(),
          grid: grid,
          gridClasses: this.props.gridClasses
        }))
        .find('.js-card').each(function(i, el) {
          var m = _this.data.models[i];
          var activeLayer = false;
          if (m.attributes.layer.length) {
            activeLayer = (layers.indexOf(m.attributes.layer[0].attributes.id) !== -1);
          }

          var card = new App.View.Card({
            data: m.attributes,
            mode: _this.state.attributes.mode,
            active: activeLayer,
            actions: _this.state.attributes.actions
          });

          // Render card
          $(el).html(card.render().el);

          if (m.attributes.data || (m.attributes.widget && m.attributes.widget.length) || (m.attributes.widgetConfig && m.attributes.widgetConfig.data)) {
            // console.info('*******************');
            // console.info(m.attributes.widget[0].attributes.name);
            // console.info('http://api.resourcewatch.org/dataset/' + m.attributes.widget[0].attributes.dataset + '/widget/' + m.attributes.widget[0].attributes.id);
            card.drawChart();
          }

          if ((m.attributes.widget && !m.attributes.widget.length) && (m.attributes.layer && m.attributes.layer.length)) {
            // console.info('*******************');
            // console.info(m.attributes.layer[0].attributes.name);
            // console.info('http://api.resourcewatch.org/dataset/' + m.attributes.layer[0].attributes.dataset + '/layer/' + m.attributes.layer[0].attributes.id);
            card.drawMapPreview();
          }

        });

      return this;
    }

  });

}).call(this, this.App);
