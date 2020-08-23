const knexDb = require('../db/knexDb');

exports.getAllByUser = async (req, res, next) => {
  const {
    genre, type, title, status,
  } = req.query;

  const { user } = res.locals;

  const mangaQuery = knexDb
    .select('manga.*', 'status.status AS status', 'type.type As type', 'g.genre AS genres', 'user_manga.current_chapter AS current_chapter', 'user_manga.user_id')
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

  const mangas = await mangaQuery;

  res.locals.allManga = mangas.map((manga) => ({ ...manga, genres: manga.genres.split(',') }));

  res.locals.manga = await mangaQuery;

  return next();
};

exports.getOneById = async (req, res, next) => {
  const { id } = req.params;
  const { user } = res.locals;

  const mangaQuery = knexDb
    .from('manga')
    .select('manga.*', 'status.status AS status', 'type.type As type', 'g.genre AS genre', 'r.rating AS rating');

  if (user) {
    mangaQuery.select(knexDb.raw('user_manga.user_id = ? as is_favorite, user_manga.current_chapter', user.id))
      .leftJoin('user_manga', 'manga.id', 'user_manga.manga_id')
      .orderByRaw('case when user_manga.user_id = ? then 0 else 1 end', user.id);
  }

  mangaQuery.leftJoin('status', 'manga.status', 'status.id')
    .leftJoin('type', 'manga.type', 'type.id')
    .leftJoin(knexDb
      .select(knexDb.raw('avg(rating.rating) as rating'), 'rating.manga_id')
      .from('rating')
      .as('r')
      .groupBy('rating.manga_id'),
    'manga.id',
    'r.manga_id')
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

  const manga = await mangaQuery;

  res.locals.getOne = {
    ...manga,
    genres: manga.genre.split(','),
  };

  return next();
};

exports.addOne = async (req, res, next) => {
  const { user } = res.locals;

  const {
    title,
    description,
    chapters,
    author,
    type,
    status,
    thumbnail,
    genres,
  } = req.body;

  await knexDb('manga')
    .insert({
      title, description, chapters, author, type, status, thumbnail,
    })
    .returning('id')
    .then((data) => {
      const id = data[0];

      const insertGenre = genres.split(',').map((value) => ({ manga_id: id, genre_id: parseInt(value, 10) }));

      knexDb('manga_genre')
        .insert(insertGenre)
        .then(() => {})
        .catch((err) => next(err));

      knexDb('user_manga')
        .insert({ manga_id: id, user_id: user.id })
        .then(() => {})
        .catch((err) => next(err));
    })
    .catch((err) => next(err));

  return next();
};

exports.getAll = async (req, res, next) => {
  const {
    genre, type, title, status,
  } = req.query;

  const mangaQuery = knexDb
    .select('manga.*', 'status.status AS status', 'type.type As type', 'g.genre AS genres')
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
  const mangas = await mangaQuery;

  res.locals.allManga = mangas.map((manga) => ({ ...manga, genres: manga.genres.split(',') }));

  return next();
};

exports.getGenre = async (req, res, next) => {
  const genreQuery = knexDb
    .select('*')
    .from('genre');

  res.locals.genre = await genreQuery;

  return next();
};

exports.favorite = (req, res, next) => {
  const { mangaId } = req.body;
  const { user } = res.locals;

  knexDb('user_manga')
    .insert({ manga_id: mangaId, user_id: user.id })
    .then(() => {})
    .catch((err) => next(err));

  return next();
};

exports.unfavorite = (req, res, next) => {
  const { mangaId } = req.body;
  const { user } = res.locals;

  knexDb('user_manga')
    .del()
    .where({ manga_id: mangaId, user_id: user.id })
    .then(() => {})
    .catch((err) => next(err));

  return next();
};

exports.updateChapter = (req, res, next) => {
  const { currentChapter } = req.body;
  const { id } = req.params;
  const { user } = res.locals;

  knexDb('user_manga')
    .update('current_chapter', currentChapter)
    .where({ manga_id: id, user_id: user.id })
    .then(() => {})
    .catch((err) => next(err));

  return next();
};

exports.rate = (req, res, next) => {
  const { id, rating } = req.body;
  const { user } = res.locals;

  knexDb('rating')
    .insert({ manga_id: id, user_id: user.id, rating })
    .then(() => {})
    .catch((err) => next(err));

  return next();
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

CREATE TABLE rating (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL,
  manga_id INTEGER NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (manga_id) REFERENCES manga (id)
)

*/
