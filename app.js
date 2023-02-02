require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');

const { handlerErr } = require('./middlewares/handlerErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_CONNECT } = process.env;
const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect(DB_CONNECT);

app.use(requestLogger);

app.use(express.json());

app.use(routes); // Общий роут

app.use(errorLogger);
app.use(errors());
app.use(handlerErr);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
