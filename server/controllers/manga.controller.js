const db = require('../db/db');
const knexDb = require('../db/knexDb');

const mangaController = {
  getAllByUser: async (req, res, next) => {
    const {
      genre, type, title, status,
    } = req.query;

    const { user } = res.locals;

    const mangaQuery = knexDb
      .select('manga.*', 'status.status AS status', 'type.type As type', 'g.genre AS genre', 'user_manga.current_chapter AS current_chapter', 'user_manga.user_id')
      .from('manga')
      .leftJoin('status', 'manga.status', 'status.id')
      .leftJoin('user_manga', 'manga.id', 'user_manga.manga_id')
      .leftJoin('type', 'manga.type', 'type.id')
      .leftJoin(knexDb
        .select(knexDb.raw('string_agg(genre.genre, \',\') AS genre'), 'manga_genre.manga_id')
        .from('genre')
        .innerJoin('manga_genre', 'genre.id', 'manga_genre.genre_id')
        .groupBy('manga_genre.manga_id')
        .as('g'),
      'manga.id',
      'g.manga_id')
      .where('user_manga.user_id', user.id);

    if (genre) {
      const genres = Array.isArray(genre) ? genre : [genre];

      const genreSubQuery = knexDb
        .select('manga_genre.manga_id as manga_id')
        .from('manga_genre')
        .leftJoin('genre', 'manga_genre.genre_id', 'genre.id')
        .groupBy('manga_genre.manga_id')
        .having(knexDb.raw('count(manga_genre.manga_id)'), '=', genres.length)
        .whereIn('genre.genre', genres);

      mangaQuery.whereIn('manga.id', genreSubQuery);
    }

    if (type) {
      mangaQuery.where('type.type', 'ilike', `%${type}%`);
    }

    if (status) {
      mangaQuery.where('status.status', 'ilike', `%${status}%`);
    }

    if (title) {
      mangaQuery.where('title', 'ilike', `%${title}%`);
    }

    mangaQuery.orderBy('manga.id');

    res.locals.manga = await mangaQuery;

    return next();
  },
  getOneById: async (req, res, next) => {
    const { id } = req.params;
    const { user } = res.locals;

    const mangaQuery = knexDb
      .from('manga')
      .select('manga.*', 'status.status AS status', 'type.type As type', 'g.genre AS genre');

    if (user) {
      mangaQuery.select(knexDb.raw('user_manga.user_id = ? as is_favorite, user_manga.current_chapter', user.id))
        .leftJoin('user_manga', 'manga.id', 'user_manga.manga_id')
        .orderByRaw('case when user_manga.user_id = ? then 0 else 1 end', user.id);
    }

    mangaQuery.leftJoin('status', 'manga.status', 'status.id')
      .leftJoin('type', 'manga.type', 'type.id')
      .leftJoin(knexDb
        .select(knexDb.raw('string_agg(genre.genre, \',\') AS genre'), 'manga_genre.manga_id')
        .from('genre')
        .innerJoin('manga_genre', 'genre.id', 'manga_genre.genre_id')
        .groupBy('manga_genre.manga_id')
        .as('g'),
      'manga.id',
      'g.manga_id')
      .where('manga.id', id)
      .first();

    res.locals.getOne = await mangaQuery;

    return next();
  },
  addOne: (req, res, next) => {
    const query = 'INSERT INTO manga (title, description, chapters, author, type, status, thumbnail) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';

    const { user } = res.locals;

    console.log(user);
    const {
      title,
      description,
      chapters,
      author,
      type,
      status,
      thumbnail,
      genre,
    } = req.body;

    // eslint-disable-next-line no-underscore-dangle
    const qarr = [title, description, chapters, author, type, status, thumbnail];
    db.query(query, qarr, (err, data) => {
      if (err) return next(err);

      // eslint-disable-next-line no-underscore-dangle
      const newData = data.rows[0].id;

      let beginQ = 'INSERT INTO manga_genre(manga_id, genre_id) VALUES';

      const query2 = genre.split(',').map((val, idx) => `($1, $${idx + 2}),`).join(' ');

      const parseGenre = genre.split(',').map((val) => parseInt(val, 10));

      // eslint-disable-next-line no-underscore-dangle
      const qArr = [newData, ...parseGenre];

      beginQ = beginQ.concat(query2).replace(/,$/, '');

      return db.query(beginQ, qArr, (err2) => {
        if (err2) return next(err2);

        return db.query('INSERT INTO user_manga(manga_id, user_id) VALUES ($1, $2)', [newData, user.id], (err3) => {
          if (err3) return next(err3);

          return next();
        });
      });
    });
  },
  // addOne: async (req, res, next) => {
  //   const { user } = res.locals;

  //   const {
  //     title,
  //     description,
  //     chapters,
  //     author,
  //     type,
  //     status,
  //     thumbnail,
  //     genre,
  //   } = req.body;

  //   const insertQuery = await knexDb('manga')
  //     .insert({
  //       title, description, chapters, author, type, status, thumbnail,
  //     })
  //     .returning('id')
  //     .then((data) => {
  //       return knexDb('manga_genre')
  //         .insert({  })
  //     });
  // },
  getAll: async (req, res, next) => {
    const {
      genre, type, title, status,
    } = req.query;

    const mangaQuery = knexDb
      .select('manga.*', 'status.status AS status', 'type.type As type', 'g.genre AS genre')
      .from('manga')
      .leftJoin('status', 'manga.status', 'status.id')
      .leftJoin('type', 'manga.type', 'type.id')
      .leftJoin(knexDb
        .select(knexDb.raw('string_agg(genre.genre, \',\') AS genre'), 'manga_genre.manga_id')
        .from('genre')
        .innerJoin('manga_genre', 'genre.id', 'manga_genre.genre_id')
        .groupBy('manga_genre.manga_id')
        .as('g'),
      'manga.id',
      'g.manga_id');

    if (genre) {
      const genres = Array.isArray(genre) ? genre : [genre];

      const genreSubQuery = knexDb
        .select('manga_genre.manga_id as manga_id')
        .from('manga_genre')
        .leftJoin('genre', 'manga_genre.genre_id', 'genre.id')
        .groupBy('manga_genre.manga_id')
        .having(knexDb.raw('count(manga_genre.manga_id)'), '=', genres.length)
        .whereIn('genre.genre', genres);

      mangaQuery.whereIn('manga.id', genreSubQuery);
    }

    if (type) {
      mangaQuery.where('type.type', 'ilike', `%${type}%`);
    }

    if (status) {
      mangaQuery.where('status.status', 'ilike', `%${status}%`);
    }

    if (title) {
      mangaQuery.where('title', 'ilike', `%${title}%`);
    }

    mangaQuery.orderBy('manga.id');

    res.locals.allManga = await mangaQuery;

    return next();
  },
  getGenre: async (req, res, next) => {
    const genreQuery = knexDb
      .select('*')
      .from('genre');

    res.locals.genre = await genreQuery;

    return next();
  },
  favorite: (req, res, next) => {
    const query = 'INSERT INTO user_manga(manga_id, user_id) VALUES ($1, $2)';

    const { mangaId } = req.body;
    const { user } = res.locals;

    db.query(query, [mangaId, user.id], (err) => {
      if (err) return next(err);

      return next();
    });
  },
  unfavorite: (req, res, next) => {
    const query = 'DELETE FROM user_manga WHERE user_manga.manga_id = $1 AND user_manga.user_id = $2';

    const { mangaId } = req.body;
    const { user } = res.locals;

    db.query(query, [mangaId, user.id], (err) => {
      if (err) return next(err);

      return next();
    });
  },
  updateChapter: (req, res, next) => {
    const query = 'UPDATE user_manga SET current_chapter = $1 WHERE user_manga.manga_id = $2 AND user_manga.user_id = $3';

    const { currentChapter } = req.body;
    const { id: mangaId } = req.params;
    const { user } = res.locals;

    db.query(query, [currentChapter, mangaId, user.id], (err) => {
      if (err) return next(err);

      return next();
    });
  },
};

/*
  CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR (64) UNIQUE NOT NULL,
    password VARCHAR (256) NOT NULL
  );

  CREATE TABLE manga (
  id serial PRIMARY KEY,
  title VARCHAR (250) UNIQUE NOT NULL,
  description TEXT,
  chapters INTEGER NOT NULL,
  thumbnail VARCHAR NOT NULL,
  author VARCHAR(128),
  status INTEGER NOT NULL,
  type INTEGER NOT NULL,
  FOREIGN KEY (status) REFERENCES status (id),
  FOREIGN KEY (type) REFERENCES type(id)
);

CREATE TABLE type (
  id serial PRIMARY KEY,
  type VARCHAR(16)
);

CREATE TABLE genre (
  id serial PRIMARY KEY,
  genre VARCHAR(16) UNIQUE
);

CREATE TABLE status (
  id serial PRIMARY KEY,
  status VARCHAR(16)
);

CREATE TABLE manga_genre (
    id serial PRIMARY KEY,
    manga_id INTEGER NOT NULL,
    genre_id INTEGER NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga (id),
    FOREIGN KEY (genre_id)  REFERENCES genre (id)
);

CREATE table user_manga (
  id serial PRIMARY KEY,
  manga_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  current_chapter INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (manga_id) REFERENCES manga (id)
);

*/

module.exports = mangaController;
