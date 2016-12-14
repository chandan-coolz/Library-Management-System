
var restful = require('node-restful');

module.exports = function(app, route) {

//setup the controller for REST
var rest = restful.model(
    'transaction',app.models.transaction
	).methods(['get','post']);


//Register the endpoint with the application
rest.register(app,route);

//return middleware
return function(req,res,next){
 next();
 };

};