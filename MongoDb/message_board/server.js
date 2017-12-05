var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/message_board');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({ secret: 'codingdojorocks' }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
    Name : {type: String, require : true},
    Message : {type: String, require : true},
    Comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true });
mongoose.model('Message', MessageSchema);
var Message = mongoose.model("Message");


var CommentSchema = new mongoose.Schema({
    Comment: {type: String, require : true},
    _message : {type: Schema.Types.ObjectId, ref: 'Message'}
}, { timestamps: true });
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model("Comment");




app.get('/', function (req, res) {
    Message.find({}).populate('Comments').exec(function(error, messages){
        if (error){
            console.log("not working");
        }else{
            console.log("Success");
        }
        res.render('index', {messages : messages});
    })   
})

app.post('/message', function(req, res){
    var messageInstance = new Message();
    messageInstance.Name = req.body.Name,
    messageInstance.Message = req.body.Message;
    messageInstance.save(function(err){
        if (err){
            console.log("failed");
            res.redirect('/')
        }else{
            console.log("workedid");
            res.redirect('/')
        }
    })
})

app.post('/comment/:id', function(req, res){
    Message.findOne({_id : req.params.id}, function(err, message){
        var commentInstance = new Comment();
        commentInstance.Comment = req.body.comment,
        commentInstance._message = req.params.id;
        message.Comments.push(commentInstance);
        commentInstance.save(function(err){
            message.save(function(err){
                if(err){
                    console.log("issues");
                }else{
                    res.redirect('/')
                }
            })
        })
    })
})

    
app.listen(8000, function () {
    console.log("listening on port 8000");
});
