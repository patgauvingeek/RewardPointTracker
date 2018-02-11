'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CategoriesCtrl', function ($scope, $http, $mdDialog) {
    
    $scope.categories = [];
    $scope.titles = [];

    $scope.selectCategory = function(category)
    {
      $scope.selectedCategory = category;
      $http.get("http://localhost:9000/v1/categories/" + category.id + "/titles")
        .then(function(response) {
          $scope.titles = response.data;
        });
    };

    $http.get('http://localhost:9000/v1/categories')
      .then(function(response) {
        $scope.categories = response.data;
        if ($scope.categories.length > 0)
        {
          $scope.selectCategory($scope.categories[0]);
        }
      });

  });
