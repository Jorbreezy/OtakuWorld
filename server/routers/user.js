const express = require('express');
const { login, register } = require('../controllers/user.controller.js');
const { verify } = require('../controllers/authenticate.controller.js');

const router = express.Router();

// Test Route
router.get('/test', verify, (req, res) => res.status(200).send('Reached!'));

// Login Route
router.post('/login', login, (req, res) => res.sendStatus(200));

// Register Route
router.post('/register', register, (req, res) => res.status(200).send({ message: 'Signup successfully' }));

module.exports = router;
