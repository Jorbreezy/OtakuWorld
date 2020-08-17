const express = require('express');
const { login, register, signOut } = require('../controllers/user.controller.js');

const router = express.Router();

// Login Route
router.post('/login', login, (req, res) => res.sendStatus(200));

// Register Route
router.post('/register', register, (req, res) => res.status(200).send({ message: 'Signup successfully' }));

// SignOut
router.post('/signOut', signOut, (req, res) => res.sendStatus(200));

module.exports = router;
