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
    $scope.rewards = [];

    $scope.eventRender = function(event, element)
    {
      element.html('<div class="text-center"><img width="48" src="images/medal.png"></div>');
    }

    $scope.selectPeople = function(people)
    {
      $http.get('http://localhost:9000/v1/people/' + people.id + '/rewards')
        .then(function(response) {
          var items = [];
          var len = response.data.length;
          for (var i = 0; i < len; i++)
          {
            items.push({start: new Date(response.data[i]) });
          }
          $scope.rewards.splice(0,$scope.rewards.length);
          $scope.rewards.push(items);
        });
    }
    
    $scope.uiConfig = {
      calendar:{
        eventRender: $scope.eventRender
      }
    };

    $http.get('http://localhost:9000/v1/people')
      .then(function(response) {
        $scope.people = response.data;
        if ($scope.people.length > 0)
        {
          $scope.selectPeople($scope.people[0]);
        }
      });
      
  });
