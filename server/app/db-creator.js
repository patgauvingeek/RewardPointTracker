function DbCreator() {
}

migrations = [
  "./app/migrations/initial.sql"
];

function applyMigrationFrom(db, index)
{
  if (index >= migrations.length)
  {
    db.close();
    return;
  }
  var fs = require('fs');
  console.log("Applying migration #" + index);
  fs.readFile(migrations[index], 'utf8', function(err, content) { 
    if (err)
      return console.error(err.message);
    db.exec(content, err => {
      if (err)
        return console.error(err.message);
      console.log("Done.")
      var nextIndex = index + 1;
      db.run("PRAGMA user_version = " + nextIndex + ";", err => {
        if (err)
          return console.error(err.message);
        applyMigrationFrom(db, nextIndex);
      });
    });
  });
}

function createIfNotExist() {
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('./people.db');
  
  db.serialize(function() {
    db.get("PRAGMA user_version;", (err, row) => {
      if (err)
        return console.error(err.message)
      applyMigrationFrom(db, row.user_version);
    });
  });
}

DbCreator.prototype = {
  createIfNotExist: createIfNotExist
};

var DbCreator = new DbCreator();

module.exports = DbCreator;
