'use strict';

/**
 * @ngdoc overview
 * @name currentPtojectApp
 * @description
 * # currentPtojectApp
 *
 * Main module of the application.
 */
angular
  .module('libraryManagementSystem', [
    'ui.router','restangular'
  ])
  .config(function ($stateProvider, $urlRouterProvider,RestangularProvider) {
   

   RestangularProvider.setBaseUrl('http://localhost:3000');

    $urlRouterProvider.otherwise('/book');
    $stateProvider.state('book', {
            url: '/book',
            templateUrl: './book_module/views/book.html',
            controller: 'bookCtrl'
        })
        .state('book.add', {
         url: '/add',
         templateUrl: './book_module/views/add_book.html',
         controller: 'addBookCtrl'
       })

        .state('book.remove', {
         url: '/remove',
         templateUrl: './book_module/views/remove_book.html',
         controller: 'removeBookCtrl'
       })

        .state('book.issue', {
         url: '/issue',
         templateUrl: './book_module/views/issue_book.html',
         controller: 'issueBookCtrl'
       })

        .state('book.return', {
         url: '/return',
         templateUrl: './book_module/views/return_book.html',
         controller: 'returnBookCtrl'
       }) 

  })

  .factory('LibraryRestangular', function(Restangular){
  
   return Restangular.withConfig(function(RestangularConfig){
   
  

    RestangularConfig.setRestangularFields({
    id:"_id"
   }) ;

    //RestangularConfig.setFullResponse(true);

   });

  })
  
  .factory("Book",function(LibraryRestangular){ //servie for login

  return LibraryRestangular.service('book');
})

.factory("User",function(LibraryRestangular){ //servie for login

  return LibraryRestangular.service('user');
})  