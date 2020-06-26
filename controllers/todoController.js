var bodyParser = require('body-parser');
var mongoose = require ('mongoose');

//connect to the database 
mongoose.connect('mongodb+srv://test:test@todo-f9kg6.mongodb.net/todo?retryWrites=true&w=majority',{useNewUrlParser: true });

//create a schema - bluebrint - what the db is going to expect 
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema); //creating the model/collection

// var data = [{item: 'get milk'}, {item: 'do webdev'}, {item: 'exercise'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //middleware

module.exports = function(app){
    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to the view
        Todo.find({},function(err,data){//retrieve all items {}
            if (err) throw err;
            res.render('todo',{todos: data});
        }); 
       
    });

    app.post('/todo',urlencodedParser,function(req,res){
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){ //creating new item
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        })
    });
};