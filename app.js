import express from 'express';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(env.APP_PORT, () => {
  console.log(`Server is running on port ${env.APP_PORT}`);
});
