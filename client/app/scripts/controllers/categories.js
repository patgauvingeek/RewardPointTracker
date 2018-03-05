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
    
    $scope.titleCategories = [];
    $scope.titles = [];

    $scope.newCategory = { name : "" };
    $scope.newTitle = { male_title: "", female_title: "", cost: 0 };

    $scope.selectedCategoryIndex = 0;
    $scope.$watch('selectedCategoryIndex', function(current, old)
    {
      $scope.selectCategoryByIndex(current);
    });
    $scope.selectCategoryByIndex = function(categoryIndex)
    {
      if (categoryIndex < 0 || categoryIndex > $scope.titleCategories.length - 1)
      {
        $scope.startAddCategory();
        return;
      }
      $scope.selectCategory($scope.titleCategories[categoryIndex]);
    }
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
        }, function(response) {
          $scope.showError("Erreur inconnue: check the log for more information.", response.data);
        });
    };
    $scope.unselectCategory = function()
    {
      $scope.selectedCategory = null;
      $scope.titles = [];
    };

    $scope.startAddCategory = function()
    {
      $scope.unselectCategory();
      $scope.newCategory = { name : "" };
      $scope.newTitle = { male_title: "", female_title: "", cost: 0 };
    }
    $scope.addCategory = function()
    {
      $http.put('http://localhost:9000/v1/categories', $scope.newCategory)
      .then(function(response) {
        $scope.titleCategories.push(response.data);
        $scope.selectCategory(response.data);
      }, function(response) {
        $scope.showError("Erreur inconnue: check the log for more information.", response.data);
      });  
    }

    $scope.deleteSelectedCategory = function()
    {
      var dialog = $mdDialog.confirm()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(false)
        .title("DANGER")
        .textContent("Êtes-vous certain de vouloir supprimer " + $scope.selectedCategory.name + " et toutes ses titres ?")
        .ok("Oui")
        .cancel("Non");
      $mdDialog.show(dialog)
        .then(function () {
          $http.delete('http://localhost:9000/v1/categories/' + $scope.selectedCategory.id)
            .then(function(response) {
              $scope.titleCategories.splice($scope.selectedCategoryIndex, 1);
              $scope.selectCategoryByIndex($scope.selectedCategoryIndex);
            }, function(response) {
              if (response.data.errno == 19)
              {
                $scope.showError("Cette catégorie est utilisée par une ou plusieurs personnes.", response.data);
                return;
              }
              $scope.showError("Erreur inconnue: check the log for more information.", response.data);
            });
        }, function() {});
    }

    $scope.addTitle = function()
    {
      $http.put('http://localhost:9000/v1/categories/' + $scope.selectedCategory.id + '/titles', $scope.newTitle)
      .then(function(response) {
        $scope.selectCategory($scope.selectedCategory);
      }, function(response) {
        if (response.data.errno == 19)
        {
          $scope.showError("Cette catégorie n'existe plus.", response.data);
          return;
        }
        $scope.showError("Erreur inconnue: check the log for more information.", response.data);
      });  
    }

    $scope.showError = function(message, error) {
      console.log(error);
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title("ERREUR")
          .textContent(message)
          .ok('Continuer')
      );
    };

    $http.get('http://localhost:9000/v1/categories')
      .then(function(response) {
        $scope.titleCategories = response.data;
        if ($scope.titleCategories.length > 0)
        {
          $scope.selectCategoryByIndex(0);
        }
      }, function(response) {
        $scope.showError("Erreur inconnue: check the log for more information.", response.data);
      });

  });
