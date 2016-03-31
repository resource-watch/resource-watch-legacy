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
        'compare-bars': this.comparebarsParser,
        none: this.noneParser,
        gauge: this.gaugeParser
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

      /* If the chart doesn't have any data, we display a special chart */
      if(!data.length) { return parsers.none(); }

      /* Removes a dirty value from a graph */
      if(configuration.info.title==='Deforestation - Alerts') { data.shift(); }


      if(types.length === 1) {
        if(parsers[types[0]]) {
          if(types[0] === 'textual') {
            return parsers.gauge.call(this, data, configuration);
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

      var values = [];
      for(var i = 0, j = data.length; i < j; i++) {
        values.push({
          value: data[i][yNamespace],
          category: _.capitalize(data[i][xNamespace])
        });
      }

      return {"name":"arc","padding":{"top":25,"left":25,"bottom":25,"right":25},"data":[{"name":"table","values":values},{"name":"summary","source":"table","transform":[{"type":"aggregate","summarize":{"value":"sum"}}]},{"name":"layout","source":"table","transform":[{"type":"cross","with":"summary"},{"type":"pie","field":"a.value","sort":true},{"type":"formula","field":"percentage","expr":"round(datum.a.value / datum.b.sum_value * 100) === 0 ? '<1' : round(datum.a.value / datum.b.sum_value * 100)"},{"type":"formula","field":"angle_start","expr":"2*PI-datum.layout_end"},{"type":"formula","field":"angle_end","expr":"datum.angle_start+datum.layout_end-datum.layout_start"},{"type":"formula","field":"angle_mid","expr":"2*PI-datum.layout_mid"}]},{"name":"categories","source":"table","transform":[{"type":"formula","field":"reverse_value","expr":"-1 * datum.value"}]}],"scales":[{"name":"r","type":"sqrt","domain":{"data":"table","field":"value"},"range":[0,100]},{"name":"color","type":"ordinal","domain":{"data":"categories","field":"category","sort":{"field":"reverse_value","op":"min"}},"range":["#72B800","#F1B900","#B72A7E","#D4E329","#5BB1D2"]},{"name":"vertical","type":"ordinal","range":"height","domain":{"data":"categories","field":"category","sort":{"field":"reverse_value","op":"min"}},"points":true,"padding":10}],"marks":[{"type":"arc","from":{"data":"layout"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"startAngle":{"field":"angle_start"},"endAngle":{"field":"angle_end"},"innerRadius":{"field":{"group":"height"},"mult":0.38},"outerRadius":{"field":{"group":"height"},"mult":0.47},"fill":{"scale":"color","field":"a.category"}}}},{"type":"text","from":{"data":"layout"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"radius":{"field":{"group":"height"},"mult":0.55},"theta":{"field":"angle_mid"},"fontSize":{"value":10},"fill":{"value":"#9BA2AA"},"align":{"value":"center"},"baseline":{"value":"middle"},"text":{"template":"{{datum.percentage}}%"}}}},{"type":"symbol","from":{"data":"categories"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5,"offset":-45},"y":{"scale":"vertical","field":"category"}},"update":{"fill":{"field":"category","scale":"color"},"size":{"value":50}}}},{"type":"text","from":{"data":"categories"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5,"offset":-37},"y":{"scale":"vertical","field":"category","offset":1}},"update":{"fontSize":{"value":10},"fill":{"value":"#9BA2AA"},"text":{"template":"{{datum.category|truncate:20}}"},"baseline":{"value":"middle"}}}}]};
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

      return {"padding":{"top":25,"left":30,"bottom":30,"right":20},"width":270,"height":240,"data":[{"name":"table","values":values,"format":{"parse":{"x":"date"}}},{"name":"summary","source":"table","transform":[{"type":"aggregate","summarize":{"y":["min","max"]}},{"type":"formula","field":"difference","expr":"datum.max_y-datum.min_y"},{"type":"formula","field":"min","expr":"datum.min_y === 0 ? 0 : (datum.difference > 0 ? datum.min_y - datum.difference * 0.2  : datum.min_y * 0.8)"},{"type":"formula","field":"min","expr":"datum.min < 0 ? 0 : datum.min"},{"type":"formula","field":"max","expr":"datum.max_y === 0 ? 10 : (datum.difference > 0 ? datum.max_y + datum.difference * 0.2 : datum.max_y * 1.2)"}]},{"name":"computed","source":"table","transform":[{"type":"cross","with":"summary"}]}],"scales":[{"name":"x","type":"time","range":"width","domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","domain":{"data":"computed","field":"a.y"},"domainMin":{"data":"computed","field":"b.min"},"domainMax":{"data":"computed","field":"b.max"},"zero":false,"nice":true}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"%Y","properties":{"ticks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"dx":{"value":5}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"width":{"field":{"group":"width"},"mult":0.03},"y":{"scale":"y","field":"y"},"y2":{"field":{"group":"height"}}},"update":{"fill":{"value":"#5BB1D2"}},"hover":{"fill":{"value":"#c32d7b"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-30},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}}]};
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

      return {"padding":{"top":40,"left":30,"bottom":30,"right":18},"data":[{"name":"table","values":values},{"name":"summary","source":"table","transform":[{"type":"aggregate","summarize":{"y":["min","max"]}},{"type":"formula","field":"difference","expr":"datum.max_y-datum.min_y"},{"type":"formula","field":"min","expr":"datum.min_y === 0 ? 0 : (datum.difference > 0 ? datum.min_y - datum.difference * 0.2  : datum.min_y * 0.8)"},{"type":"formula","field":"min","expr":"datum.min < 0 ? 0 : datum.min"},{"type":"formula","field":"max","expr":"datum.max_y === 0 ? 10 : (datum.difference > 0 ? datum.max_y + datum.difference * 0.2 : datum.max_y * 1.2)"}]},{"name":"computed","source":"table","transform":[{"type":"cross","with":"summary"}]}],"scales":[{"name":"x","type":"ordinal","range":"width","points":false,"padding":2,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","domain":{"data":"computed","field":"a.y"},"domainMin":{"data":"computed","field":"b.min"},"domainMax":{"data":"computed","field":"b.max"},"zero":false,"nice":true},{"name":"color","type":"ordinal","domain":{"data":"table","field":"data"},"range":["#5BB1D2","#9aa2a9"]}],"axes":[{"type":"x","scale":"x","format":"f","properties":{"ticks":{"strokeWidth":{"value":0}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}},{"type":"y","scale":"y","ticks":7,"grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"}}}}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"x","offset":-5},"width":{"scale":"x","band":true,"offset":10},"y":{"scale":"y","field":"y"},"y2":{"field":{"group":"height"}}},"update":{"fill":{"scale":"color","field":"x"}},"hover":{"fill":{"value":"red"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"facet","groupby":["unit"]}]},"properties":{"enter":{"x":{"value":-30},"y":{"value":-15},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"left"}}}}]};
    },

    /* Return a graph with the text "No data available" */
    noneParser: function() {
      return {"padding":{"top":40,"left":30,"bottom":30,"right":30},"width":200,"height":200,"data":[],"scales":[],"axes":[],"marks":[{"type":"text","properties":{"enter":{"x":{"field":{"group":"height"},"mult":0.5},"y":{"field":{"group":"width"},"mult":0.5,"offset":4},"text":{"value":"No data available"},"fontSize":{"value":25},"fontWeight":{"value":500},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]};
    },

    /* Parser for the gauge chart */
    gaugeParser: function(data, configuration) {
      console.log(configuration, data);
      var percentage = data[0][configuration.y[0].name];
      // var firstValue = _.formatNumber(Math.round(data[0][configuration.y[0].name]));
      // var secondValue = _.formatNumber(Math.round(data[0][configuration.y[1].name]));
      // var secondValueLabel = configuration.y[1].label;
      // return {"width":300,"height":180,"padding":{"top":10,"left":10,"bottom":30,"right":15},"data":[{"name":"table","values":[{"x":firstValue,"y":null,"c":"cat1","unit":unit},{"x":secondValueLabel,"y":null,"c":"cat2","unit":""},{"x":secondValue,"y":null,"c":"cat3","unit":unit}]}],"scales":[{"name":"x","type":"linear","range":"width","zero":false,"points":true,"domain":{"data":"table","field":"x"}},{"name":"y","type":"linear","range":"height","nice":true,"domain":{"data":"table","field":"y"}}],"marks":[{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c=='cat1'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"text":{"template":"{{datum.x}}"},"fontSize":{"value":55},"fontWeight":{"value":600},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c=='cat1'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.64},"text":{"template":"{{datum.unit}}"},"fontSize":{"value":12},"fontWeight":{"value":500},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c=='cat2'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.9},"text":{"template":"{{datum.x}}"},"fontSize":{"value":12},"fontWeight":{"value":600},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}},{"type":"text","from":{"data":"table","transform":[{"type":"filter","test":"datum.c=='cat3'"}]},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":1},"text":{"template":"{{datum.x}} {{datum.unit}}"},"fontSize":{"value":15},"fontWeight":{"value":300},"fill":{"value":"#9BA2AA"},"align":{"value":"center"}}}}]};
      return {"name":"arc","width":300,"height":300,"data":[{"name":"table","values":[{"percentage":percentage}],"transform":[{"type":"pie","field":"data"},{"type":"formula","field":"percentage","expr":"round(datum.percentage)"},{"type":"formula","field":"start_angle","expr":"-3*PI/4"},{"type":"formula","field":"end_angle","expr":"-datum.start_angle"},{"type":"formula","field":"start_anchor_dx","expr":"sin(datum.start_angle) * 82.5"},{"type":"formula","field":"start_anchor_dy","expr":"-cos(datum.start_angle) * 82.5"},{"type":"formula","field":"end_anchor_dx","expr":"-datum.start_anchor_dx"},{"type":"formula","field":"end_anchor_dy","expr":"datum.start_anchor_dy"},{"type":"formula","field":"value_angle","expr":"datum.percentage * (2 * datum.end_angle) / 100 - datum.end_angle"},{"type":"formula","field":"anchor_value_dx","expr":"sin(datum.value_angle) * 82.5"},{"type":"formula","field":"anchor_value_dy","expr":"-cos(datum.value_angle) * 82.5"}]}],"scales":[{"name":"arc_percentage","type":"linear","range":[-2.3561944902,2.3561944902],"domain":[0,100]}],"marks":[{"type":"arc","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"startAngle":{"field":"start_angle"},"endAngle":{"field":"end_angle"},"innerRadius":{"value":90},"outerRadius":{"value":"75"},"fill":{"value":"#F4F5F6"}}}},{"type":"group","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5}}},"marks":[{"type":"symbol","from":{"data":"table"},"properties":{"enter":{"x":{"field":"end_anchor_dx"},"y":{"field":"end_anchor_dy"},"size":{"value":180},"fill":{"value":"#F4F5F6"}}}}]},{"type":"arc","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5},"startAngle":{"field":"start_angle"},"endAngle":{"field":"percentage","scale":"arc_percentage"},"innerRadius":{"value":90},"outerRadius":{"value":"75"},"fill":{"value":"#5BB1D2"}}}},{"type":"group","from":{"data":"table"},"properties":{"enter":{"x":{"field":{"group":"width"},"mult":0.5},"y":{"field":{"group":"height"},"mult":0.5}}},"marks":[{"type":"symbol","from":{"data":"table"},"properties":{"enter":{"x":{"field":"start_anchor_dx"},"y":{"field":"start_anchor_dy"},"size":{"value":180},"fill":{"value":"#5BB1D2"}}}},{"type":"symbol","from":{"data":"table"},"properties":{"enter":{"x":{"field":"anchor_value_dx"},"y":{"field":"anchor_value_dy"},"size":{"value":180},"fill":{"value":"#5BB1D2"}}}},{"type":"text","from":{"data":"table"},"properties":{"enter":{"x":{"value":0},"y":{"value":0},"align":{"value":"center"},"baseline":{"value":"middle"},"text":{"template":"{{datum.percentage}}%"},"fill":{"value":"#5BB1D2"},"fontSize":{"value":20}}}}]}]};
    }

  });

}).call(this, this.App);
