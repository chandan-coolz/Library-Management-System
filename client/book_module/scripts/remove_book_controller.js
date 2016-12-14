'use strict';

/**
 * @ngdoc function
 * @name currentPtojectApp.controller:MainModuleCtrl
 * @description
 * # MainModuleCtrl
 * Controller of the currentPtojectApp
 */
angular.module('libraryManagementSystem')
  .controller('removeBookCtrl', function ($scope,Book) {
   $scope.delete = function(book){
    book.remove().then(function(data){
     $scope.books = Book.getList().$object;
    },function(error){

    
    });
   }

/**********get the list of book here********************/

$scope.books = Book.getList().$object;


 });
