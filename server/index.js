const express = require('express');
const path = require('path');
const user = require('./routers/user');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Serve Static file
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Parse Incoming body requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use('/auth', user);

// Main Get Request, Send html file
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

// Catch all error handler
app.all('*', (req, res) => res.status(404).send('Page not found'));

// Global Error Handler
app.use((err, req, res) => res.status(400).send(err));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
