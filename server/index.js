require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const user = require('./routers/user.js');

const app = express();
const { PORT } = process.env;

// Serve Static file
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Parse Incoming body requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Route handlers
app.use('/auth', user);

// Main Get Request, Send html file
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

// Catch all error handler
app.all('*', (req, res) => res.sendStatus(404));

// Global Error Handler
app.use((err, req, res) => {
  console.log(err);
  return res.status(500).send('Error', { error: err });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
