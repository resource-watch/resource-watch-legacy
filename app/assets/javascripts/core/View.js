(function(App) {

  'use strict';

  var domChanged = function(target, callback) {
    // select the target node
    var target = target;
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        callback(mutation);
      });
    });
    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true };
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
    // later, you can stop observing
    // observer.disconnect();
  };

  var StateModel = Backbone.Model.extend({});

  var View = function(settings) {
    // Setting options at beginning
    var options = settings && settings.props ? settings.props : {};
    this.props = _.extend({}, this.props || {}, options);
    this.state = new StateModel(this.state || {}, settings && settings.state || {});
    Backbone.View.call(this, settings);
    // Trigger 'render' event when DOM change
    domChanged(this.el, _.bind(function() {
      this.trigger('render');
    }, this));
    // Render again when state change, this action doesn't render at beginning
    this.listenTo(this.state, 'change', this.render);
  };

  _.extend(View.prototype, Backbone.View.prototype, {

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
        // Adding className if element is specified
        this.el.classList.add(this.className);
      }
    }

  });

  View.extend = Backbone.View.extend;

  App.Core.View = View;

}).call(this, this.App);
