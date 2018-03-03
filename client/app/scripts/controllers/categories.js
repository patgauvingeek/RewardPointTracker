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

    $scope.newCategory = { name : "" };
    $scope.newTitle = { male_title: "", female_title: "", cost: 0 };

    $scope.selectCategory = function(category)
    {
      $scope.selectedCategory = category;
      $http.get("http://localhost:9000/v1/categories/" + category.id + "/titles")
        .then(function(response) {
          $scope.titles = response.data;
          $scope.newCategory = { name : "" };
          $scope.newTitle = { 
            male_title: "", 
            female_title: "", 
            cost: $scope.titles.length > 0
              ? $scope.titles[$scope.titles.length-1].cost + 6
              : 0
          };
        });
    };

    $scope.unselectCategory = function()
    {
      $scope.selectedCategory = null;
      $scope.titles = [];
      $scope.newCategory = { name : "" };
      $scope.newTitle = { male_title: "", female_title: "", cost: 0 };
    };

    $scope.addCategory = function()
    {
      $http.put('http://localhost:9000/v1/categories', $scope.newCategory)
      .then(function(response) {
        $scope.categories.push(response.data);
        $scope.selectCategory(response.data);
      });  
    }

    $scope.addTitle = function()
    {
      $http.put('http://localhost:9000/v1/categories/' + $scope.selectedCategory.id + '/titles', $scope.newTitle)
      .then(function(response) {
        $scope.selectCategory($scope.selectedCategory);
      });  
    }

    $http.get('http://localhost:9000/v1/categories')
      .then(function(response) {
        $scope.categories = response.data;
        if ($scope.categories.length > 0)
        {
          $scope.selectCategory($scope.categories[0]);
        }
      });

  });
