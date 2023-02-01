require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { createUser, login } = require('./controllers/users');
const { handlerErr } = require('./middlewares/handlerErr');
const {
  signInValidation,
  signUpValidation,
} = require('./middlewares/validation');

const { PORT, DB_CONNECT } = process.env;
const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect(DB_CONNECT);

app.use(express.json());

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);
app.use(routes); // Общий роут

app.use(handlerErr);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
