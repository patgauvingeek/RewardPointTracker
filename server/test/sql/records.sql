BEGIN;

INSERT INTO categories (name) VALUES("Royauté");

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (1, "Paysan", "Paysanne", 0);

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (1, "Écuyer", "Écuyère", 6);

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (1, "Grand Écuyer", "Grande Écuyère", 12);

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (1, "Chevalier", "Chevalière", 18);

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (1, "Baron", "Baronne", 24);

INSERT INTO categories (name) VALUES("Star Wars");

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (2, "Fermier", "Fermière", 0);

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (2, "Padawan", "Padawanne", 6);

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (2, "Jedi", "Jedi", 12);

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (2, "Chevalier Jedi", "Chevalière Jedi", 18);

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (2, "Maître Jedi", "Maîtresse Jedi", 24);

INSERT INTO categories (name) VALUES("Donjon");

INSERT INTO titles 
  (category_id, male_title, female_title, cost)
VALUES
  (3, "Donjon Master", "Donjon Mistress", 1);

INSERT INTO people (name, sex, category_id) VALUES ("Kathylou", 1, 2);
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-01-28 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-01-29 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-01-30 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-01-31 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-01 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-02 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-03 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-04 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-05 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-06 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-07 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-08 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-09 00:00:00");

INSERT INTO people (name, sex, category_id) VALUES ("Josée", 1, 1);
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-01-28 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-01-29 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-01-30 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-01 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-02 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-03 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-04 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-06 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-07 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-09 00:00:00");

INSERT INTO people (name, sex, category_id) VALUES ("Mathéo", 0, 1);
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-01-28 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-01-29 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-01-30 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-01 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-02 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-03 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-04 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-06 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-07 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-09 00:00:00");

INSERT INTO people (name, sex, category_id) VALUES ("Patrick", 0, 2);
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-01 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-16 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-17 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-18 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-19 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-20 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-21 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-22 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-23 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-24 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-25 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-26 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-27 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-28 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-29 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-30 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-31 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-01 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-02 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-03 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-04 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-05 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-06 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-07 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-08 00:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-09 00:00:00");

INSERT INTO people (name, sex, category_id) VALUES ("No Body", 0, 3);
INSERT INTO people (name, sex, category_id) VALUES ("DM", 0, 3);
INSERT INTO rewards (people_id) VALUES (6);

END;