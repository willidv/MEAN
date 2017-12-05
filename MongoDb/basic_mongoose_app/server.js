var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/basic_mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'})); 

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.get('/', function(req,res){
    User.find({}, function(err, users){
        if(err){
            console.log("not working")
            res.render('index', {users: users});
        } else {
            res.render('index', {users: users});
        }
    })
});

app.post('/users', function(req,res){
    var userInstance = new User();
    userInstance.name = req.body.Name,
    userInstance.age = req.body.Age
    userInstance.save(function(err){
        if(err){
            console.log("failed");
        }else{
            console.log("success");
        }
        res.redirect('/');
    })  
})


app.listen(8000, function() {
    console.log("listening on port 8000");
   });
   