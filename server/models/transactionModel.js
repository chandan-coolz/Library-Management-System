var mongoose = require('mongoose');

//create book schema
var TransactionSchema = new mongoose.Schema({
userDetail:{
   type: String,
   required: true
},
bookDetail:{
   type:String,
   required: true
},
dueDate:{
type: Date,
required: true
},
transactionType:{
	type:String,
	required: true
}


},{ collection : 'transactions' });

module.exports = TransactionSchema;
