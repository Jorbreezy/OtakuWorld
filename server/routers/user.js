const express = require('express');
const { login, register } = require('../controllers/user.controller.js');

const router = express.Router();
// Login Route
router.post('/login', login, (req, res) => res.status(200).json({ username: res.locals.username }));

// Register Route
router.post('/register', register, (req, res) => res.status(200).send({ message: 'Signup successfully' }));

module.exports = router;
