var sqlite3 = require('sqlite3').verbose();
  
function CategoriesController() {
}

function get(req, res, next) {
  var db = new sqlite3.Database('./people.db');
  let sql = `SELECT * FROM categories
             ORDER BY name`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json(rows);
    db.close();
  });  
}

function put(req, res, next) {
  var db = new sqlite3.Database('./people.db');
  if (req.params.id === undefined)
  {
    // insert one row into the langs table
    db.run("INSERT INTO categories (name) VALUES(?);", [req.body.name], function(err, rows) {
      if (err) {
        throw err;
      }
      db.get("SELECT * FROM categories WHERE id = (select last_insert_rowid());", function(err, row) {
        if (err) {
          throw err;
        }
        res.status(200).json(row);
      });
      
    });
    return;  
  }
  db.run("UPDATE categories SET name = ? WHERE id = ?;", [req.body.name, req.params.id], function(err, rows) {
    if (err) {
      throw err;
    }
    db.get("SELECT * FROM categories WHERE id = ?;", [req.params.id], function(err, row) {
      if (err) {
        throw err;
      }
      res.status(200).json(row);
    });
  });
}

CategoriesController.prototype = {
  get: get,
  put: put
};

var categoriesController = new CategoriesController();

module.exports = categoriesController;
