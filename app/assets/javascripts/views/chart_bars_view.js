(function(App) {

  'use strict';

  App.View.ChartBars = App.Core.View.extend({

    props: {
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
          "top": 25,
          "left": 30,
          "bottom": 30,
          "right": 20
        },
        "width": 270,
        "height": 240,
        "data": [
          {
            "name": "table",
            "values": data.values,
            "format": {
              "parse": {
                "x": "date"
              }
            }
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
            "type": "time",
            "range": "width",
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
          }
        ],
        "axes": [
          {
            "name": "lbl",
            "type": "x",
            "scale": "x",
            "ticks": 5,
            "format": "%Y",
            "properties": {
              "ticks": {
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
                },
                "dx": {
                  "value": 5
                }
              }
            }
          },
          {
            "type": "y",
            "ticks": 7,
            "scale": "y",
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
                  "field": "x"
                },
                "width": {
                  "field": {
                    "group": "width"
                  },
                  "mult": 0.03
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
                  "value": this.props.mainFillColor
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
                  "value": 300
                },
                "fill": {
                  "value": this.props.mainColor
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
