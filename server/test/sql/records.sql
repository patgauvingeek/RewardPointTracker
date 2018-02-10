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
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-01-29 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-01-30 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-01-31 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-01-28 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-01 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-02 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-03 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-04 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-05 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-06 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-07 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-08 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-09 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (1, "2018-02-10 05:00:00");

INSERT INTO people (name, sex, category_id) VALUES ("Josée", 1, 1);
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-01-28 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-01-29 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-01-30 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-01 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-02 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-03 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-04 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-06 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-07 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-09 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (2, "2018-02-10 05:00:00");

INSERT INTO people (name, sex, category_id) VALUES ("Mathéo", 0, 1);
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-01-28 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-01-29 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-01-30 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-01 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-02 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-03 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-04 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-06 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-07 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-09 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (3, "2018-02-10 05:00:00");

INSERT INTO people (name, sex, category_id) VALUES ("Patrick", 0, 2);
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-01 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-16 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-17 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-18 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-19 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-20 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-21 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-22 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-23 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-24 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-25 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-26 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-27 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-28 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-29 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-30 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-01-31 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-01 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-02 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-03 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-04 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-05 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-06 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-07 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-08 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-09 05:00:00");
INSERT INTO rewards (people_id, datetime) VALUES (4, "2018-02-10 05:00:00");

INSERT INTO people (name, sex, category_id) VALUES ("No Body", 0, 3);
INSERT INTO people (name, sex, category_id) VALUES ("DM", 0, 3);
INSERT INTO rewards (people_id) VALUES (6);

END;