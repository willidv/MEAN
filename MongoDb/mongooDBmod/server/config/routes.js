var animals = require('../controllers/animalController.js');
var mongoose = require('mongoose');
var Animal = mongoose.model("Animal");

module.exports = function (app) {
    app.get('/', function (req, res) {
        animals.show(req, res);
    })

    app.post('/new', function (req, res) {
        res.render("add")
    })

    app.post('/add', function (req, res) {
        animals.create(req, res)
    })

    app.get('/animals', function (req, res) {
        Animal.find({}, function (er, animals) {
            if (er) {
                console.log("didnt work");
            } else {
                console.log("did work");
            }
            res.render("index", { animals: animals })
        })
    })

    app.get('/:animalId', function (req, res) {
        Animal.findOne({ _id: req.params.animalId }, function (animalError, animal) {
            if (animalError) {
                console.log("fix something");
                res.redirect('/')
            } else {
                console.log("no fixing needed");
                res.render("animal", { animal: animal })
            }
        })
    })

    app.get('/update/:animalId', function (req, res) {
        Animal.findOne({ _id: req.params.animalId }, function (aniError, animal) {
            if (aniError) {
                res.redirect('/')
            } else {
                res.render("change", { animal: animal })
            }
        })
    })

    app.post('/change', function (req, res) {
                animals.update(req, res);
                res.redirect('/');
            })
       
  

    app.get('/delete/:animalId', function (req, res) {
                animals.delete(req, res);
                res.redirect('/');
            })



    app.post('/back', function (req, res) {
        res.redirect('/');
    })
}