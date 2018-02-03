var sqlite3 = require('sqlite3').verbose();

function PeopleController() {
}

function query(req, res, db, id)
{
  var sql =  `SELECT people.id, people.name,
                CASE WHEN sex = 0 THEN "M" ELSE "F" END AS sex,
                category_id, categories.name AS category,
                (SELECT COUNT(datetime)
                 FROM rewards
                 WHERE people.id = person_id
                 GROUP BY person_id) AS points,
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
                 GROUP BY titles.category_id)) AS title
              FROM people
              LEFT JOIN categories ON categories.id = category_id`;
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

function put(req, res, next) {
  var db = new sqlite3.Database('./people.db');

  if (req.body.sex != "M" || req.body.sex != "F"){
    new Error("The sex field have to be \"M\" or \"F\"");
  }

  let sql_param = [
    req.body.name,
    req.body.sex == "M" ? 0 : 1,
    req.body.category_id
  ]
  if (req.params.id === undefined)
  {
    //
    // insert
    //
    let sql_insert = `INSERT INTO people 
                        (name, sex, category_id)
                      VALUES
                        (?, ?, ?);`;
    db.run(sql_insert, sql_param, function(err, rows) {
      if (err) {
        throw err;
      }
      query(req, res, db, "(select last_insert_rowid())");      
    });
    return;  
  }
  //
  // update
  //
  sql_param.push(req.params.id);
  var sql_update = `UPDATE people 
                    SET name = ?, sex = ?, category_id = ?
                    WHERE id = ?`;
  db.run(sql_update, sql_param, function(err, rows) {
    if (err) {
      throw err;
    }
    query(req, res, db, req.params.id);
  });
}

//
// DELETE
//
function remove(req, res) {
  var db = new sqlite3.Database('./people.db');
  db.run("DELETE FROM people WHERE id = ?;", [req.params.id], function(err) {
    if (err) {
      throw err;
    }
    res.status(200).json(undefined);
    db.close();
  });
}

PeopleController.prototype = {
  get: get,
  put: put,
  delete: remove
};

var peopleController = new PeopleController();

module.exports = peopleController;
