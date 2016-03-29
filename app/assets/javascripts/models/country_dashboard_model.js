(function(App) {

  'use strict';

  App.Model.CountryDashboard = App.Core.Model.extend({

    getChartConfiguration: function() {
      /* Key-value object where the key represents a type of chart and the
       * value, the parser for that type of chart */
      var parsers = {
        pie: this.pieParser,
        bars: this.barsParser,
        textual: this.textualParser,
        lines: this.linesParser,
        barslines: this.barslinesParser,
        'compare-bars': this.comparebarsParser
      };

      var data = this.get('data').toJSON();
      var configuration = this.get('configuration');
      var types = _.pluck(configuration.y, 'type');

      /* The data could be nested inside a tree, so we retrieve it */
      if(configuration.path) {
        var path = configuration.path.split('.');
        data = data[0]; /* We assume that we fetch the data from an api */
        for(var i = 0, j = path.length; i < j; i++) { data = data[path[i]]; }
      }

      if(!data.length) {
        console.warn('no data for a chart');
        return;
      }

      /* Removes a dirty value from a graph */
      if(configuration.info.title==='Deforestation - Alerts') { data.shift(); }


      if(types.length === 1) {
        if(parsers[types[0]]) {
          if(types[0] === 'textual') {
            console.warn('Ignored textual');
            return;
          }

          return parsers[types[0]].call(this, data, configuration);
        } else {
          console.warn('Unknown type of chart', configuration);
        }
      } else {
        var uniqueTypes = _.uniq(_.pluck(configuration.y, 'type'));
        if(uniqueTypes.length === 1) {
          if(parsers[types[0]]) {
            return parsers[types[0]].call(this, data, configuration);
          } else {
            console.warn('Unknown type of chart', configuration);
          }
        } else if(uniqueTypes.length === 2 && _.contains(uniqueTypes, 'bars') &&
          _.contains(uniqueTypes, 'lines')) {
          return parsers.barslines.call(this, data, configuration);
        } else {
          console.warn('Unknown type of chart', configuration);
        }
      }

      return null;
    },

    /* Return the number of time the number can be divided by 1000 */
    getFactor: function(number) {
      var tmp = number;
      var factor = 0;
      while(tmp >= 1) {
        tmp /= 1000;
        factor++;
      }
      return --factor;
    },

    /* Parser for the pie chart */
    pieParser: function(data, configuration) {
      var xNamespace = configuration.x.name;
      var yNamespace = configuration.y[0].name;
      var categories = _.map(_.pluck(data, xNamespace), function(cat) {
        return _.capitalize(cat);
      });
      var values = _.pluck(data, yNamespace);

      /* We need to compute the percentages from the values. Because rounding
       * each percentage makes an approximation of about 1%, the last value
       * is computed from the difference of 100% minus the additive sum. */
      var sum = _.sum(values);
      var additiveSum = 0;
      for(var i = 0, j = values.length; i < j; i++) {
        if(i < j - 1) {
          values[i] = Math.round(values[i] / sum * 100);
          additiveSum += values[i];
        } else {
          values[i] = 100 - additiveSum;
        }
      }

      /* We then want to order the categories by their weight */
      var list = [];
      for(i = 0, j = categories.length; i < j; i++) {
        list.push({
          category: categories[i],
          value: values[i]
        });
      }
      list.sort(function(a, b) {
        if(a.value < b.value) return 1;
        else if(a.value > b.value) return -1;
        else return 0;
      });
      categories = _.pluck(list, 'category');
      values = _.pluck(list, 'value');

      return {"name":"arc","padding":{"top":25,"left":25,"bottom":20,"right":25},"data":[{"name":"table","values":values,"transform":[{"type":"pie","field":"data"}]},{"name":"categories","values":categories}],"scales":[{"name":"r","type":"sqrt","domain":{"data":"table","field":"data"},"range":[0,100]},{"name":"color","type":"ordinal","domain":{"data":"table","field":"data"},"range":["#72B800","#F1B900","#B72A7E","#D4E329","#5BB1D2"]}],"marks":[{"type":"arc","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"startAngle":{"field":"layout_start"},"endAngle":{"field":"layout_end"},"innerRadius":{"field":{"group":"height"},"mult":0.38},"outerRadius":{"field":{"group":"height"},"mult":0.47},"fill":{"scale":"color","field":"data"}}}},{"type":"text","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.51},"radius":{"field":{"group":"height"},"mult":0.55,"offset":0},"theta":{"field":"layout_mid"},"fontSize":{"value":10},"fill":{"value":"#9BA2AA"},"align":{"value":"center"},"baseline":{"value":"middle"},"text":{"template":"{{datum.data}}%"}}}}],"legends":[{"values":categories,"fill":"color","properties":{"title":{"fontSize":{"value":14}},"labels":{"fontSize":{"value":10},"fill":{"value":"#9BA2AA"},"text":{"template":"{{datum.data|truncate:15}}"}},"symbols":{"stroke":{"value":"transparent"}},"legend":{"x":{"field":{"group":"width"},"mult":0.5,"offset":-42},"y":{"field":{"group":"height"},"mult":0.5,"offset":-38}}}}]};
    },

    /* Parser for the bars chart */
    barsParser: function(data, configuration) {
      var values = [];
      for(var i = 0, j = data.length; i < j; i++) {
        values.push({
          x: data[i][configuration.x.name],
          y: data[i][configuration.y[0].name]
        });
      }

      /* Extent of the x axis */
      var extent = [
        _.min(_.pluck(data, configuration.x.name)),
        _.max(_.pluck(data, configuration.x.name))
      ];

      /* Factor by which the y axis is 1000^(factor) divided */
      var factor = this.getFactor(_.median(_.pluck(values, 'y')));

      /* We add the factor to the unit */
      var unit = configuration.y[0].units;
      if(factor >= 3)       { unit = 'G' + unit; }
      else if(factor === 2) { unit = 'M' + unit; }
      else if(factor === 1) { unit = 'k' + unit; }

      values = values.map(function(v) {
        var o = {};
        o.x = v.x;
        o.y = factor > 0 ? v.y / Math.pow(1000, factor) : v.y;
        o.unit = unit;
        return o;
      });

      return {"padding":{"top":25,"left":40,"bottom":30,"right":20},"data":[{"name":"table","values":values}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"domain":extent,"nice":true},{"name":"y","type":"linear","range":"height","domain":{"data":"table","field":"y"},"nice":true}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"width":{"field":{"group":"width"},"mult":0.03},"y":{"scale":"y","field":"y"},"y2":{"scale":"y","value":0}},"update":{"fill":{"value":"#5BB1D2"}},"hover":{"fill":{"value":"#c32d7b"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-40},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}}]};
    },

    /* Parser for the textual chart */
    textualParser: function(data, configuration) {
      var unit = configuration.y[0].units;
      var firstValue = _.formatNumber(Math.round(data[0][configuration.y[0].name]));
      var secondValue = _.formatNumber(Math.round(data[0][configuration.y[1].name]));
      var secondValueLabel = configuration.y[1].label;
      return {"width":300,"height":180,"padding":{"top":10,"left":10,"bottom":30,"right":15},"data":[{"name":"table","values":[{"x":firstValue,"y":null,"c":"cat1","unit":unit},{"x":secondValueLabel,"y":null,"c":"cat2","unit":""},{"x":secondValue,"y":null,"c":"cat3","unit":unit}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}}],"marks":[{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c=='cat1'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"text":{"template":"{{datum.x}}"},"fontSize":{"value":55},"fontWeight":{"value":600},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c=='cat1'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.64},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":12},"fontWeight":{"value":500},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c=='cat2'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.9},"text":{"template":"{{datum.x}}"},"fontSize":{"value":12},"fontWeight":{"value":600},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c=='cat3'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":1},"text":{"template":"{{datum.x}} {{datum.unit}}"},"fontSize":{"value":15},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]};
    },

    /* Parser for the lines chart */
    linesParser: function(data, configuration) {
      var values = [];
      for(var i = 0, j = data.length; i < j; i++) {
        for(var k = 0, l = configuration.y.length; k < l; k++) {
          values.push({
            x: data[i][configuration.x.name],
            y: data[i][configuration.y[k].name],
            c: _.capitalize(configuration.y[k].label)
          });
        }
      }

      /* Extent of the x axis */
      var extent = [
        _.min(_.pluck(data, configuration.x.name)),
        _.max(_.pluck(data, configuration.x.name))
      ];

      /* Factor by which the y axis is 1000^(factor) divided */
      var factor = this.getFactor(_.median(_.pluck(values, 'y')));

      /* We add the factor to the unit */
      var unit = configuration.y[0].units;
      if(factor >= 3)       { unit = 'G' + unit; }
      else if(factor === 2) { unit = 'M' + unit; }
      else if(factor === 1) { unit = 'k' + unit; }

      values = values.map(function(v) {
        var o = {};
        o.x = v.x;
        o.y = factor > 0 ? v.y / Math.pow(1000, factor) : v.y;
        o.c = v.c;
        o.unit = unit;
        return o;
      });

      return {"padding":{"top":25,"left":30,"bottom":50,"right":18},"data":[{"name":"table","format":{"parse":{"x": "date"}},"values":values},{"name":"categories","source":"table","transform":[{"type":"facet","groupby":["c"]}]}],"scales":[{"name":"x","type":"time","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}},{"name":"x-label","type":"ordinal","range":"width","zero":false,"points":false,"padding":0.5,"domain":{"data":"table","field":"c"}},{"name":"color","type":"ordinal","domain":{"data":"table","field":"data"},"range":["#72B800","#F1B900","#B72A7E","#D4E329","#5BB1D2"]}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"group","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"marks":[{"type":"line","properties":{"enter":{"interpolate":{"value":"linear"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"scale":"color","field":"c"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}}]},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-30},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}},{"type":"rect","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"properties":{"enter":{"x":{"scale":"x-label","field":"c","offset":-40,"band":false},"width":{"value":6},"y":{"field":{"group":"height"},"mult":1.19},"y2":{"field":{"group":"height"},"mult":1.21}},"update":{"fill":{"scale":"color","field":"c"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["c"]}]},"properties":{"enter":{"x":{"scale":"x-label","field":"c","offset":-30},"y":{"field":{"group":"height"},"mult":1.22},"text":{"template":"{{datum.c}}"},"fontSize":{"value":11},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}}]};
    },

    /* Parser for the bars-lines chart */
    barslinesParser: function(data, configuration) {
      var values = [];
      for(var i = 0, j = data.length; i < j; i++) {
        values.push({
          x: data[i][configuration.x.name],
          y: data[i][configuration.y[0].name],
          z: data[i][configuration.y[1].name]
        });
      }

      /* Factor by which the y and z axis is 1000^(factor) divided */
      var factorY = this.getFactor(_.median(_.pluck(values, 'y')));
      var factorZ = this.getFactor(_.median(_.pluck(values, 'z')));

      /* We add the factor to the unit */
      var unitY = configuration.y[0].units;
      var unitZ = configuration.y[1].units;
      if(factorY >= 3)       { unitY = 'G' + unitY; }
      else if(factorY === 2) { unitY = 'M' + unitY; }
      else if(factorY === 1) { unitY = 'k' + unitY; }
      if(factorZ >= 3)       { unitZ = 'G' + unitZ; }
      else if(factorZ === 2) { unitZ = 'M' + unitZ; }
      else if(factorZ === 1) { unitZ = 'k' + unitZ; }

      values = values.map(function(v) {
        var o = {};
        o.x = v.x;
        o.y = factorY > 0 ? v.y / Math.pow(1000, factorY) : v.y;
        o.z = factorZ > 0 ? v.z / Math.pow(1000, factorZ) : v.z;
        o.unit = unitY;
        o.unitz = unitZ;
        return o;
      });

      /* Extent of the x axis */
      var extent = [
        _.min(_.pluck(data, configuration.x.name)),
        _.max(_.pluck(data, configuration.x.name))
      ];

      return {"padding":{"top":40,"left":30,"bottom":30,"right":30},"data":[{"name":"table","values":values}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"domain":extent,"nice":true},{"name":"y","type":"linear","range":"height","domain":{"data":"table","field":"y"},"nice":true},{"name":"z","type":"linear","range":"height","domain":{"data":"table","field":"z"},"nice":true}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","ticks":7,"scale":"z","grid":false,"layer":"back","format":"f","orient":"right","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"width":{"field": {"group": "width"},"mult": 0.03},"y":{"scale":"y","field":"y"},"y2":{"scale":"y","value":0}},"update":{"fill":{"value":"#F0CCDF"}},"hover":{"fill":{"value":"red"}}}},{"type":"line","from":{"data":"table"},"properties":{"enter":{"interpolate":{"value":"linear"}},"update":{"x":{"scale":"x","field":"x"},"y":{"scale":"z","field":"z"},"stroke":{"value":"#C4347D"},"strokeWidth":{"value":2}},"hover":{"fillOpacity":{"value":0.5}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-30},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unitz"]}]},"properties":{"enter":{"x":{"signal":"width","mult":1,"offset":30},"y":{"value":-15},"text":{"template":"{{datum.unitz}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"right"}}}}]};
    },

    /* Parser for the compare-bars chart */
    comparebarsParser: function(data, configuration) {
      var values = [
        {
          x: configuration.y[0].label,
          y: data[0][configuration.y[0].name]
        },
        {
          x: configuration.y[1].label,
          y: data[0][configuration.y[1].name]
        }
      ];

      /* Factor by which the y axis is 1000^(factor) divided */
      var factor = this.getFactor(_.median(_.pluck(values, 'y')));

      /* We add the factor to the unit */
      var unit = configuration.y[0].units;
      if(factor >= 3)       { unit = 'G' + unit; }
      else if(factor === 2) { unit = 'M' + unit; }
      else if(factor === 1) { unit = 'k' + unit; }

      values = values.map(function(v) {
        var o = {};
        o.x = v.x;
        o.y = factor > 0 ? v.y / Math.pow(1000, factor) : v.y;
        o.unit = unit;
        return o;
      });

      return {"padding":{"top":40,"left":30,"bottom":30,"right":18},"data":[{"name":"table","values":values}],"scales":[{"name":"x","type":"ordinal","range":"width","points":false,"padding":2,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","domain":{"data":"table","field":"y"},"nice":true},{"name":"color","type":"ordinal","domain":{"data":"table","field":"data"},"range":["#5BB1D2","#9aa2a9"]}],"axes":[{"type":"x","scale":"x","format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","scale":"y","ticks":7,"grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x","offset":-5},"width":{"scale":"x","band":true,"offset":10},"y":{"scale":"y","field":"y"},"y2":{"scale":"y","value":0}},"update":{"fill":{"scale":"color","field":"x"}},"hover":{"fill":{"value":"red"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-30},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}}]};
    }

  });

}).call(this, this.App);
