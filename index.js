const https = require('https')
const express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var Schema = mongoose.Schema

const User = require('./models/user')
const Question = require('./models/question')
const Answer = require('./models/answer')
const QASession = require('./models/session')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(app.router);

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, 
    { useNewUrlParser: true });

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = process.env.PORT || 8080; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

app.get('/', function(req, res){
   res.send('hello world')
});

app.post('/user', function(req, res){
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.name  
     })
     user.save().then(result =>{
         console.log(result)
     })
     .catch(err=> console.log(err))
     res.status(201).json({
         message: "Handling POST requests to /",
         createdUser : user
     })
})

app.post('/qa', function(req, res){
    var date = new Date(Date.now)
    console.log(req.body.name)
    const qa = new QASession({
        _id: new mongoose.Types.ObjectId(),
        host_id: req.host_id,
        start_time: date,
        end_time: 0
     })
     qa.save().then(result =>{
         console.log(result)
     })
     .catch(err=> console.log(err))
     res.status(201).json({
         message: "Handling POST requests to /qa",
         createdSession : qa,
     })
})

app.post('/question/:qa_id', function(req, res){
    const question = new Question({
        _id: new mongoose.Types.ObjectId(),
        session_id : req.params.qa_id,
        asked_by : req.body.asked_by,
        text: req.body.text
     })
     question.save().then(result =>{
         console.log(result)
     })
     .catch(err=> console.log(err))
     res.status(201).json({
         message: "Handling POST requests to /question",
         createdQuestion : question,
     })
})

app.get('/qa/:qa_id/questions', function(req, res){
    QASession.findById({_id: req.params.qa_id})
        .exec()
        .then(doc => {
            console.log("q from db", doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

app.post('/answer/:question_id', function(req, res){
    const question_id = req.params.question_id
    const answer = new Answer({
        _id: new mongoose.Types.ObjectId(),
        host_id : req.body.host_id,
        question_id : question_id,
        answered_by : "test user",
        text : req.body.text,
        image_url : req.body.image_url
    })
    answer.save().then(result =>{
        console.log(result)
    })
    .catch(err=> console.log(err))
    res.status(201).json({
        message: "Handling POST requests to /question",
        createdAnswer : answer,
    })
})

