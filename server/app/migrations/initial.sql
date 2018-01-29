CREATE TABLE titles (
  id INTEGER PRIMARY KEY,
  title TEXT,
  price INTEGER UNIQUE);

CREATE TABLE people ( 
  id INTEGER PRIMARY KEY,
  name TEXT,
  xp INTEGER,
  title_id INTEGER,
  FOREIGN KEY(title_id) REFERENCES titles(id));
