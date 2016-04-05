(function(App) {

  'use strict';

  App.View.ChartPie = App.Core.View.extend({

    props: {
      buckets: ['#72B800', '#F1B900', '#B72A7E', '#D4E329', '#5BB1D2'],
      mainColor: '#9BA2AA'
    },

    initialize: function(props) {
      if (props) {
        this.props = _.extend(this.props, props);
      }
    },

    getData: function(data) {
      return {
        "name": "arc",
        "padding": {
          "top": 25,
          "left": 25,
          "bottom": 25,
          "right": 25
        },
        "data": [{
          "name": "table",
          "values": data.values
        }, {
          "name": "summary",
          "source": "table",
          "transform": [{
            "type": "aggregate",
            "summarize": {
              "value": "sum"
            }
          }]
        }, {
          "name": "layout",
          "source": "table",
          "transform": [{
            "type": "cross",
            "with": "summary"
          }, {
            "type": "pie",
            "field": "a.value",
            "sort": true
          }, {
            "type": "formula",
            "field": "percentage",
            "expr": "round(datum.a.value / datum.b.sum_value * 100) === 0 ? '<1' : round(datum.a.value / datum.b.sum_value * 100)"
          }, {
            "type": "formula",
            "field": "angle_start",
            "expr": "2*PI-datum.layout_end"
          }, {
            "type": "formula",
            "field": "angle_end",
            "expr": "datum.angle_start+datum.layout_end-datum.layout_start"
          }, {
            "type": "formula",
            "field": "angle_mid",
            "expr": "2*PI-datum.layout_mid"
          }]
        }, {
          "name": "categories",
          "source": "table",
          "transform": [{
            "type": "formula",
            "field": "reverse_value",
            "expr": "-1 * datum.value"
          }]
        }],
        "scales": [{
          "name": "r",
          "type": "sqrt",
          "domain": {
            "data": "table",
            "field": "value"
          },
          "range": [0, 100]
        }, {
          "name": "color",
          "type": "ordinal",
          "domain": {
            "data": "categories",
            "field": "category",
            "sort": {
              "field": "reverse_value",
              "op": "min"
            }
          },
          "range": this.props.buckets
        }, {
          "name": "vertical",
          "type": "ordinal",
          "range": "height",
          "domain": {
            "data": "categories",
            "field": "category",
            "sort": {
              "field": "reverse_value",
              "op": "min"
            }
          },
          "points": true,
          "padding": 10
        }],
        "marks": [{
          "type": "arc",
          "from": {
            "data": "layout"
          },
          "properties": {
            "enter": {
              "x": {
                "field": {
                  "group": "width"
                },
                "mult": 0.5
              },
              "y": {
                "field": {
                  "group": "height"
                },
                "mult": 0.5
              },
              "startAngle": {
                "field": "angle_start"
              },
              "endAngle": {
                "field": "angle_end"
              },
              "innerRadius": {
                "field": {
                  "group": "height"
                },
                "mult": 0.38
              },
              "outerRadius": {
                "field": {
                  "group": "height"
                },
                "mult": 0.47
              },
              "fill": {
                "scale": "color",
                "field": "a.category"
              }
            }
          }
        }, {
          "type": "text",
          "from": {
            "data": "layout"
          },
          "properties": {
            "enter": {
              "x": {
                "field": {
                  "group": "width"
                },
                "mult": 0.5
              },
              "y": {
                "field": {
                  "group": "height"
                },
                "mult": 0.5
              },
              "radius": {
                "field": {
                  "group": "height"
                },
                "mult": 0.55
              },
              "theta": {
                "field": "angle_mid"
              },
              "fontSize": {
                "value": 10
              },
              "fill": {
                "value": data.mainColor || this.props.mainColor
              },
              "align": {
                "value": "center"
              },
              "baseline": {
                "value": "middle"
              },
              "text": {
                "template": "{{datum.percentage}}%"
              }
            }
          }
        }, {
          "type": "symbol",
          "from": {
            "data": "categories"
          },
          "properties": {
            "enter": {
              "x": {
                "field": {
                  "group": "width"
                },
                "mult": 0.5,
                "offset": -45
              },
              "y": {
                "scale": "vertical",
                "field": "category"
              }
            },
            "update": {
              "fill": {
                "field": "category",
                "scale": "color"
              },
              "size": {
                "value": 50
              }
            }
          }
        }, {
          "type": "text",
          "from": {
            "data": "categories"
          },
          "properties": {
            "enter": {
              "x": {
                "field": {
                  "group": "width"
                },
                "mult": 0.5,
                "offset": -37
              },
              "y": {
                "scale": "vertical",
                "field": "category",
                "offset": 1
              }
            },
            "update": {
              "fontSize": {
                "value": 10
              },
              "fill": {
                "value": data.mainColor || this.props.mainColor
              },
              "text": {
                "template": "{{datum.category|truncate:20}}"
              },
              "baseline": {
                "value": "middle"
              }
            }
          }
        }]
      }
    }
  });

}).call(this, this.App);
