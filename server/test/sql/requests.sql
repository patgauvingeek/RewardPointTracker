SELECT name,
  (SELECT COUNT(datetime)
   FROM rewards
   WHERE people.id = person_id
   GROUP BY person_id) as points,
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
    GROUP BY titles.category_id)) as title
FROM people
ORDER BY people.id;