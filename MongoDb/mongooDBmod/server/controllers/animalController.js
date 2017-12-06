var mongoose = require('mongoose');
var Animal = mongoose.model("Animal");

module.exports= {
    show: function(req,res){
        Animal.find({}, function (error, animals) {
            if (error) {
                console.log("not working");
            } else {
                console.log("Success");
            }
            res.render('index', { animals: animals });
        })
    },

    create: function(req,res){
        var animalInstance = new Animal();
        animalInstance.type = req.body.Type;
        animalInstance.name = req.body.Name
        animalInstance.save(function (err) {
            if (err) {
                console.log("failed");
                res.redirect('/')
            } else {
                console.log("workedid");
                res.redirect('/animals')
            }
        })
    },

    update: function(req, res){
        Animal.findOne({ _id: req.body.thisanimal }, function (malError, animal) {
            if (malError) {
                console.log("you have some splaining to do");
            } else {
                console.log("I love Lucy");
                animal.type = req.body.Type;
                animal.name = req.body.Name
                animal.save(function (error) {
                    if (error) {
                        console.log("something went wrong")
                    } else {
                        console.log("yippie")
                    }
                })
            }
        })
    },


    delete: function(req, res){
        Animal.findOne({ _id: req.params.animalId }, function (aniError, animal) {
            if (aniError) {
                console.log("work must be done")
            } else {
                animal.remove()
            }
        })
    },
}
