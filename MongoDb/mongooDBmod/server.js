var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mongooDBmod');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({ secret: 'codingdojorocks', resave: true,
saveUninitialized: true}));

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');


require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function () {
    console.log("listening on port 8000");
});
