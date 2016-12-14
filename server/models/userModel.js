var mongoose = require('mongoose');

//create book schema
var UserSchema = new mongoose.Schema({
userName:{
   type: String,
   required: true
},
name:{
   type:String,
   required: true
},
password:{
	type:String,
	default:""
},
email:{
   type:String,
   required: true
},
contact:{
   type:Number,
   required: true
},
role:{
   type:String,
   default:'user'
},


},{ collection : 'users' });

module.exports = UserSchema;
