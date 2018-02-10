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
      $scope.selectedPeople = people;
      $http.get('http://localhost:9000/v1/people/' + people.id + '/rewards')
        .then(function(response) {
          var items = [];
          var len = response.data.length;
          for (var i = 0; i < len; i++)
          {
            items.push({start: new Date(response.data[i] + " UTC") });
          }
          $scope.rewards.splice(0,$scope.rewards.length);
          $scope.rewards.push(items);
        });
    }
    
    $scope.uiConfig = {
      calendar:{
        dayClick: function( date, jsEvent, view ) {
          // The date is good but in the wrong timezone (UTC). This convert the timezone to the local timezone.
          var dateFixedTimezone = moment(date.format("YYYY-MM-DD HH:mm:SS"));
          var data = {
            datetime: dateFixedTimezone.tz("UTC").format("YYYY-MM-DD HH:mm:SS")
          };
          $http.put('http://localhost:9000/v1/people/' + $scope.selectedPeople.id + '/rewards', data)
            .then(function(response)
            {
              $scope.selectPeople($scope.selectedPeople);
            });
        },
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
