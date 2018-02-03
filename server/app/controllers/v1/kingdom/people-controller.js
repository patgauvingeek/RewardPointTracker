var sqlite3 = require('sqlite3').verbose();

function PeopleController() {
}

function query(req, res, db, id)
{
  var sql =  `SELECT name,
                (SELECT COUNT(datetime)
                 FROM rewards
                 WHERE people.id = person_id
                 GROUP BY person_id) as points,
                (SELECT CASE WHEN sex = 0 THEN male_title ELSE female_title END AS title
                 FROM titles
                 WHERE people.category_id = titles.category_id AND
                       cost = (SELECT MAX(cost)
                               FROM titles
                               WHERE people.category_id = titles.category_id AND 
                                     cost <= (SELECT COUNT(datetime)
                                              FROM rewards
                                              WHERE people.id = person_id
                                              GROUP BY person_id)
                 GROUP BY titles.category_id)) as title
              FROM people`;
  if (id === undefined) {
    sql += ` ORDER BY people.name;`;
    db.queryMethod = db.all;
  } else {
    sql += " WHERE people.id = " + id + ";";
    db.queryMethod = db.get;
  }
  db.queryMethod(sql, function(err, row_rows) {
    if (err) {
      throw err;
    }
    if (row_rows === undefined)
    {
      res.status(404).json({ message: "not found" });
      return;
    }
    res.status(200).json(row_rows);
    db.close();
  });
}

function get(req, res, next) {
  var db = new sqlite3.Database('./people.db');
  query(req, res, db);
}

PeopleController.prototype = {
  get: get
};

var peopleController = new PeopleController();

module.exports = peopleController;
