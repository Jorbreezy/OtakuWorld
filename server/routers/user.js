const express = require('express');
const {
  getAllByUser,
  updateChapter,
  favorite,
  unfavorite,
  addOne,
} = require('../controllers/manga.controller');

const router = express.Router();

// Add Route
router.post('/add', addOne, (req, res) => res.status(200).send({ message: 'Added successfully' }));

// Favorite manga
router.get('/favorite', getAllByUser, (req, res) => res.status(200).json(res.locals.allManga));

// Favorite manga
router.post('/favorite', favorite, (req, res) => res.status(200).send({ message: 'Favorited successfully' }));

// Unfavorite manga
router.post('/unfavorite', unfavorite, (req, res) => res.status(200).send({ message: 'Unfavorited successfully' }));

// Update CurrentChapter
router.patch('/:id', updateChapter, (req, res) => res.status(200).send('Updated Successfully'));

module.exports = router;
