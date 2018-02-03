SELECT people.id, people.name,
  CASE WHEN sex = 0 THEN "M" ELSE "F" END AS sex,
  category_id, categories.name AS category,
  CASE WHEN (SELECT COUNT(*)
    FROM rewards
    WHERE people.id = people_id
    GROUP BY people_id) IS NULL THEN 0 
  ELSE (SELECT COUNT(*)
    FROM rewards
    WHERE people.id = people_id
    GROUP BY people_id) END AS points,
  (SELECT CASE WHEN sex = 0 THEN male_title ELSE female_title END AS title
   FROM titles
   WHERE people.category_id = titles.category_id AND
         cost = (SELECT MAX(cost)
                 FROM titles
                 WHERE people.category_id = titles.category_id AND 
                       cost <= CASE WHEN (SELECT COUNT(*)
                                 FROM rewards
                                 WHERE people.id = people_id
                                 GROUP BY people_id) IS NULL 
                               THEN 0 ELSE (SELECT COUNT(*)
                                 FROM rewards
                                 WHERE people.id = people_id
                                 GROUP BY people_id) END
    GROUP BY titles.category_id)) AS title
FROM people
LEFT JOIN categories ON categories.id = category_id
ORDER BY people.name;

SELECT CASE WHEN (SELECT COUNT(*) AS points
                  FROM rewards
                  WHERE people_id = 1
                  GROUP BY people_id) IS NULL
        THEN 0
        ELSE (SELECT COUNT(*)
              FROM rewards
              WHERE people_id = 1
              GROUP BY people_id)
        END AS points;