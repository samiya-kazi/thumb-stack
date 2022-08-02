const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const PORT = parseInt(process.env.PORT) || 3001;
const maxAge = parseInt(process.env.MAX_AGE) || 3600000;
const secret = process.env.SESSION_SECRET || 'secret123';

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsConfig));

app.use(session({
  path: '/',
  secret: secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: maxAge
  }
}));

app.use(express.json());
app.use(router);

(async function bootstrap() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/thumb-stack');
    console.log('Connected to Mongoose.')
    app.listen(PORT, () => {
      console.log(`Express server listening on port ${PORT}.`);
    });
  } catch (error) {
    console.log(error);
  }
})();
