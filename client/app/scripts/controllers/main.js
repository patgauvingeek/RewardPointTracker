'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http, $mdDialog) {
    
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
              var newTitleEarned = $scope.selectedPeople.title != response.data.title;
              var index = $scope.people.findIndex(function(p) { return p.id == $scope.selectedPeople.id; });
              if (index > -1)
              {
                $scope.people[index].title = response.data.title;
                $scope.people[index].points = response.data.points;
                $scope.selectPeople($scope.people[index]);
              }
              if (newTitleEarned)
              {
                $scope.showNewTitleDialog($scope.selectedPeople)
              } 
            });
        },
        eventRender: $scope.eventRender
      }
    };

    $scope.showNewTitleDialog = function(people) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title("Nouveau Titre !")
          .textContent(people.name + " est maintenant " + people.title + ".")
          .ok('Continuer')
      );
    };

    $scope.showCertificate = function(people) {
      var wCertificateWindow = window.open("http://localhost:9001/certificat.html");
      wCertificateWindow.onload = function () {
        wCertificateWindow.document.getElementById("name").innerHTML = people.name;
        wCertificateWindow.document.getElementById("title").innerHTML = people.title;
        wCertificateWindow.document.getElementById("points").innerHTML = people.points;
        wCertificateWindow.document.getElementById("date").innerHTML = moment().format('DD/MM/YYYY');
      }      
    }

    $scope.categories = [];
    $scope.newPeople = {
      name: "",
      sex: "M",
      category_id: -1
    }
    $scope.startAddNewPeople = function()
    {
      $scope.selectedPeople = null;
      $scope.rewards.splice(0,$scope.rewards.length);
      $scope.newPeople = {
        name: "",
        sex: "M",
        category_id: -1
      }
      $http.get('http://localhost:9000/v1/categories')
      .then(function(response) {
        $scope.categories = response.data;
      });
    }
    $scope.addPeople = function()
    {      
      $http.put('http://localhost:9000/v1/people', $scope.newPeople)
      .then(function(response) {
        $scope.people.push(response.data);
        $scope.selectPeople(response.data);
      });  
    }

    $http.get('http://localhost:9000/v1/people')
      .then(function(response) {
        $scope.people = response.data;
        if ($scope.people.length > 0)
        {
          $scope.selectPeople($scope.people[0]);
        }
      });
      
  });
