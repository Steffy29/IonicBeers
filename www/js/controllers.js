angular.module('ionicbeers')

.controller('BeersCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('beers/beers.json').success(function(data) {
    $scope.beers = data;
  });

  $scope.orderProp = 'alcohol';
}]) 

.controller('BeerDetailCtrl', ['$scope', '$stateParams', '$http', '$ionicModal', function($scope, $stateParams, $http, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/beer-detail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $http.get('beers/' + $stateParams.beerId + '.json').success(function(data) {
      $scope.beer = data;
  });

}])