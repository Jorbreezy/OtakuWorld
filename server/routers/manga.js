const express = require('express');
const {
  addOne,
  getAllByUser,
  getAll,
  getGenre,
  favorite,
  unfavorite,
  updateChapter,
  getOneById,
} = require('../controllers/manga.controller.js');

const router = express.Router();

// Get AllByUser
router.get('/allByUser', getAllByUser, (req, res) => res.status(200).json(res.locals.manga));

// Add Route
router.post('/add', addOne, (req, res) => res.status(200).send({ message: 'Added successfully' }));

// Get all route
router.get('/', getAll, (req, res) => res.status(200).json(res.locals.allManga));

// Get genre route
router.get('/genre', getGenre, (req, res) => res.status(200).json(res.locals.genre));

// Favorite manga
router.post('/favorite', favorite, (req, res) => res.status(200).send({ message: 'Favorited successfully' }));

// Unfavorite manga
router.post('/unfavorite', unfavorite, (req, res) => res.status(200).send({ message: 'Unfavorited successfully' }));

// Update CurrentChapter
router.patch('/:id', updateChapter, (req, res) => res.status(200).send('Updated Successfully'));

// Update CurrentChapter
router.get('/:id', getOneById, (req, res) => res.status(200).json(res.locals.getOne));

module.exports = router;
