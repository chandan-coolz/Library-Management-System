var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Connect to MongoDB  mongodb://user01:user01@localhost:27017/addApp
mongoose.connect('mongodb://localhost:27017/libraryManagementSystem');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./models/index.js');

  // Load the routes.
  var routes = require('./routes.js');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  /*********for issueing a book*****************/

  app.use("/issue",function(req,res){
  var userData = "";
  var bookData = "";
  var dueDate= new Date();
  var userID = req.body.userID;
  var bookId = req.body.bookID;

  dueDate.setDate(dueDate.getDate() + parseInt(req.body.days,10));

  /**check for user name*************************/
  var userModel = mongoose.model('userModel',app.models.user);
  userModel.find({'userName':userID},function(err,user){
   if(err){res.send({'error':err});
   }else{
     
    userData = user[0];
    
     /*******fetch book details**********************/
   
        var bookModel = mongoose.model('bookModel',app.models.book);
           bookModel.find({_id:bookId},function(err,book){
           if(err){res.send({'error':err});
             }else{
              
              bookData= book[0];

                 /**********change book status to unvailable(N)**********************/
                 bookModel.findOneAndUpdate({_id:bookId},{availability:'N'},function(err, doc){
                 if(err){res.send({'error':err});
                    }else{
                        
                         var transactionModel = mongoose.model('transactionModel',app.models.transaction);
                         var transaction = new transactionModel({userDetail:userData,bookDetail:bookData,dueDate:dueDate,transactionType:'borrow'})
                         transaction.save(function(err,data){
                         if(err){res.send({'error':err});
                           }{
                             
                             res.send(data);
                           }
                         });//transaction entry
                    }//status update else
                 });//find one and update

            } //book model else 

           });
          


   } //user model else

   });

});//app.use


/***********for returning book*********************************************/

  app.use("/return",function(req,res){
  var userData = "";
  var bookData = "";
  var dueDate= new Date();
  var userID = req.body.userID;
  var bookId = req.body.bookID;

  dueDate.setDate(dueDate.getDate() + parseInt(req.body.days,10));
  
  /**check for user name*************************/
  var userModel = mongoose.model('userModel',app.models.user);
  userModel.find({'userName':userID},function(err,user){
   if(err){res.send({'error':err});
   }else{
    
    userData = user[0];
    
     /*******fetch book details**********************/
   
        var bookModel = mongoose.model('bookModel',app.models.book);
           bookModel.find({_id:bookId},function(err,book){
           if(err){res.send({'error':err});
             }else{
              
              bookData= book[0];

                 /**********change book status to unvailable(N)**********************/
                 bookModel.findOneAndUpdate({_id:bookId},{availability:'Y'},function(err, doc){
                 if(err){res.send({'error':err});
                    }else{
                        
                         var transactionModel = mongoose.model('transactionModel',app.models.transaction);
                         var transaction = new transactionModel({userDetail:userData,bookDetail:bookData,dueDate:dueDate,transactionType:'return'})
                         transaction.save(function(err,data){
                         if(err){res.send({'error':err});
                           }{
                             
                             res.send(data);
                           }
                         });//transaction entry
                    }//status update else
                 });//find one and update

            } //book model else 

           });
          


   } //user model else

   });

});//app.use




 /**************************************************/
  console.log('Listening on port 3000...');
  app.listen(3000);
});
