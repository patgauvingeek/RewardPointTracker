var rewards = require('../../../rewards');
var peopleController = require('./people-controller');

function RewardsController() {
}

function get(req, res, next) {
  rewards.Database.connect(function(db)  {
    var sql =  `SELECT datetime
                FROM rewards
                WHERE people_id = ?;`;
    db.all(sql, [req.params.id], function(err, rows) {
      if (err) {
        return console.log(err);
      }
      let datetimes = rows.map(function(v){
        return v.datetime;
      })
      res.status(200).json(datetimes);
      db.close();
    });
  });
}

function put(req, res) {
  rewards.Database.connect(function(db)  {
    var sql = "INSERT INTO rewards (people_id) VALUES(?);"
    if (req.body.datetime !== undefined)
    {
      var sql = "INSERT INTO rewards (people_id, datetime) VALUES(?, \"" + req.body.datetime + "\");";
    }

    db.run(sql, [req.params.id], function(err) {
      if (err) {
        return console.log(err);
      }
      new peopleController.query(req, res, db, req.params.id);      
    });
  });
}

RewardsController.prototype = {
  get: get,
  put: put
};

var rewardsController = new RewardsController();

module.exports = rewardsController;
