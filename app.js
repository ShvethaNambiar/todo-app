var express = require('express');
var todoController = require('./controllers/todoController');
var app= express();

//set up template engine 
app.set('view engine','ejs');

//static files using middleware
app.use(express.static('./public')); //remove /assets route so it can be used in every route

//fire controller
todoController(app); //passing app to controller module

//listen to port 
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
    console.log('Server has started');
});


