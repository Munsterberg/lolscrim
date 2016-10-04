import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import logger from './util/logger';
import db from './db';
import {auth as authConfig} from './config';

import sampleRouter from './api/index';
import userRouter from './api/user';

// Setup auth
require('./auth');

const app = express();

app.use(morgan('combined', {stream: logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cookieParser());
app.use(session({
  secret: authConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true},
}));
app.use(passport.initialize());
app.use(passport.session());

// Sync database
db.sequelize.sync().then(() => {
  logger.info('Database synced!');
});

app.use('/api', sampleRouter);
app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Hola');
});

// Error handling for app
app.use((err, req, res, next) => {
  logger.error('unhandled application error: ', err);
  res.status(500).send(err);
});

export default app;
