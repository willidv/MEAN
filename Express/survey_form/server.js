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
 res.render("index");
})

app.post('/survey', function(req, res){
    req.session.Name = req.body.Name,
    req.session.Language = req.body.Language,
    req.session.Location = req.body.Location,
    req.session.Comments = req.body.Comments
    res.redirect("/result")
})

app.get('/result', function(req, res){
    var results = {
        "Name" : req.session.Name,
        "Language" : req.session.Language,
        "Location" : req.session.Location,
        "Comments" : req.session.Comments
    }
    console.log(results)
    res.render("submission", {"results" : results})
})

app.post('/back', function(req, res){
    req.session.Name;
    req.session.Language;
    req.session.Location;
    req.session.Comments;
    res.redirect('/')
})


app.listen(8000, function() {
    console.log("listening on port 8000");
   });
   