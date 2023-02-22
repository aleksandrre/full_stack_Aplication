import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "movies",
  password: "movidadro021",
  port: 5432,
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res, next) => {
  const movie = req.body;
  const client = await pool.connect();
  const result = await client.query({
    text: `INSERT INTO movies
        (title,genre,director,release_date,cover_image_url)
        VALUES($1,$2,$3,$4,$5) RETURNING id`,

    values: [
      movie.title,
      movie.genre,
      movie.director,
      movie.release_date,
      movie.cover_image_url,
    ],
  });

  const resultObject = {
    id: result.rows[0].id,
    message: `New book with the title ${movie.title} created`,
  };
  console.log(result.rows[0]);

  res.json(resultObject);
});

app.put("/:id", async (req, res, next) => {
  const movie = req.body;
  const id = req.params.id;

  const client = await pool.connect();
  const result = await client.query({
    text: `UPDATE movies
        SET title=$1,genre=$2,director=$3,release_date=$4,cover_image_url=$5
        WHERE id=$6`,
    values: [
      movie.title,
      movie.genre,
      movie.director,
      movie.release_date,
      movie.cover_image_url,
      id,
    ],
  });
  res.json({
    id: id,
    message: `movie with id ${movie.title} has updated`,
  });
});

app.get("/", async (req, res, next) => {
  const client = await pool.connect();
  const result = await client.query({
    text: "SELECT * FROM movies ORDER BY id DESC;",
  });
  res.json(result.rows);
});

app.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  const client = await pool.connect();
  const result = await client.query({
    text: `DELETE FROM movies
      WHERE id=$1;`,
    values: [id],
  });

  if (result.rowCount === 0) {
    res
      .status(400)
      .send(
        `No movie with id ${id} deleted.There is no record in the database`
      );
  } else {
    res.send(`movie with the id ${id} deleted from the database`);
  }
});

app.listen(4001, () => {
  console.log("Started sercer on port 4001");
});
