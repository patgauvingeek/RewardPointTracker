
describe('TitlesController Tests', function() {

  var titlesController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    titlesController = require('../../../../../app/controllers/v1/kingdom/titles-controller');
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(titlesController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      titlesController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        titlesController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
