const express = require('express');
const { login, register, signOut } = require('../controllers/auth.controller.js');

const router = express.Router();

// Login Route
router.post('/login', login, (req, res) => res.sendStatus(200));

// Register Route
router.post('/register', register, (req, res) => res.sendStatus(200));

// SignOut
router.post('/signOut', signOut, (req, res) => res.sendStatus(200));

module.exports = router;
