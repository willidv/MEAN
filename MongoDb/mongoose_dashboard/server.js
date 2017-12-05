var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mongoose_dashboard');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({ secret: 'codingdojorocks' }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var AnimalSchema = new mongoose.Schema({
    type : {type: String, required: true},
    name : {type: String, required: true}
});
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model("Animal")

app.get('/', function (req, res) {
    Animal.find({}, function(error, animals){
        if(error){
            console.log("not working");
        }else{
            console.log("Success");
        }
        res.render('index', {animals : animals});
    })  
})

app.post('/new', function(req,res){
    res.render("add")
})

app.post('/add', function(req,res){
    var animalInstance = new Animal();
    animalInstance.type = req.body.Type;
    animalInstance.name = req.body.Name
    animalInstance.save(function (err){
        if(err){
            console.log("failed");
            res.redirect('/')
        }else{
            console.log("workedid");
            res.redirect('/animals')
        }
    })
})

app.get('/animals', function(req,res){
    Animal.find({}, function(er, animals){
        if(er){
            console.log("didnt work");
        }else{
            console.log("did work");
        }
        res.render("index", {animals: animals})
    })
})

app.get('/:animalId', function(req,res){
    Animal.findOne({_id : req.params.animalId}, function(animalError, animal){
        if(animalError){
            console.log("fix something");
            res.redirect('/')
        }else{
            console.log("no fixing needed");
            res.render("animal", {animal : animal})
        }
    })
})

app.get('/update/:animalId', function(req,res){
    Animal.findOne({_id: req.params.animalId}, function(aniError, animal){
        if(aniError){
            console.log("debug")
            res.redirect('/')
        }else{
            console.log("debugged");
            res.render("change", {animal : animal})
        }
    })
})

app.post('/change', function(req,res){
    Animal.findOne({_id: req.body.thisanimal}, function(malError, animal){
        if(malError){
            console.log("you have some splaining to do");
        }else{
            console.log("I love Lucy");
           animal.type = req.body.Type;
           animal.name = req.body.Name
           animal.save(function(error){
               if(error){
                   console.log("something went wrong")
               }else{
                    console.log("yippie")
               }
               res.redirect('/')
           })
        }
    })
})

app.get('/delete/:animalId', function(req,res){
    Animal.findOne({_id: req.params.animalId}, function(aniError, animal){
        if(aniError){
            console.log("work must be done")
            res.redirect('/')
        }else{
            animal.remove()
            res.redirect("/")
        }
    })
})

app.post('/back', function(req,res){
    res.redirect('/');
})




app.listen(8000, function () {
    console.log("listening on port 8000");
});
