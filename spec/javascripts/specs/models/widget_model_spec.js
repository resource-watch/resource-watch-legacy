'use strict';

describe('Widget model', function() {

  before(function() {
    this.widgetModel = new App.Model.Widget();
  });

  describe('creation', function() {
    it('should be ok', function() {
      expect(Backbone.Model).to.be.defined;
      expect(App.Model.Widget).to.be.defined;
      expect(this.widgetModel).to.be.an.instanceof(Backbone.Model);
    });
  });

});
