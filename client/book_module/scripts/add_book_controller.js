'use strict';

/**
 * @ngdoc function
 * @name currentPtojectApp.controller:MainModuleCtrl
 * @description
 * # MainModuleCtrl
 * Controller of the currentPtojectApp
 */
angular.module('libraryManagementSystem')
  .controller('addBookCtrl', function ($scope,Book) {
   
/*   $scope.book = {name: "", author: ""};*/
   $scope.submit = function() {

       var book = {'name':$scope.book.name,'author':$scope.book.author,'availability':'Y'};
       Book.post(book).then(function(data){
        $scope.message = "Book Successfully got added";
        $scope.book.name = "";
        $scope.book.author = "";
        setTimeout(function(){
         $scope.message = "";
         $scope.$apply(); //this triggers a $digest
        }.bind(this),3000);
       },function(error){
        $scope.message = "Something went wrong";
       });
    };

  

  });
