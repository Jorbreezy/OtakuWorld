const db = require('../db/db');

const mangaController = {
  getAllByUser: (req, res, next) => {
    const query = 'SELECT manga.*, status.status AS status, type.type AS type FROM manga LEFT JOIN status ON manga.status = status._id LEFT JOIN type ON manga.type = type._id WHERE user_id = $1';
    const { user } = res.locals;

    // eslint-disable-next-line no-underscore-dangle
    db.query(query, [user.id], (err, data) => {
      if (err) return next(err);

      res.locals.manga = data.rows;

      return next();
    });
  },
  addOne: (req, res, next) => {
    const query = 'INSERT INTO manga (title, description, chapters, author, type, status, thumbnail, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const { user } = res.locals;
    const {
      title,
      description,
      chapters,
      author,
      type,
      status,
      thumbnail,
    } = req.body;

    // eslint-disable-next-line no-underscore-dangle
    const qarr = [title, description, chapters, author, type, status, thumbnail, user.id];
    db.query(query, qarr, (err) => {
      if (err) return next(err);

      return next();
    });
  },
  getAll: (req, res, next) => {
    const query = 'SELECT manga.*, status.status AS status, type.type AS type FROM manga LEFT JOIN status ON manga.status = status._id LEFT JOIN type ON manga.type = type._id ORDER BY manga._id';

    db.query(query, (err, data) => {
      if (err) return next(err);

      res.locals.allManga = data.rows;

      return next();
    });
  },
};

/*
  CREATE TABLE manga(
  _id serial PRIMARY KEY,
  title VARCHAR (50) UNIQUE NOT NULL,
  description TEXT,
  chapters INTEGER NOT NULL DEFAULT 0,
  status INTEGER NOT NULL,
  thumbnail VARCHAR NOT NULL,
  author VARCHAR(128),
  type INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (_id),
  FOREIGN KEY (status) REFERENCES status (_id),
  FOREIGN KEY (type) REFERENCes type(_id)
)

CREATE TABLE type (
  _id serial PRIMARY KEY,
  type VARCHAR(16)
)

CREATE TABLE type_join (
  _id serial PRIMARY KEY,
  manga_id INTEGER NOT NULL,
  type_id INTEGER NOT NULL,
  FOREIGN KEY (manga_id) REFERENCES manga (_id)
  FOREIGN KEY (type_id)  REFERENCES type (_id)
)

CREATE TABLE manga_genre (
    _id serial PRIMARY KEY,
    manga_id INTEGER NOT NULL,
    genre_id INTEGER NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga (_id)
    FOREIGN KEY (genre_id)  REFERENCES genre (_id)
)

*/

module.exports = mangaController;
