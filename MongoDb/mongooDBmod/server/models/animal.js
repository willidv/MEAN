var mongoose = require('mongoose');

var AnimalSchema = new mongoose.Schema({
    type : {type: String, required: true},
    name : {type: String, required: true}
});

var Animal = mongoose.model("Animal", AnimalSchema)