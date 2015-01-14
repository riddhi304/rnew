//dependent variable// //core modules
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var bodyParser = require('body-parser');
var mongooose = require('mongoose');

//controllers
var aboutConntroller = require('./conntroller/about');
var homeConntroller = require('./conntroller/home');
var usersConntroller = require('./conntroller/users');
var app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: false
        
    }));
app.use(express.static('public'));

//Mongoose
mongooose.connect('mongodb://localhost:27017/classpro');
mongooose.connection.on('error',function(){
    console.error('MongoDB is not connected. Check if mongod is running.');

});

//Routes
app.get('/', homeConntroller.index);

//app.get('/users/:id',usersConntroller.getUserById);
app.get('/users',usersConntroller.getAllUser);
app.get('/users/:id',usersConntroller.getUserById);
//app.get('/users/del/:id',usersConntroller.deleteUser);
app.get('/users/delbyname/:name',usersConntroller.deleteUserByName);

app.get('/dump',usersConntroller.saveDumpUser);
app.get('/adduser',usersConntroller.createUser);
app.post('/adduser',usersConntroller.postNewUser);

//app.get('/home',function(request,response){
//    response.render('index',users.getUsers);
//});
//
//
//app.get('/login', usersConntroller.getLogin);
//
//
////app.get('/signup', function(request,response){
////    response.sendfile('./views/signup.html');
////
////});
//app.get('/signup', usersConntroller.getSignup);
//app.get('/about', aboutConntroller.about);
//
//
//
//app.post('/login',usersConntroller.postLogin);
//

app.listen(3000);

