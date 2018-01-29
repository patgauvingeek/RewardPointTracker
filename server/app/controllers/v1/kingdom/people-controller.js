
function PeopleController() {
}

function get(req, res, next) {
  res.status(200).json({ hello: 'world' });
}

PeopleController.prototype = {
  get: get
};

var peopleController = new PeopleController();

module.exports = peopleController;
