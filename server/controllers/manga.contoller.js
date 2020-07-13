const db = require('../db/db');

const mangaController = {
  getAll: (req, res, next) => {
    const query = 'Select * from manga WHERE _id=$1';
    const { user } = req.locals;

    // eslint-disable-next-line no-underscore-dangle
    db.query(query, [user._id], (err, data) => {
      if (err) return next(err);

      res.locals.data = data.rows;

      return next();
    });
  },
  addOne: (req, res, next) => {
    const query = 'INSERT INTO manga (title, genre, chapters, author, type, status, thumbnail) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const {
      title,
      genre,
      chapters,
      author,
      type,
      status,
      thumbnail,
    } = req.body;

    db.query(query, [title, genre, chapters, author, type, status, thumbnail], (err) => {
      if (err) return next(err);

      return next();
    });
  },
};

module.exports = mangaController;
