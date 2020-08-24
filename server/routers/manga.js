const express = require('express');
const {
  getAll,
  getGenre,
  getOneById,
  rate,
} = require('../controllers/manga.controller.js');

const router = express.Router();

// Get all route
router.get('/', getAll, (req, res) => res.status(200).json(res.locals.allManga));

// Get genre route
router.get('/genre', getGenre, (req, res) => res.status(200).json(res.locals.genre));

// Get manga by Id
router.get('/:id', getOneById, (req, res) => res.status(200).json(res.locals.getOne));

// Rate a Manga
router.post('/rate', rate, (req, res) => res.status(200).send({ message: 'rate successfully' }));

module.exports = router;
