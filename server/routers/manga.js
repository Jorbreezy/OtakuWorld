const express = require('express');
const { addOne, getAll } = require('../controllers/manga.contoller.js');
const { verify } = require('../controllers/authenticate.controller.js');

const router = express.Router();

// Get Route
router.get('/all', verify, getAll, (req, res) => res.status(200).json(res.locals.manga));

// Add Route
router.post('/add', verify, addOne, (req, res) => res.status(200).send({ message: 'Added successfully' }));

module.exports = router;
