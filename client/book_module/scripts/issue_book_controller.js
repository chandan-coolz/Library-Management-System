'use strict';


angular.module('libraryManagementSystem')
  .controller('issueBookCtrl', function ($scope,Book,User) {
/**fetch bookdetails************/
getBook();
 var bookID =   "";
 $scope.change = function(id){
 bookID = id;

 }

$scope.issueBook = function(){

if(bookID==""){
	alert("please select the book to issue");
	return;
}

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        
         var Data = JSON.parse(xhttp.responseText) ;
         if(Object.keys(Data)[0]=="error"){
         	$scope.message = "Please make sure you have entered correct values";
         }else{
            $scope.message = "";
         }
         getBook();
    }
  }.bind(this);

xhttp.open("POST", "http://localhost:3000/issue", false);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("userID="+$scope.userID+"&bookID="+bookID+"&days="+$scope.days);


}


/**********get the list of available book here********************/

function getBook(){

 Book.getList().then(function(data){
 $scope.books = data.filter(function(data){

	if(data.availability=="Y"){return true}
	return false;	
 });//filter

});//then
}//getBook

 });
