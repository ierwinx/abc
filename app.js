require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const homeRouter = require('./routes/home');
const ambientes = require('./routes/ambientes');
const auth = require('./routes/auth');

app.engine('hbs', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use(cors());

app.use(require('./config/log4js'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/ambientes/v1', ambientes);
app.use('/auth/v1', auth);

//app.listen(process.env.PORT);

https.createServer({
  key: fs.readFileSync(path.join(__dirname, './cert/10_51_58_240.key')),
  cert: fs.readFileSync(path.join(__dirname, './cert/10_51_58_240.crt')),
  passphrase: process.env.contraSSL
}, app).listen(process.env.PORT);

module.exports = app;
