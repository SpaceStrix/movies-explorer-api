require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');

const { limiter } = require('./middlewares/rate-limiter');
const { handlerErr } = require('./middlewares/handlerErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_CONNECT } = process.env;
const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect(DB_CONNECT);

app.use(limiter);
app.use(requestLogger);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(routes); // Общий роут

app.use(errorLogger);
app.use(errors());
app.use(handlerErr);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
