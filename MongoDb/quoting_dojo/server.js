var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/quoting_dojo');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({ secret: 'codingdojorocks' }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quote: { type: String, required: true },
});

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/quotes', function (req, res) {
    var quoteInstance = new Quote();
    quoteInstance.name = req.body.Name;
    quoteInstance.quote = req.body.Quote
    quoteInstance.save(function (err) {
        if (err) {
            console.log("failed");
            res.redirect('/');
        } else {
            console.log("success");
            res.redirect('/quotes');
        }
    })
})

app.get('/quotes', function(req,res){
    Quote.find({}, function(error, quotes){
        if(error){
            console.log("not working");
            res.redirect("/");
        }else{
            res.render("quotes", {quotes : quotes});
        }
    })
})

app.listen(8000, function () {
    console.log("listening on port 8000");
});
