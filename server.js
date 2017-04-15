var express = require('express');
var app = express();
var app2 = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: false }));
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app2.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));


app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());



app2.use(cookieParser());
app2.use(session({ secret: process.env.SESSION_SECRET }));
app2.use(passport.initialize());
app2.use(passport.session());


var LocalStrategy = require('passport-local').Strategy;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app2.set('view engine', 'ejs');
app2.use(express.static(__dirname + '/public'));


require ("./test/app.js")(app);
require("./todo/app")(app);
require("./blog/app")(app);
require('./experiments/upload/app')(app);




// require('./experiments/mongoose/app')(app);
// require("./assignment-wed/app.js")(app);
//require("./lectures/mongo/movies")(app);
// require('./lectures-wed/mongo/movies')(app);
require('./experiments/mongoose/projects/app')(app);
require('./experiments/mongoose/projects/app')(app2);
var assignment = require("./assignment/app.js");
assignment(app);
var project = require("./project/app.js");
project(app2);
var port = process.env.PORT || 3000;
app.listen(port);
app2.listen(3001);

