(function(App) {

  'use strict';

  App.View.ChartLine = App.Core.View.extend({

    props: {
      mainColor: '#9BA2AA',
      secondaryColor: '#9BA2AA',
      buckets: ['#72B800', '#F1B900', '#B72A7E', '#D4E329', '#5BB1D2'],
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
          "bottom": 50,
          "right": 18
        },
        "data": [
          {
            "name": "table",
            "format": {
              "parse": {
                "x": "date"
              }
            },
            "values": data.values
          },
          {
            "name": "categories",
            "source": "table",
            "transform": [
              {
                "type": "facet",
                "groupby": [
                  "c"
                ]
              }
            ]
          }
        ],
        "scales": [
          {
            "name": "x",
            "type": "time",
            "range": "width",
            "zero": false,
            "points": true,
            "domain": {
              "data": "table",
              "field": "x"
            }
          },
          {
            "name": "y",
            "type": "linear",
            "range": "height",
            "nice": true,
            "domain": {
              "data": "table",
              "field": "y"
            }
          },
          {
            "name": "x-label",
            "type": "ordinal",
            "range": "width",
            "zero": false,
            "points": false,
            "padding": 0.5,
            "domain": {
              "data": "table",
              "field": "c"
            }
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
            "name": "lbl",
            "type": "x",
            "scale": "x",
            "ticks": 5,
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
                  "value": this.props.secondaryColor
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
                  "value": "steelblue"
                }
              },
              "majorTicks": {
                "strokeWidth": {
                  "value": 0
                }
              },
              "axis": {
                "stroke": {
                  "value": this.props.secondaryColor
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
            "type": "group",
            "from": {
              "data": "table",
              "transform": [
                {
                  "type": "facet",
                  "groupby": [
                    "c"
                  ]
                }
              ]
            },
            "marks": [
              {
                "type": "line",
                "properties": {
                  "enter": {
                    "interpolate": {
                      "value": "linear"
                    }
                  },
                  "update": {
                    "x": {
                      "scale": "x",
                      "field": "x"
                    },
                    "y": {
                      "scale": "y",
                      "field": "y"
                    },
                    "stroke": {
                      "scale": "color",
                      "field": "c"
                    },
                    "strokeWidth": {
                      "value": 2
                    }
                  },
                  "hover": {
                    "fillOpacity": {
                      "value": 0.5
                    }
                  }
                }
              }
            ]
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
          },
          {
            "type": "rect",
            "from": {
              "data": "table",
              "transform": [
                {
                  "type": "facet",
                  "groupby": [
                    "c"
                  ]
                }
              ]
            },
            "properties": {
              "enter": {
                "x": {
                  "scale": "x-label",
                  "field": "c",
                  "offset": -40,
                  "band": false
                },
                "width": {
                  "value": 6
                },
                "y": {
                  "field": {
                    "group": "height"
                  },
                  "mult": 1.19
                },
                "y2": {
                  "field": {
                    "group": "height"
                  },
                  "mult": 1.21
                }
              },
              "update": {
                "fill": {
                  "scale": "color",
                  "field": "c"
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
                    "c"
                  ]
                }
              ]
            },
            "properties": {
              "enter": {
                "x": {
                  "scale": "x-label",
                  "field": "c",
                  "offset": -30
                },
                "y": {
                  "field": {
                    "group": "height"
                  },
                  "mult": 1.22
                },
                "text": {
                  "template": "{{datum.c}}"
                },
                "fontSize": {
                  "value": 11
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
