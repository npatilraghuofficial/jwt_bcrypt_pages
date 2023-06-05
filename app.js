const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());


app.use(express.json());
const PORT = process.env.PORT || 3000;

const DB = process.env.DATABASE;
console.log(DB);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(require('./router/auth'));

app.listen(PORT, () => {
  console.log(`server is on port no ${PORT}`)

})
