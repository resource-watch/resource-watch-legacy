(function(App) {

  'use strict';

  App.View.Country = App.Core.View.extend({

    tagName: 'div',

    className: 'country',

    props: {
      width: 200,
      height: 200,
      fillColor: '#333'
    },

    template: this.HandlebarsTemplates.country,

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Model.Country(settings.data);
    },

    render: function() {
      this.$el.attr('data-iso', this.data.attributes.iso)
        .html(this.template(this.data.attributes));
      // this.draw();
      return this;
    },

    draw: function(format) {
      format = format || 'svg';

      var geojson = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": JSON.parse(this.data.attributes.geometry),
          "properties": {
            "iso": this.data.attributes.iso,
            "name": this.data.attributes.name
          }
        }]
      };
      var w = this.props.width;
      var h = this.props.height;
      var scale = w / 2;
      var offset = [ w / 2, h / 2];

      var center = d3.geo.centroid(geojson);
      var projection = d3.geo.mercator()
        .scale(scale)
        .center(center)
        .translate(offset);

      var canvas = d3.select(this.el).append(format)
        .attr('width', w)
        .attr('height', h);
      var path = d3.geo.path().projection(projection);

      var context = format === 'canvas' ? canvas.node().getContext('2d') : null;

      // using the path determine the bounds of the current map and use
      // these to determine better values for the scale and translation
      var bounds  = path.bounds(geojson);
      var hscale  = scale * w  / (bounds[1][0] - bounds[0][0]);
      var vscale  = scale * h / (bounds[1][1] - bounds[0][1]);
      scale   = ((hscale < vscale) ? hscale : vscale) * 0.9;
      offset  = [w - (bounds[0][0] + bounds[1][0])/2,
                        h - (bounds[0][1] + bounds[1][1])/2];

      // new projection
      projection = d3.geo.mercator()
        .center(center)
        .scale(scale)
        .translate(offset);

      path = path.projection(projection);

      if (format === 'canvas') {
        path.context(context);
        path(geojson.features[0]);
        context.fillStyle = this.props.fillColor;
        context.fill();
      } else {
        canvas.selectAll('path')
         .data(geojson.features).enter()
         .append('path')
         .attr('d', path)
           .style('fill', this.props.fillColor);
      }
    }

  });

}).call(this, this.App);
