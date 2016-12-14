var mongoose = require('mongoose');

//create book schema
var BookSchema = new mongoose.Schema({
name:{
   type: String,
   required: true
},
author:{
   type:String,
   required: true
},
availability:{
	type:String,
	required: true
}


},{ collection : 'books' });

module.exports = BookSchema;
