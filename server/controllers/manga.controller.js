const knexDb = require('../db/knexDb');

exports.getAllByUser = async (req, res, next) => {
  const {
    genre, type, title, status,
  } = req.query;

  const { user } = res.locals;

  if (!user) return res.sendStatus(401);

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
    .then(async (data) => {
      const [id] = data;

      const insertGenre = genres.split(',').map((value) => ({ manga_id: id, genre_id: parseInt(value, 10) }));

      await knexDb('manga_genre')
        .insert(insertGenre)
        .catch((err) => { throw err; });

      await knexDb('user_manga')
        .insert({ manga_id: id, user_id: user.id })
        .catch((err) => { throw err; });
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

exports.favorite = async (req, res, next) => {
  const { mangaId } = req.body;
  const { user } = res.locals;

  await knexDb('user_manga')
    .insert({ manga_id: mangaId, user_id: user.id })
    .catch((err) => { throw err; });

  return next();
};

exports.unfavorite = async (req, res, next) => {
  const { mangaId } = req.body;
  const { user } = res.locals;

  await knexDb('user_manga')
    .del()
    .where({ manga_id: mangaId, user_id: user.id })
    .catch((err) => { throw err; });

  return next();
};

exports.updateChapter = async (req, res, next) => {
  const { currentChapter } = req.body;
  const { id } = req.params;
  const { user } = res.locals;

  await knexDb('user_manga')
    .update('current_chapter', currentChapter)
    .where({ manga_id: id, user_id: user.id })
    .catch((err) => { throw err; });

  return next();
};

exports.rate = async (req, res, next) => {
  const { id, rating } = req.body;
  const { user } = res.locals;

  await knexDb('rating')
    .insert({ manga_id: id, user_id: user.id, rating })
    .catch((err) => { throw err; });

  return next();
};
