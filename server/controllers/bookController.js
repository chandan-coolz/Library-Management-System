var restful = require('node-restful');

module.exports = function(app, route) {

//setup the controller for REST
var rest = restful.model(
    'book',app.models.book
	).methods(['get','put','post','delete']);


//Register the endpoint with the application
rest.register(app,route);

//return middleware
return function(req,res,next){
 next();
 };

};