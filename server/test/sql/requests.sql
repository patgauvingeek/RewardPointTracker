SELECT people.id, people.name,
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
LEFT JOIN categories ON categories.id = category_id
ORDER BY people.name;