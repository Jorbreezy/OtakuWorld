require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth = require('./routers/auth.js');
const user = require('./routers/user.js');
const manga = require('./routers/manga.js');
const { decodeUser, verifyUser } = require('./controllers/authenticate.controller.js');

const app = express();
const { PORT } = process.env;

// Serve Static file
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Parse Incoming body requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.get('*', decodeUser);
app.patch('*', decodeUser);
app.post(/^(?!.*?auth).*/, decodeUser, verifyUser);

// Route handlers
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/manga', manga);

// Main Get Request, Send html file
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

// Global Error Handler
app.use((err, req, res) => {
  console.error(err);
  return res.status(500).send('Error', { error: err });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
