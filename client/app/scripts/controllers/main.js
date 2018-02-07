'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http) {
    
    $scope.people = [];
    $http.get('http://localhost:9000/v1/people').
    then(function(response) {
      $scope.people = response.data;
    });
    $scope.$on('$viewContentLoaded', function(){

    })

  });
