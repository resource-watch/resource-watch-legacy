(function(App) {

  'use strict';

  App.View.Legend = App.Core.View.extend({

    tagName: 'div',

    className: 'legend',

    template: this.HandlebarsTemplates.legend,

    events: {
      'click .js-layer-close': '_removeLayer'
    },

    props: {
      isDraggable: true,
      listClass: 'list',
      itemClass: 'item',
      emptyClass: 'empty',
      visibleClass: 'visible',
      overClass: 'over',
      layerClass: 'layerClose',
      draggingClass: 'dragging',
      dropEffect: 'move'
    },

    state: {
      data: null,
      orderChanged: false
    },

    initialize: function(settings) {
      if (settings.data) {
        this.state.set({
          data: settings.data
        }, { silent: true });

        this._start();
      }
    },

    /**
     * Starts the legend after initialization
     */
    _start: function() {
      this._formatLegend();
      this.render();
    },

    /**
     * Formats the data with extra needed attributes
     */
    _formatLegend: function() {
      var _this = this;
      var data = {};
      _.each(this.state.attributes.data, function(d) {
        data[d.name] = d;
      });

      this.state.set({
        data: data
      }, { silent: true });
    },

    /**
     * Renders the legend
     */
    render: function() {
      var data = this._getSortedData();
      this.$el.html(this.template({
        data: data,
        isDraggable: this.props.isDraggable
      }));

      if (this.props.isDraggable) {
        this._setDragListeners();
      }
    },

    /**
     * Sorts the data depending
     * on the current order and
     * after it has changed
     */
    _getSortedData: function() {
      var data = this.state.attributes.data;
      var list = [];

      _.each(data, function(d) {
        list.push(d);
      });

      if (!this.state.attributes.orderChanged) {
        list.reverse();
      }
      return list;
    },

    /**
     * Sets the dragging listeners
     */
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

    /**
     * Sets the dragging direction coordinate position
     */
    _setDraggingDirection: function(ev) {
      this.currentYPost = ev.screenY;
    },

    /**
     * Stores the current dragging element
     * @param {Object} event
     */
    _onDragStart: function(ev) {
      this._setDraggingDirection(ev);
      ev.currentTarget.classList.add(this.props.draggingClass);
      this.dragSourceEl = ev.currentTarget;

      ev.dataTransfer.effectAllowed = this.props.dropEffect;
      ev.dataTransfer.setData('text/html', this.dragSourceEl.innerHTML);
    },

    /**
     * When dragging over an element it shows a placeholder and
     * leaves a space for the new position
     * @param {Object} event
     */
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

    /**
     * On Drag over prevent default, special case
     * for links, etc.
     * @param {Object} event
     */
    _onDragOver: function(ev) {
      ev.preventDefault();
      return false;
    },

    /**
     * On Drag leave, remove custom over class
     * @param {Object} event
     */
    _onDragLeave: function(ev) {
      ev.currentTarget.classList.remove(this.props.overClass);
    },

    /**
     * On Drag drop check if it's not the same element
     * then moves the element to the new position
     * @param {Object} event
     */
    _onDragDrop: function(ev) {
      if (this.dragSourceEl !== ev.currentTarget) {
        var list = this.el.querySelector('.' + this.props.listClass);
        var emptyEl = this.el.querySelector('.'+ this.props.emptyClass);
        emptyEl.classList.remove(this.props.visibleClass);
        ev.currentTarget.parentNode.insertBefore(this.dragSourceEl, emptyEl.nextSibling);
      }
      return false;
    },

    /**
     * On Drag end removes all of the interaction classes
     * @param {Object} event
     */
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

    /**
     * After a drag event, it stores the new position
     * of all of the elements
     * @param {Object} event
     */
    _onOrderChanged: function(ev) {
      var elements = this.el.querySelectorAll('.' + this.props.layerClass);
      var data = this.state.attributes.data;
      var newList = {};
      var el = ev.currentTarget.querySelector('.' + this.props.layerClass);

      for (var i = 0; i < elements.length; i++) {
        var current = elements[i];
        if (current) {
          data[current.dataset.name].zIndex = elements.length - i;
          newList[current.dataset.name] = data[current.dataset.name];
        }
      }

      this.state.set({
        data: newList,
        orderChanged: true
      }, { silent: true });
      this.trigger('legend:order', newList);
    },

    /**
     * On a switch toggle, it stores the new state
     * @param {Object} event
     */
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
    },

    _removeLayer: function(ev) {
      var name = ev.currentTarget.dataset.name;
      var layer = this.state.attributes.data[name];
      var el = document.querySelector('[data-slug="btn-' + layer.slug + '"] .js-toggle-layer');

      App.Core.Events.trigger('card:layer:remove', layer);
      el.classList.remove('-active');
      el.innerHTML = el.dataset.i18default;
    },

    /**
     * Updates the legend data width
     * the layers list
     * @param {Object} layers
     */
    update: function(data) {
      var dataList = [];
      _.each(data, function(d) {
        dataList.push(d.data);
      });

      this.state.set({
        data: dataList
      }, { silent: true });
      this._start();
    }
  });

}).call(this, this.App);
