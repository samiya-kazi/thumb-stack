const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

app.use(cors());
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
