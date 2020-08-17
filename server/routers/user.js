const express = require('express');
const { getAllByUser, updateChapter } = require('../controllers/manga.controller');

const router = express.Router();

// Favorite manga
router.get('/favorite', getAllByUser, (req, res) => res.status(200).json(res.locals.manga));

// Update CurrentChapter
router.patch('/:id', updateChapter, (req, res) => res.status(200).send('Updated Successfully'));

module.exports = router;
