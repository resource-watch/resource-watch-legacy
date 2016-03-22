(function(App) {

  'use strict';

  App.View.Pagination = App.Core.View.extend({

    tagName: 'div',

    className: 'pagination',

    template: this.HandlebarsTemplates.pagination,

    events: {
      'click a': 'updateCurrent'
    },

    state: {
      current: 1,
      pages: 0,
      itemsPerPage: 0
    },

    initialize: function(settings) {
      this.state.set({
        current: settings.props.current,
        pages: settings.props.pages,
        itemsPerPage: settings.props.itemsPerPage
      });
      this.render();
    },

    render: function() {
      var pagesRange = _.range(1, this.state.attributes.pages + 1);
      var pagesData = _.map(pagesRange, function(p) {
        return {
          page: p,
          current: this.state.attributes.current === p
        };
      }, this);
      this.$el.html(this.template({ pages: pagesData }));
      return this;
    },

    /**
     * Cancel follow link
     */
    updateCurrent: function(e) {
      e.preventDefault();
      var page = Number($(e.currentTarget).data('page'));
      this.state.set('current', page, { validate: true });
    },

    /**
     * Calc first and end index for pagination
     * @return {Object}
     */
    getPageRange: function() {
      var itemsPerPage = this.state.attributes.itemsPerPage;
      var currentPage = this.state.attributes.current;
      return {
        startIndex: itemsPerPage * (currentPage ? (currentPage - 1) : 0),
        endIndex: currentPage ? (itemsPerPage * currentPage) : itemsPerPage
      };
    }

  });

}).call(this, this.App);
