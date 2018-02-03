var sqlite3 = require('sqlite3').verbose();

function RewardsController() {
}

function get(req, res, next) {
  var db = new sqlite3.Database('./people.db');
  var sql =  `SELECT datetime
              FROM rewards
              WHERE people_id = ?;`;
  db.all(sql, [req.params.id], function(err, rows) {
    if (err) {
      throw err;
    }
    let datetimes = rows.map(function(v){
      return v.datetime;
    })
    res.status(200).json(datetimes);
    db.close();
  });
}

function put(req, res) {
  var db = new sqlite3.Database('./people.db');
  console.log(req);
  db.run("INSERT INTO rewards (people_id) VALUES(?);", [req.params.id], function(err) {
    if (err) {
      throw err;
    }
    var sql =  `SELECT CASE WHEN (SELECT COUNT(*) AS points
                                  FROM rewards
                                  WHERE people_id = ?
                                  GROUP BY people_id) IS NULL
                        THEN 0
                        ELSE (SELECT COUNT(*)
                              FROM rewards
                              WHERE people_id = ?
                              GROUP BY people_id)
                        END AS points;`;
    db.get(sql, [req.params.id, req.params.id], function(err, row) {
      if (err) {
        throw err;
      }
      res.status(200).json(row.points);
      db.close();
    });      
  });
}

RewardsController.prototype = {
  get: get,
  put: put
};

var rewardsController = new RewardsController();

module.exports = rewardsController;
