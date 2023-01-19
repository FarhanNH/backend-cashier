import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from 'morgan';
import indexRouter from './routes/index.js';

const env = dotenv.config().parsed;

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

//connect to mongodb
mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
  // auth: { authSource: env.MONGODB_AUTH_SOURCE },
  dbName: env.MONGODB_DB_NAME,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.listen(env.APP_PORT, () => {
  console.log(`Server is running on port ${env.APP_PORT}`);
});
