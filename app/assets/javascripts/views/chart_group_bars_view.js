(function(App) {

  'use strict';

  App.View.ChartGroupBars = App.Core.View.extend({

    props: {
      buckets: ['#72B800', '#F1B900', '#B72A7E', '#D4E329', '#5BB1D2'],
      mainColor: '#9BA2AA',
      secondaryColor: '#9BA2AA',
      mainFillColor: '#5BB1D2'
    },

    initialize: function(props) {
      if (props) {
        this.props = _.extend(this.props, props);
      }
    },

    getData: function(data) {
      return {
        "padding": {
          "top": 40,
          "left": 40,
          "bottom": 30,
          "right": 20
        },
        "data": [
          {
            "name": "table",
            "values": data.values
          },
          {
            "name": "summary",
            "source": "table",
            "transform": [
              {
                "type": "aggregate",
                "summarize": {
                  "y": [
                    "min",
                    "max"
                  ]
                }
              },
              {
                "type": "formula",
                "field": "difference",
                "expr": "datum.max_y-datum.min_y"
              },
              {
                "type": "formula",
                "field": "min",
                "expr": "datum.min_y === 0 ? 0 : (datum.difference > 0 ? datum.min_y - datum.difference * 0.2  : datum.min_y * 0.8)"
              },
              {
                "type": "formula",
                "field": "min",
                "expr": "datum.min < 0 ? 0 : datum.min"
              },
              {
                "type": "formula",
                "field": "max",
                "expr": "datum.max_y === 0 ? 10 : (datum.difference > 0 ? datum.max_y + datum.difference * 0.2 : datum.max_y * 1.2)"
              }
            ]
          },
          {
            "name": "computed",
            "source": "table",
            "transform": [
              {
                "type": "cross",
                "with": "summary"
              }
            ]
          }
        ],
        "scales": [
          {
            "name": "x",
            "type": "ordinal",
            "range": "width",
            "points": false,
            "padding": 2,
            "domain": {
              "data": "table",
              "field": "x"
            }
          },
          {
            "name": "y",
            "type": "linear",
            "range": "height",
            "domain": {
              "data": "computed",
              "field": "a.y"
            },
            "domainMin": {
              "data": "computed",
              "field": "b.min"
            },
            "domainMax": {
              "data": "computed",
              "field": "b.max"
            },
            "zero": false,
            "nice": true
          },
          {
            "name": "color",
            "type": "ordinal",
            "domain": {
              "data": "table",
              "field": "data"
            },
            "range": this.props.buckets
          }
        ],
        "axes": [
          {
            "type": "x",
            "scale": "x",
            "format": "f",
            "properties": {
              "ticks": {
                "strokeWidth": {
                  "value": 0
                }
              },
              "majorTicks": {
                "strokeWidth": {
                  "value": 0
                }
              },
              "axis": {
                "stroke": {
                  "value": this.props.mainColor
                },
                "strokeWidth": {
                  "value": 0
                }
              },
              "labels": {
                "fontSize": {
                  "value": 10
                },
                "fontWeight": {
                  "value": 300
                },
                "fill": {
                  "value": this.props.mainColor
                }
              }
            }
          },
          {
            "type": "y",
            "scale": "y",
            "ticks": 7,
            "grid": true,
            "layer": "back",
            "format": "f",
            "properties": {
              "grid": {
                "stroke": {
                  "value": this.props.secondaryColor
                },
                "strokeOpacity": {
                  "value": "0.5"
                }
              },
              "ticks": {
                "stroke": {
                  "value": this.props.mainColor
                }
              },              "majorTicks": {
                "strokeWidth": {
                  "value": 0
                }
              },
              "axis": {
                "stroke": {
                  "value": this.props.mainColor
                },
                "strokeWidth": {
                  "value": 0
                }
              },
              "labels": {
                "fontSize": {
                  "value": 10
                },
                "fontWeight": {
                  "value": 300
                },
                "fill": {
                  "value": this.props.mainColor
                }
              }
            }
          }
        ],
        "marks": [
          {
            "type": "rect",
            "from": {
              "data": "table"
            },
            "properties": {
              "enter": {
                "x": {
                  "scale": "x",
                  "field": "x",
                  "offset": -5
                },
                "width": {
                  "scale": "x",
                  "band": true,
                  "offset": 10
                },
                "y": {
                  "scale": "y",
                  "field": "y"
                },
                "y2": {
                  "field": {
                    "group": "height"
                  }
                }
              },
              "update": {
                "fill": {
                  "scale": "color",
                  "field": "x"
                }
              }
            }
          },
          {
            "type": "text",
            "from": {
              "data": "table",
              "transform": [
                {
                  "type": "facet",
                  "groupby": [
                    "unit"
                  ]
                }
              ]
            },
            "properties": {
              "enter": {
                "x": {
                  "value": -30
                },
                "y": {
                  "value": -15
                },
                "text": {
                  "template": "{{datum.unit}}"
                },
                "fontSize": {
                  "value": 10
                },
                "fontWeight": {
                  "value": 500
                },
                "fill": {
                  "value": data.mainColor || this.props.mainColor
                },
                "align": {
                  "value": "left"
                }
              }
            }
          }
        ]
      }
    }
  });

}).call(this, this.App);
