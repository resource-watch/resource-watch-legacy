(function(App) {

  'use strict';

  App.View.CardDetail = App.Core.View.extend({

    tagName: 'div',

    className: 'card-detail',

    template: this.HandlebarsTemplates.card_detail,

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Model.Widget(settings.data);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.data.attributes));
      this.renderChart();
      return this;
    },

    renderChart: function() {
      this.chart = new App.View.Chart({
        el: this.$('.chart'),
        data: this.data.attributes.chart || {"width":300,"height":180,"padding":{"top":10,"left":30,"bottom":30,"right":22},"data":[{"name":"table","values":[{"x":1990,"y":28,"c":"cat1","unit":"k alerts"},{"x":1991,"y":43,"c":"cat1","unit":"k alerts"},{"x":1992,"y":81,"c":"cat1","unit":"k alerts"},{"x":1993,"y":19,"c":"cat1","unit":"k alerts"},{"x":1994,"y":52,"c":"cat1","unit":"k alerts"},{"x":1995,"y":24,"c":"cat1","unit":"k alerts"},{"x":1996,"y":87,"c":"cat1","unit":"k alerts"},{"x":1997,"y":17,"c":"cat1","unit":"k alerts"},{"x":1998,"y":68,"c":"cat1","unit":"k alerts"},{"x":2000,"y":49,"c":"cat1","unit":"k alerts"}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":6,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"line","from":{"data":"table"},"properties":{"enter":{"interpolate":{"value":"cardinal"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"value":"#C4347D"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-5},"y":{"value":5},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]}
      });
      this.chart.render();
    }

  });

}).call(this, this.App);
