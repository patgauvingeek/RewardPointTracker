var sqlite3 = require('sqlite3').verbose();
  
function CategoriesController() {
}

function query(req, res, db, id)
{
  var sql = "SELECT * FROM categories";
  if (id === undefined) {
    sql += ";"
    db.queryMethod = db.all;
  } else {
    sql += " WHERE id = " + id + ";";
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

//
// Get all
//
function get(req, res) {
  var db = new sqlite3.Database('./people.db');
  query(req, res, db);
}

function put(req, res) {
  var db = new sqlite3.Database('./people.db');
  if (req.params.id === undefined)
  {
    //
    // insert
    //
    db.run("INSERT INTO categories (name) VALUES(?);", [req.body.name], function(err) {
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
  db.run("UPDATE categories SET name = ? WHERE id = ?;", [req.body.name, req.params.id], function(err) {
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
  db.run("DELETE FROM categories WHERE id = ?;", [req.params.id], function(err) {
    if (err) {
      throw err;
    }
    res.status(200).json(undefined);
    db.close();
  });
}

CategoriesController.prototype = {
  get: get,
  put: put,
  delete: remove
};

var categoriesController = new CategoriesController();

module.exports = categoriesController;
