const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Auth = require('./routes/Auth');
require('dotenv').config();

// static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join((__dirname = 'client/build/index.html')));
  });
}

app.use(bodyParser.json());

// build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.use('/auth', Auth);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}!`);
    });
  });
