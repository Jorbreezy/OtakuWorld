const express = require('express');
const { addOne, getAllByUser, getAll } = require('../controllers/manga.contoller.js');
const { verify } = require('../controllers/authenticate.controller.js');

const router = express.Router();

// Get AllByUser
router.get('/allByUser', verify, getAllByUser, (req, res) => res.status(200).json(res.locals.manga));

// Add Route
router.post('/add', verify, addOne, (req, res) => res.status(200).send({ message: 'Added successfully' }));

// Get all route
router.get('/all', verify, getAll, (req, res) => res.status(200).json(res.locals.allManga));

module.exports = router;
