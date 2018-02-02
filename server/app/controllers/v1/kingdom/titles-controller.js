var sqlite3 = require('sqlite3').verbose();

function TitlesController() {
}

function query(req, res, db, id)
{
  var sql =  `SELECT titles.id, category_id, categories.name AS category,
                male_title, female_title, cost
              FROM titles
              LEFT JOIN categories on categories.id = titles.category_id`;
  if (id === undefined) {
    sql += ` ORDER BY category, cost;`;
    db.queryMethod = db.all;
  } else {
    sql += " WHERE titles.id = " + id + ";";
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

  let sql_param = [
    req.body.category_id, 
    req.body.male_title, req.body.female_title,
    req.body.cost
  ]
  if (req.params.id === undefined)
  {
    //
    // insert
    //
    let sql_insert = `INSERT INTO titles 
                        (category_id, male_title, female_title, cost)
                      VALUES
                        (?, ?, ?, ?);`;
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
  var sql_update = `UPDATE titles 
                    SET category_id = ?, male_title = ?, female_title = ?, cost = ?
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
  db.run("DELETE FROM titles WHERE id = ?;", [req.params.id], function(err) {
    if (err) {
      throw err;
    }
    res.status(200).json(undefined);
    db.close();
  });
}

TitlesController.prototype = {
  get: get,
  put: put,
  delete: remove
};

var titlesController = new TitlesController();

module.exports = titlesController;
