var createError = require('http-errors'),
express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
multer =  require('multer')().single(),
logger = require('morgan'),
mongoose = require('mongoose'),
hbs = require('hbs'),
indexRouter = require('./routes/index'),
usersRouter = require('./routes/user'),
postsRouter = require('./routes/post'),
session = require('express-session');
cors = require('cors');

var app = express();

app.use(cors());
//connect with BD
var mongoDB = 'mongodb://localhost:27017/posttwit';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
  console.log('Mongoose success');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


app.use(bodyParser.json());


// template model
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "chave secreta",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(multer);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
       
// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// error 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3333);
module.exports = app;
