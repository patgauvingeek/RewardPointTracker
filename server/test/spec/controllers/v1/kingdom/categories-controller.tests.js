
describe('CategoriesController Tests', function() {

  var categoriesController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    categoriesController = require('../../../../../app/controllers/v1/kingdom/categories-controller');
  });

  describe('put()', function() {

    it('should be a function', function(done) {
      expect(categoriesController.put).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      categoriesController.put(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        categoriesController.put(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
