BEGIN TRANSACTION;
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT);
CREATE TABLE titles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  male_title TEXT,
  female_title TEXT,
  cost INTEGER,
  FOREIGN KEY(category_id) REFERENCES categories(id));
CREATE TABLE people ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  sex INTEGER,
  category_id INTEGER,
  FOREIGN KEY(category_id) REFERENCES categories(id));
CREATE TABLE rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  people_id INTEGER,
  datetime datetime default current_timestamp,
  FOREIGN KEY(people_id) REFERENCES people(id));
COMMIT;