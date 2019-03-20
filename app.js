require('./config/config');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var handlebars = require('express-handlebars');
var https = require('https');
var fs = require('fs');
var cors = require('cors');

var homeRouter = require('./routes/home');
var ambientes = require('./routes/ambientes');
var auth = require('./routes/auth');

// view engine handlebars
app.engine('hbs', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

// Habilita cors
app.use(cors());

app.use(require('./config/log4js'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/ambientes/v1', ambientes);
app.use('/auth/v1', auth);

https.createServer({
  key: fs.readFileSync(path.join(__dirname, './cert/10_51_58_240.key')),
  cert: fs.readFileSync(path.join(__dirname, './cert/10_51_58_240.crt'))
}, app).listen(process.env.PORT);

module.exports = app;
