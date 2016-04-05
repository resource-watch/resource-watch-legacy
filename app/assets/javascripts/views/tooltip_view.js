(function(App) {

  'use strict';

  App.View.Tooltip = App.Core.View.extend({

    events: {
      'mouseenter .tooltip-cs': '_onEnter',
      'mouseleave .tooltip-cs': '_onLeave'
    },

    props: {
      tooltipEl: 'tooltip',
      tooltipClass: 'tooltip',
      visibleClass: 'visible',
      text: ''
    },
    
    initialize: function(props) {
      if (props) {
        this.props = _.extend(this.props, props);
      }
      this._renderTooltip();
    },

    _renderTooltip: function() {
      var tooltip = document.createElement('div');
      var text = document.createTextNode(this.props.text);
      tooltip.setAttribute('id', this.props.tooltipEl);
      tooltip.classList.add(this.props.tooltipClass);
      tooltip.appendChild(text);
      this.$el.prepend(tooltip);
      this.$tooltip = $(tooltip);
    },

    _hide: function() {
      var tooltip = this.el.querySelector('.' + this.props.tooltipEl);
      if (tooltip) {
        tooltip.parentNode.removeChild(tooltip);
      }
    },

    _onEnter: function(ev) {
      var $current = $(ev.currentTarget);
      var offset = $current.offset();
      this.$tooltip.css({
        left: offset.left - (this.$tooltip.width() / 2) + ($current.width() / 2),
        top: offset.top - this.$tooltip.height()
      });
      this.$tooltip[0].classList.add(this.props.visibleClass);
    },

    _onLeave: function() {
      this.$tooltip[0].classList.remove(this.props.visibleClass);
    }

  });

}).call(this, this.App);
