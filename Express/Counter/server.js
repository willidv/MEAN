var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'})); 


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    var counter;
    if(!req.session.count){
        req.session.count = 0;
    }
    counter = req.session.count;
    req.session.count ++;
    console.log(counter)
 res.render("index", {"counter" : counter});
})

app.post('/pressed', function(req, res) {
res.redirect('/');
})

app.listen(8000, function() {
 console.log("listening on port 8000");
});
