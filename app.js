require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT, DB_CONNECT } = process.env;
const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect(DB_CONNECT);

app.use(express.json());

app.use(routes); // Общий роут

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
