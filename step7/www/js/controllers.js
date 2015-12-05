angular.module('ionicbeers')

.controller('BeersCtrl', ['$scope', '$http', '$ionicModal', function($scope, $http, $ionicModal) {
  $http.get('beers/beers.json').success(function(data) {
    $scope.beers = data;
  });

  $scope.orderProp = 'alcohol';

  // Define modal to display beer detail
  $ionicModal.fromTemplateUrl('templates/beer-detail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.beerModal = modal;
  });

  // Load beer detail from json file and show modal
  $scope.openModal = function(beerId) {
    $http.get('beers/' + beerId + '.json').success(function(data) {
      $scope.beer = data;
      $scope.mainImg = $scope.beer.img;

      $scope.setImage = function(img) {
        $scope.mainImg = img;
      };
    });
    myBeerId = beerId;
    $scope.beerModal.show();
  };

  // Hide modal
  $scope.closeModal = function() {
    $scope.beerModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.beerModal.remove();
  });
}])
