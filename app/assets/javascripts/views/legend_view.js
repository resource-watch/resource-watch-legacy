(function(App) {

  'use strict';

  App.View.Legend = App.Core.View.extend({

    tagName: 'div',

    className: 'legend',

    template: this.HandlebarsTemplates.legend,

    events: {
      'change .layerSwitch': '_onSwitch'
    },

    props: {
      isDraggable: true,
      listClass: 'list',
      itemClass: 'item',
      emptyClass: 'empty',
      visibleClass: 'visible',
      overClass: 'over',
      layerClass: 'layerSwitch',
      draggingClass: 'dragging',
      dropEffect: 'move'
    },

    defaultAttributes: {
      zIndex: 1,
      active: true
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.state.set({
        data: settings.data
      });

      this._start();
    },

    _start: function() {
      this._formatLegend();
      this.render();
    },

    _formatLegend: function() {
      var _this = this;
      var data = {};
      _.each(this.state.attributes.data, function(d) {
        data[d.name] = _.extend(_.clone(_this.defaultAttributes), d);
      });

      this.state.set({
        data: data
      }, { silent: true });
    },

    render: function() {
      this.$el.html(this.template({
        data: this.state.attributes.data,
        isDraggable: this.props.isDraggable
      }));

      if (this.props.isDraggable) {
        this._setDragListeners();
      }
    },

    _setDragListeners: function() {
      this.dragSourceEl = null;
      var items = this.el.querySelectorAll('.' + this.props.itemClass);
      for (var i = 0; i < items.length; i++) {
        var current = items[i];
        current.addEventListener('dragstart', _.bind(this._onDragStart, this), false);
        current.addEventListener('dragenter', _.bind(this._onDragEnter, this), false);
        current.addEventListener('dragover', _.bind(this._onDragOver, this), false);
        current.addEventListener('dragleave', _.bind(this._onDragLeave, this), false);
        current.addEventListener('drop', _.bind(this._onDragDrop, this), false);
        current.addEventListener('dragend', _.bind(this._onDragEnd, this), false);
      }
    },

    _setDraggingDirection(ev) {
      this.currentYPost = ev.screenY;
    },

    _onDragStart: function(ev) {
      this._setDraggingDirection(ev);
      ev.currentTarget.classList.add(this.props.draggingClass);
      this.dragSourceEl = ev.currentTarget;

      ev.dataTransfer.effectAllowed = this.props.dropEffect;
      ev.dataTransfer.setData('text/html', this.dragSourceEl.innerHTML);
    },

    _onDragEnter: function(ev) {
      if (!ev.currentTarget.classList.contains(this.props.draggingClass)) {
        var list = this.el.querySelector('.' + this.props.listClass);
        var listElements = this.el.querySelectorAll('.' + this.props.itemClass);
        var emptyEl = this.el.querySelector('.'+ this.props.emptyClass);

        if (this.currentYPost < ev.screenY &&
          (ev.currentTarget !== listElements[0] && ev.currentTarget !== list[listElements.length])) {
          ev.currentTarget.parentNode.insertBefore(emptyEl, ev.currentTarget.nextSibling);
        } else {
          list.insertBefore(emptyEl, ev.currentTarget);
        }

        emptyEl.classList.add(this.props.visibleClass);
        ev.currentTarget.classList.add(this.props.overClass);
      }
    },

    _onDragOver: function(ev) {
      ev.preventDefault();
      return false;
    },

    _onDragLeave: function(ev) {
      ev.currentTarget.classList.remove(this.props.overClass);
    },

    _onDragDrop: function(ev) {
      if (this.dragSourceEl !== ev.currentTarget) {
        var list = this.el.querySelector('.' + this.props.listClass);
        var emptyEl = this.el.querySelector('.'+ this.props.emptyClass);
        emptyEl.classList.remove(this.props.visibleClass);
        ev.currentTarget.parentNode.insertBefore(this.dragSourceEl, emptyEl.nextSibling);
      }
      return false;
    },

    _onDragEnd: function(ev) {
      var items = this.el.querySelectorAll('.' + this.props.itemClass);
      var emptyEl = this.el.querySelector('.'+ this.props.emptyClass);
      emptyEl.classList.remove(this.props.visibleClass);

      for (var i = 0; i < items.length; i++) {
        var current = items[i];
        current.classList.remove(this.props.overClass);
        current.classList.remove(this.props.draggingClass);
      }
      this._onOrderChanged(ev);
    },

    _onOrderChanged: function(ev) {
      var elements = this.el.querySelectorAll('.' + this.props.layerClass);
      var data = this.state.attributes.data;
      var newList = {};
      var el = ev.currentTarget.querySelector('.' + this.props.layerClass);

      for (var i = 0; i < elements.length; i++) {
        var current = elements[i];
        if (current.dataset.name === el.dataset.name) {
          data[current.dataset.name].zIndex = elements.length + 1;
        } else {
          data[current.dataset.name].zIndex = elements.length - i;
        }
        newList[current.dataset.name] = data[current.dataset.name];
      }

      this.state.set({
        data: newList
      }, { silent: true });
      this.trigger('legend:order', newList);
    },

    _onSwitch: function(ev) {
      var active = ev.currentTarget.checked;
      var data = this.state.attributes.data;
      data[ev.currentTarget.dataset.name].active = active;

      this.state.set({
        data: data
      }, { silent: true });
      this.render();
      this.trigger('legend:active', {
        name: ev.currentTarget.dataset.name,
        active: active
      });
    }
  });

}).call(this, this.App);
