'use strict';

const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  compression = require('compression'),
  mongoose = require('mongoose'),
  expressValidator = require('express-validator'),
  config = require('config'),
  logger = require('./lib/tools/logger'),
  utils = require('./lib/utils/utils')

//Connect to MongoDB instance
mongoose.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
  logger.info('MongoDB Instance Connected');
});

db.on('disconnected', async () => {
  logger.warn('********* MONGODB DISCONNECTED *********');
});

const app = express();

//Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set all middleware
app.use(compression());
app.use(morgan(config.morgan, { skip: (req, res) => res.statusCode < 400, stream: process.stderr }));
app.use(morgan(config.morgan, { skip: (req, res) => res.statusCode >= 400, stream: process.stdout }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  if (req.app.get('env') !== 'production' && ['POST', 'PATCH', 'PUT'].includes(req.method))
    logger.verbose('Body', JSON.stringify(req.body));
  next();
});

//Import Routes
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');


//Use Routes
app.use('/', indexRouter);
app.use('/user', userRouter);


//Catch 404 and fwd to error handler
app.use(function (req, res, next) {
  const err = utils.createError('1000', 404);
  delete err.stack;
  next(err);
});

//Error handler
app.use(function (err, req, res, next) {
  logger.warn({ message: err.message, name: err.name, code: err.errorCode, stack: err.stack });
  res.locals.error = {
    errorCode: err.errorCode, message: err.isObject === true ? JSON.parse(err.message) : err.message
  };
  res.status(err.status || 500).send({ error: res.locals.error });
});

process.on('unhandledRejection', (err) => {
  logger.error({ message: err.message, name: err.name, stack: err.stack });
  logger.error('\n-----------------------EXITING PROCESS-----------------------\n');
  process.exit(1);
});

module.exports = app;