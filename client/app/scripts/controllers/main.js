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
    };

    $scope.selectedPeopleIndex = 0;
    $scope.$watch('selectedPeopleIndex', function(current/*, old*/)
    {
      $scope.selectPeopleByIndex(current);
    });
    $scope.selectPeopleByIndex = function(peopleIndex)
    {
      if (peopleIndex < 0 || peopleIndex > $scope.people.length - 1)
      {
        $scope.startAddNewPeople();
        return;
      }
      $scope.selectPeople($scope.people[peopleIndex]);
    };
    $scope.selectPeople = function(people)
    {
      $scope.selectedPeople = people;
      // If the next request fail, the list will be empty.
      $scope.rewards.splice(0,$scope.rewards.length);
      $http.get('http://' + window.location.hostname + ':9000/v1/people/' + people.id + '/rewards')
        .then(function(response) {
          var items = [];
          var len = response.data.length;
          for (var i = 0; i < len; i++)
          {
            items.push({start: new Date(response.data[i] + " UTC") });
          }
          $scope.rewards.push(items);
        }, function(response) {
          $scope.showError("Erreur inconnue: " + JSON.stringify(response), response.data);
        });
    };
    $scope.unselectPeople = function()
    {
      $scope.selectedPeople = null;
      $scope.rewards.splice(0,$scope.rewards.length);
    };
    
    $scope.uiConfig = {
      calendar:{
        dayClick: function(date/*, jsEvent, view*/) {
          // The date is good but in the wrong timezone (UTC). This convert the timezone to the local timezone.
          var dateFixedTimezone = moment(date.format("YYYY-MM-DD HH:mm:SS"));
          var data = {
            datetime: dateFixedTimezone.tz("UTC").format("YYYY-MM-DD HH:mm:SS")
          };
          $http.put('http://' + window.location.hostname + ':9000/v1/people/' + $scope.selectedPeople.id + '/rewards', data)
            .then(function(response)
            {
              var newTitleEarned = $scope.selectedPeople.title !== response.data.title;
              var index = $scope.people.findIndex(function(p) { return p.id === $scope.selectedPeople.id; });
              if (index > -1)
              {
                $scope.people[index].title = response.data.title;
                $scope.people[index].points = response.data.points;
                $scope.selectPeople($scope.people[index]);
              }
              if (newTitleEarned)
              {
                $scope.showNewTitleDialog($scope.selectedPeople);
              } 
            }, function(response) {
              if (response.data.errno === 19)
              {
                $scope.people.splice($scope.selectedPeopleIndex, 1);
                $scope.selectPeopleByIndex($scope.selectedPeopleIndex);
                $scope.showError("Cette personne n'existe plus.", response.data);
                return;
              }
              $scope.showError("Erreur inconnue: " + JSON.stringify(response), response.data);
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
      var wCertificateWindow = window.open('http://' + window.location.hostname + ':9001/certificat.html');
      wCertificateWindow.onload = function () {
        wCertificateWindow.document.getElementById("name").innerHTML = people.name;
        wCertificateWindow.document.getElementById("title").innerHTML = people.title;
        wCertificateWindow.document.getElementById("points").innerHTML = people.points;
        wCertificateWindow.document.getElementById("date").innerHTML = moment().format('DD/MM/YYYY');
      };
    };

    $scope.titleCategories = [];
    $scope.newPeople = {
      name: "",
      sex: "M",
      category_id: -1
    };
    $scope.startAddNewPeople = function()
    {
      $scope.unselectPeople();
      $scope.newPeople = {
        name: "",
        sex: "M",
        category_id: -1
      };
      $http.get('http://' + window.location.hostname + ':9000/v1/categories')
        .then(function(response) {
          $scope.titleCategories = response.data;
        }, function(response) {
          $scope.showError("Erreur inconnue: " + JSON.stringify(response), response.data);
        });
    };
    $scope.addPeople = function()
    {      
      $http.put('http://' + window.location.hostname + ':9000/v1/people', $scope.newPeople)
        .then(function(response) {
          $scope.people.push(response.data);
          $scope.selectPeople(response.data);
        }, function(response) {
          if (response.data.errno === 19)
          {
            if ($scope.newPeople.category_id === -1)
            {
              $scope.showError("Veuillez sélectionner une catégorie.", response.data);
              return;
            }
            $scope.newPeople.category_id = -1;
            var categoryIndex = $scope.titleCategories.findIndex(function(category) { return category.id === $scope.newPeople.category_id; });
            $scope.titleCategories.splice(categoryIndex);
            $scope.showError("Cette catégorie n'existe plus.", response.data);
            return;
          }
          $scope.showError("Erreur inconnue: " + JSON.stringify(response), response.data);
        });  
    };

    $scope.deleteSelectedPeople = function()
    {
      var dialog = $mdDialog.confirm()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(false)
        .title("DANGER")
        .textContent("Êtes-vous certain de vouloir supprimer " + $scope.selectedPeople.name + " et toutes ses récompenses ?")
        .ok("Oui")
        .cancel("Non");
      $mdDialog.show(dialog)
        .then(function () {
          $http.delete('http://' + window.location.hostname + ':9000/v1/people/' + $scope.selectedPeople.id)
            .then(function(/*response*/) {
              $scope.people.splice($scope.selectedPeopleIndex, 1);
              $scope.selectPeopleByIndex($scope.selectedPeopleIndex);
            }, function(response) {
              $scope.showError("Erreur inconnue: " + JSON.stringify(response), response.data);
            });
        }, function() {});
    };
    
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

    $http.get('http://' + window.location.hostname + ':9000/v1/people')
      .then(function(response) {
        $scope.people = response.data;
        if ($scope.people.length > 0)
        {
          $scope.selectPeopleByIndex(0);
        }
      }, function(response) {
        $scope.showError("Erreur inconnue: " + JSON.stringify(response), response.data);
      });
      
  });
